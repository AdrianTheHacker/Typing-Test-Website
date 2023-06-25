/**
 * Credits to: https://betterprogramming.pub/create-a-typing-game-with-react-hooks-usekeypress-and-faker-28bbc7919820
 * 
 * The code in the link was used for registering key inputs.
 * I use this in my code to now when a key has been pressed and released.
 */

import { useState, useEffect } from 'react';

export const useKeyPress = callback => {
  const [keyPressed, setKeyPressed] = useState();

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (keyPressed === key) { return; }
      setKeyPressed(key);
      callback && callback(key);
    };

    const upHandler = () => {
      setKeyPressed(null);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};