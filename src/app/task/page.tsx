'use client';

import React, { Suspense } from 'react';
import BackIcon from '../../../public/assets/icons/backIcon';
import SyncLoader from "react-spinners/SyncLoader";
import { useTaskPage } from './useTaskPage';

const TaskPage = () => {
    const {
        router,
        listId,
        title,
        currentTheme,
        newTaskTitle,
        setNewTaskTitle,
        handleAddTask,
        handleDeleteTask,
        handleCheckboxChange,
        tasks,
        taskStatus,
        error,
        completedTasks
    } = useTaskPage();

    return (
        <Suspense>
            <div className={`bg-custom-radical bg-dotted-size ${currentTheme?.bgClass}`}>
                <div className={`flex justify-start pt-8 pl-8 ${currentTheme?.textClass || ''} bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6`}>
                    <button onClick={() => router.back()} className='text-xl md:text-5xl'>
                        <BackIcon />
                    </button>
                </div>

                <div className="min-h-screen flex justify-center px-5">
                    <div className='w-full max-w-sm mx-auto md:max-w-md lg:max-w-2xl mt-10'>
                        <h1 className={`text-3xl md:text-4xl font-bold text-center font-stint mb-8 ${currentTheme?.textClass || ''}`}>
                            {title}
                        </h1>

                        <div className='flex justify-around mx-auto md:max-w-[597px] h-auto'>
                            <input
                                type='text'
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                className={`${currentTheme?.textClass || ''} ${currentTheme?.borderClass || ''} w-full font-medium placeholder:opacity-100 bg-transparent border-4 rounded-2xl px-2 py-1.5`}
                                placeholder='New Task Title'
                            />
                            <button
                                onClick={handleAddTask}
                                className={`rounded-full md:w-[150px] border-4 w-full text-sm font-medium ml-3 ${currentTheme?.textClass || ''} ${currentTheme?.borderClass || ''}`}
                            >
                                Add
                            </button>
                        </div>

                        {taskStatus === 'loading' && (
                            <div className="text-center mt-5">
                                <p className="text-sm md:text-lg">
                                    <SyncLoader
                                        color={currentTheme?.accent || '#F45050'}
                                        size={10}
                                    />
                                </p>
                            </div>
                        )}

                        {taskStatus === 'failed' && (
                            <div className='text-red-700 mb-10 text-lg text-center'>
                                {error}
                            </div>
                        )}

                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id} className='mb-2 mt-10 flex justify-between max-w-[642px]'>
                                    <div>
                                        <input
                                            type='checkbox'
                                            className='mr-2 bg-transparent size-5'
                                            checked={completedTasks[task.id] || false}
                                            onChange={() => handleCheckboxChange(task.id, completedTasks[task.id] || false)}
                                        />
                                        <span className='relative inline-block'>
                                            <p className={`font-plex-mono font-medium text-xl md:text-3xl ${currentTheme?.textClass || ''} cursor-pointer`}>
                                                {task.title}
                                            </p>
                                            <span
                                                className={`absolute left-0 right-0 bottom-1 border-b-4 ${currentTheme?.borderClass || 'border-transparent'}`}
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className={`px-6 py-2 rounded-full border-4 text-sm font-plex-mono font-medium mr-2 ${currentTheme?.borderClass} ${currentTheme?.textClass}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default TaskPage;
