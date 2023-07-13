import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootDispatch, RootState } from '../index';


export const useAppDispatch: () => RootDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;