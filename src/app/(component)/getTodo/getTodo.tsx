'use client';

import React from 'react';
import useTodoList from './useTodoList';
import { themes } from '../themes/theme';
import { color } from '@/app/constants/color';
import SyncLoader from "react-spinners/SyncLoader";

const TodoList: React.FC = () => {
  const { todos, status, error, handleDeleteTask, handleUpdateClick, handleTitleClick } = useTodoList();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36D7B7" loading={true} size={15} />
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='max-w-[633px] h-auto mx-auto'>
      <ul>
        {todos.map(todo => {
          const todoTheme = themes.find(theme => theme.value === todo.theme);

          return (
            <li
              className={`font-plex-mono px-2 font-medium text-xl md:text-3xl relative flex justify-between items-center text-center`}
              key={todo.id}
            >
              <span className='relative inline-block'>
                <p
                  onClick={() => handleTitleClick(todo.id, todo.title, todo.theme)}
                  className={`font-plex-mono font-medium text-xl md:text-3xl ${color.textInput}`}
                  style={{ cursor: 'pointer' }}
                >
                  {todo.title}
                </p>
                <span
                  className={`absolute left-0 right-0 bottom-1 border-b-4 ${todoTheme?.borderClass || 'border-default'}`}
                />
              </span>
              <div className='mb-2'>
                <button
                  onClick={() => handleUpdateClick(todo.id, todo.title, todo.theme)}
                  className={`mt-3 text-sm py-1 px-4 border-none rounded-full ${color.bgbtnColor} ${color.textInput}`}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTask(todo.id)}
                  className={`mt-3 text-sm py-1 px-4 border-none rounded-full ml-5 ${color.deleteBg} ${color.textInput}`}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
