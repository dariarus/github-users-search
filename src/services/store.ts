import {configureStore} from '@reduxjs/toolkit';

import {rootReducer as reducer} from './state-slices';

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})