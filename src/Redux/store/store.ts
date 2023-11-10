import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import reducer from '../reducer/reducer';

const store = configureStore({
  reducer: {
    global: reducer,
  },
});

export default store;
// store.subscribe(() => {
//   console.info(
//     'subscribed for counter actions',
//     JSON.stringify(store.getState(), null, 4),
//   );
// });
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
