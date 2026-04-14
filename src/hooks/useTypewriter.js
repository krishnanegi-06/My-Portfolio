import { useState, useEffect } from 'react';

export function useTypewriter(words) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && charIndex < word.length) {
          setText(word.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else if (!isDeleting && charIndex === word.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        } else if (isDeleting && charIndex > 0) {
          setText(word.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      },
      isDeleting ? 35 : 75
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return text;
}
