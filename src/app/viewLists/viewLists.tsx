'use client';
import React from 'react';
import Navbar from '../(component)/navbar/Navbar';
import GetTodo from "../(component)/getTodo/getTodo";
import Link from 'next/link';
import TuneIcon from '../../../public/assets/tuneIcon';
import useTheme from "../(component)/themes/useThemes";
import { themes } from '../(component)/themes/theme';

const ViewLists = () => {
    const { currentTheme, changeTheme } = useTheme();
    const handleThemeChange = () => {
        const currentThemeIndex = themes.findIndex(theme => theme.value === currentTheme?.value);
        const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[nextThemeIndex];
        changeTheme(nextTheme.value);
    };

    return (
        <main
            className={`bg-custom-radical bg-dotted-size min-h-screen  ${currentTheme?.bgClass} ${currentTheme?.borderClass}`}
        >
            <div className={`bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6 flex justify-between items-center p-6 ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'}`}>
                <div onClick={handleThemeChange}> <Navbar /></div>
                <Link href={'/setting'}>
                    <TuneIcon />
                </Link>
            </div>
            <div className="max-w-[633px] mx-auto">
                <h1
                    className={`w-full text-center mt-10 text-3xl md:text-4xl lg:text-6xl mb-10 font-bold font-stint tracking-wide ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'}`}
                >
                    Todo Lists
                    <span className={`relative left-0 ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'}`}>.</span>
                </h1>
                <GetTodo />
                <Link href="/add-todo">
                    <button
                        className={`mt-5 text-sm md:text-2xl font-medium rounded-full ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'} ${currentTheme?.bgClass || 'border-vibrantSpectrumAccent'}`}
                    >
                        + Add List.
                    </button>
                </Link>
                <div className="mt-2">
                </div>
            </div>
        </main>
    );
};

export default ViewLists;
