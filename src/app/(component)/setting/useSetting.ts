import { useState, useEffect } from "react";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

export const useUserData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = await getSession();
        const userEmail = session?.user?.email;

        if (!userEmail) {
          throw new Error("User email not found in session");
        }

        const response = await axios.post("/api/profileUser", {
          email: userEmail,
        });

        if (response.status === 200) {
          const userData = response.data;
          setName(userData.name || "");
          setEmail(userData.email || "");
          // setImage(userData.image || null);
          if (userData.image) {
            setImage(userData.image);
          } else {
            setImage(null);
          }
        } else {
          toast.error("Failed to load user data");
        }
      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return { name, setName, email, setEmail, image, setImage };
};

export const useImage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return { imageFile, handleImageChange };
};

export const useProfileUpdate = (
  name: string,
  email: string,
  imageFile: File | null,
  setImage: (image: string | null) => void
) => {
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      let imageBuffer = null;

      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          imageBuffer = reader.result?.toString().split(",")[1];

          const response = await axios.post("/api/profileUserUpdate", {
            name,
            email,
            imageBuffer,
          });

          if (response.status === 200) {
            toast.success("Profile updated successfully");
            setImage(imageBuffer || "");
          } else {
            toast.error("Failed to update profile");
          }
          setLoading(false);
        };
        reader.readAsDataURL(imageFile);
      } else {
        const response = await axios.post("/api/profileUserUpdate", {
          name,
          email,
        });
        if (response.status === 200) {
          toast.success("Profile updated successfully");
        } else {
          toast.error("Failed to update profile");
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  return { loading, handleSaveChanges };
};

export const useLogout = (router: any) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return { handleLogout };
};
