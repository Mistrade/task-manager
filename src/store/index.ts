import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventReducer } from './reducers/events';
import { SessionReducer } from './reducers/session';
import { CalendarReducer } from './reducers/planner-reducer';
import { planningApi } from './api/planning-api';
import { sessionApi } from './api/session-api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from './api/friends-api';

const rootReducer = combineReducers({
  events: eventReducer,
  session: SessionReducer,
  planner: CalendarReducer,
  [planningApi.reducerPath]: planningApi.reducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
});

export const createAppStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        planningApi.middleware,
        sessionApi.middleware,
        contactsApi.middleware
      ),
    preloadedState,
  });
};

export const store = createAppStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;
export type CreateSelectorReturnType<R> = (state: RootState) => R;
