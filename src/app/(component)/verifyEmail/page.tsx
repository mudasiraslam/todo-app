"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useVerifyEmail } from "../../../hooks/useVerifyEmail";
import { color } from "../../../constants/color";

function VerifyEmail() {
    const { verifed, error, verifyUserEmail } = useVerifyEmail();

    return (
        <Suspense>
            <div
                className={`flex flex-col items-center justify-center min-h-screen py-2 bg-custom-radical bg-dotted-size ${color.bgColor}`}
            >
                <h1 className={`text-3xl ${color.textVerified}`}>Verify Email</h1>
                {verifed ? (
                    <div>
                        <h2 className={`text-2xl ${color.textVerified}`}>Email Verified</h2>
                        <Link href={"/signin"}>
                            <span className={`${color.textSuccess}`}>Login</span>
                        </Link>
                    </div>
                ) : error ? (
                    <div className="mt-3">
                        <h2 className={`text-2xl ${color.textUnverified}`}>{error}</h2>
                    </div>
                ) : (
                    <button
                        onClick={verifyUserEmail}
                        className={`mt-4 px-4 py-2 font-semibold ${color.textSuccess} rounded`}
                    >
                        Click here
                    </button>
                )}
            </div>
        </Suspense>
    );
}

export default VerifyEmail;
