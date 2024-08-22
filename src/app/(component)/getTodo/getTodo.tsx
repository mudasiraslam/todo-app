'use client';

import React from 'react';
import useTodoList from './useTodoList';
import useTheme from '../../(component)/themes/useThemes';

const TodoList: React.FC = () => {
  const { todos, status, error, handleDeleteTask, handleUpdateClick, handleTitleClick } = useTodoList();
  const { currentTheme } = useTheme();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='text-red-700 mb-10'>Error: {error}</div>;
  }

  return (
    <div className='max-w-[633px] h-auto mx-auto'>
      <ul>
        {todos.map(todo => (
          <li
            className={`font-plex-mono px-2 font-medium text-xl md:text-3xl relative flex justify-between items-center text-center`}
            key={todo.id}
          >
            <span className='relative inline-block'>
              <p
                onClick={() => handleTitleClick(todo.id, todo.title, todo.theme)}
                className={`font-plex-mono font-medium text-xl md:text-3xl ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'} cursor-pointer`}
              >
                {todo.title}
              </p>
              <span
                className={`absolute left-0 right-0 bottom-1 border-b-4 ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'}`}
              />
            </span>
            <div className='mb-2'>
              <button
                onClick={() => handleUpdateClick(todo.id, todo.title, todo.theme)}
                className={`mt-3 text-sm py-1 px-4 border-4 rounded-full ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'} ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'}`}
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteTask(todo.id)}
                className={`mt-3 text-sm py-1 px-4 border-4 rounded-full ml-5 ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'} ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
