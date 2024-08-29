'use client';

import React from 'react';
import Image from 'next/image';
import Profile from '../../../../public/Images/profile.png';
import Edit from '../../../../public/assets/edit.svg';
import { LogoutIcon } from '../../../../public/assets/icons/logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BackIcon from '../../../../public/assets/icons/backIcon';
import useTheme from "../themes/useThemes";
import { useUserData, useImage, useProfileUpdate, useLogout } from './useSetting';
import { color } from '@/app/constants/color';

const Settings: React.FC = () => {
    const { name, setName, email, setEmail, image, setImage } = useUserData();
    const { imageFile, handleImageChange } = useImage();
    const { loading, handleSaveChanges } = useProfileUpdate(name, email, imageFile, setImage);
    const { currentTheme } = useTheme();
    const router = useRouter();
    const { handleLogout } = useLogout(router);

    return (
        <main className={`bg-custom-radical bg-dotted-size ${currentTheme?.bgClass || `${color.defaultVibrantBg}`}`}>
            <div className={`flex justify-between px-[24px] bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6`}>
                <div className={`flex justify-center ${currentTheme?.textClass || `${color.defaultVibrantText}`}`}>
                    <button
                        onClick={() => router.back()}
                        className='text-xl md:text-5xl'
                    >
                        <BackIcon />
                    </button>
                </div>
                <button onClick={handleLogout} className={`${currentTheme?.textClass || `${color.defaultVibrantText}`}`}>
                    <LogoutIcon />
                </button>
            </div>
            <div className='min-h-screen flex justify-center items-center'>
                <div className='flex flex-col gap-3 items-center'>
                    <div className='flex justify-between px-[24px] py-2'>
                        <h1 className={`font-bold text-4xl font-stint ${currentTheme?.textClass || `${color.defaultVibrantText}`}`}>
                            Settings<span>.</span>
                        </h1>
                    </div>
                    <label htmlFor="img" className='relative cursor-pointer'>
                        <div className="rounded-full overflow-hidden size-24">
                            <Image
                                className="h-full w-full"
                                src={image ? `data:image/png;base64,${image}` : Profile}
                                height={50}
                                width={50}
                                alt="Profile Photo"
                            />
                        </div>
                        <div className="absolute right-0 bottom-9 z-30">
                            <Image src={Edit} alt='' />
                            <input
                                hidden
                                id="img"
                                name="img"
                                accept="image/png, image/jpg"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>
                        <h4 className={`font-plex-mono font-normal flex justify-center mt-2 ${currentTheme?.textClass || `${color.defaultVibrantText}`}`}>
                            Profile Photo
                        </h4>
                    </label>
                    <div className="w-full">
                        <label htmlFor="name" className={`block font-medium font-plex-mono text-xl px-5 py-1 ${currentTheme?.textClass || `${color.defaultVibrantText}`}`}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter the name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full placeholder-plex-mono bg-transparent border-4 focus:outline-none px-5 py-2 rounded-[30px] md:max-w-[555px] md:max-h-[113px] ${currentTheme?.textClass || ''} ${currentTheme?.borderClass || `${color.defaultVibrantBorder}`}`}
                            required
                        />
                        <label htmlFor="email" className={`block font-medium font-plex-mono text-xl px-5 py-1 mt-3 ${currentTheme?.textClass || `${color.defaultVibrantText}`}`}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full placeholder-plex-mono bg-transparent border-4 py-2 px-5 rounded-[30px] md:max-w-[447px] md:max-h-[113px] ${currentTheme?.textClass || `${color.defaultVibrantText}`} ${currentTheme?.borderClass || `${color.defaultVibrantBorder}`}`}
                            required
                        />
                    </div>
                    <div className='py-3'>
                        <Link href={'/change-password'}>
                            <button
                                className={`rounded-full px-5 py-2 bg-transparent border-4 w-full font-medium mb-3 ${currentTheme?.textClass || `${color.defaultVibrantText}`} ${currentTheme?.borderClass || `${color.defaultVibrantBorder}`}`}
                            >
                                Change Password
                            </button>
                        </Link>
                        <br />
                        <button
                            className={`rounded-full px-5 py-2 bg-transparent border-4 w-full font-medium ${currentTheme?.textClass || `${color.defaultVibrantText}`} ${currentTheme?.borderClass || `${color.defaultVibrantBorder}`}`}
                            onClick={handleSaveChanges}
                            disabled={loading}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Settings;
