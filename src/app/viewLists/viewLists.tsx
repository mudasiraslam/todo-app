'use client';
import React from 'react';
import Navbar from '../(component)/navbar/Navbar';
import GetTodo from "../(component)/getTodo/getTodo";
import Link from 'next/link';
import TuneIcon from '../../../public/assets/tuneIcon';
import useTheme from "../(component)/themes/useThemes";
import { themes } from '../(component)/themes/theme';
import { color } from '../constants/color';

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
            className={`bg-custom-radical bg-dotted-size min-h-screen  ${color.bgColor}`}
        >
            <div className={`bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6 flex justify-between items-center p-6 ${color.textInput}`}>
                <div onClick={handleThemeChange}> <Navbar /></div>
                <Link href={'/setting'}>
                    <TuneIcon />
                </Link>
            </div>
            <div className="max-w-[633px] mx-auto">
                <div className='max-w-336px max-h-140px'>
                    <h1
                        className={`flex justify-center w-full text-center  text-4xl md:text-5xl  xl:text-[124px] xl:leading-[139.98px] xl:mt-[16px] mb-10  font-bold font-stint ${color.textInput}`}
                    >
                        Todo Lists
                        <span className={`relative left-0 `}>.</span>
                    </h1>
                </div>
                <GetTodo />
                <Link href="/add-todo">
                    <button
                        className={`mt-5 text-sm md:text-2xl font-medium rounded-full ${color.textInput}`}
                    >
                        + Add List.
                    </button>
                </Link>

            </div>
        </main>
    );
};

export default ViewLists;
