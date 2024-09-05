'use client';

import React from 'react';
import useTodoForm from './useMainList';
import BackIcon from '../../../../public/assets/icons/backIcon';
import { themes } from '../themes/theme';
import { color } from '@/app/constants/color';

const AddTodo: React.FC = () => {
  const {
    title,
    setTitle,
    loading,
    selectedTheme,
    handleThemeClick,
    handleSubmit,
    searchParams,
    router,
  } = useTodoForm();

  return (
    <div className={`bg-custom-radical bg-dotted-size ${selectedTheme?.bgClass || `${color.defaultVibrantBg}`}`}>
      <div className={` ${selectedTheme?.textClass || ''} bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6`}>
        <button onClick={() => router.back()} className='text-xl md:text-5xl '>
          <BackIcon />
        </button>
      </div>
      <div className={`flex items-center justify-center min-h-screen`}>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='justify-center flex items-center max-w-[447px] mx-auto'>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='List name'
                required
                className={`mt-1 block px-4 py-2 border-4 w-full rounded-full bg-transparent ${selectedTheme?.bgClass} ${selectedTheme?.borderClass} ${selectedTheme?.textClass}`}
              />
            </div>
            <div className={`flex flex-wrap justify-center gap-3 max-w-xl mx-auto mt-8`}>
              {themes.map((theme, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => handleThemeClick(theme)}
                  className={`px-6 py-1 rounded-3xl border-4 ${selectedTheme?.value === theme.value ? 'border-4' : ''} ${theme.bgClass} ${theme.borderClass} ${theme.textClass}`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
            <div className='flex justify-center items-center text-center mt-8'>
              <button
                type='submit'
                className={`w-md px-6 py-2 font-plex-mono font-medium text-lg rounded-full ${color.forgetPassbg} ${color.forgetPassText}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : searchParams?.get('id') ? 'Update List' : 'Add List'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
