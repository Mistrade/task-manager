import { useCallback } from 'react';
import { useLocation } from 'react-router';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { URLSearchParamsInit } from 'react-router-dom/dist/dom';
import { NavigateOptions } from 'react-router/dist/lib/context';

export const useSearchNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = function (params: URLSearchParamsInit) {
    setSearchParams(params);
    return searchParams;
  };

  return useCallback(
    (url: string, options?: NavigateOptions) => {
      const urlRes = location.search ? url + location.search : url;
      navigate(urlRes, options);
      return updateSearchParams;
    },
    [location]
  );
};
