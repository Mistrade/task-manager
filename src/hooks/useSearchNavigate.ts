import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearchNavigate = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  return useCallback((url: string, options?: { replace: boolean }) => {
    const urlRes = window.location.search ? url + window.location.search : url;
    navigate(urlRes, options);
  }, []);
};
