import { RootDispatch, RootState } from '../index'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch: () => RootDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
