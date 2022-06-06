import { useEffect } from 'react';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import useLocalStorage from './useLocalStorage';

const generateUsername = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals]
  });
};

const useRandUsername = () => {
  const [username, setUsername] = useLocalStorage('user', null);
  useEffect(() => {
    if (username) return;

    setUsername(generateUsername());
  }, [username, setUsername]);

  return username;
};

export default useRandUsername;
