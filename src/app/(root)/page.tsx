import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../libs/AuthOptions";
import ViewLists from "../(component)/viewLists/viewLists";


export default async function Home() {

    const session = await getServerSession(authOptions);

    return (
        <>
            <ViewLists />
        </>
    );
}
