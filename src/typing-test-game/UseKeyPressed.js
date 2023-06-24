/**
 * Credits to: https://betterprogramming.pub/create-a-typing-game-with-react-hooks-usekeypress-and-faker-28bbc7919820
 * 
 * The code in the link was used for registering key inputs.
 * I use this in my code to now when a key has been pressed and released.
 */

import { useState, useEffect } from 'react';

//1
export const useKeyPress = callback => {
  //2
  const [keyPressed, setKeyPressed] = useState();
  //3
  useEffect(() => {
    //4
    const downHandler = ({ key }) => {
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    //5
    const upHandler = () => {
      setKeyPressed(null);
    };

    //6
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      //7
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  //8
  return keyPressed;
};