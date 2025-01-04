import { useEffect, useState } from "react";

const setStates: Array<(isShown: boolean) => void> = [];

function dispatch(isShown: boolean) {
  setStates.forEach((setState) => setState(isShown));
}

export default function useSpinner() {
  const [isShown, setIsShown] = useState(false);

  const showSpinner = () => dispatch(true);
  const hideSpinner = () => dispatch(false);

  const toggleSpinner = () => {
    if (isShown) hideSpinner();
    else showSpinner();
  };

  const withSpinner = async <T>(asyncFn: () => Promise<T>) => {
    try {
      showSpinner();
      return await asyncFn();
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    setStates.push(setIsShown);
    return () => {
      const index = setStates.indexOf(setIsShown);
      if (index > -1) setStates.splice(index, 1);
    };
  }, []);

  return {
    isShown,
    showSpinner,
    hideSpinner,
    toggleSpinner,
    withSpinner,
  };
}
