import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TErrorState} from '../types/props';
import {IPopup} from '../types/store-slices';
import {TPopupData} from '../types/response-data';
import {IPopupActions} from '../types/actions';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isOpen: false,
    type: 'default',
    login: '',
    profileUrl: '',
    username: null,
    userInfo: null,
    reposCount: 0,
    followers: 0,
    following: 0
  } as IPopup,
  reducers: {
    getPopupDataSuccess: (state, action: PayloadAction<TPopupData>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        login: action.payload.login,
        profileUrl: action.payload.html_url,
        username: action.payload.name,
        userInfo: action.payload.bio,
        reposCount: action.payload.public_repos,
        followers: action.payload.followers,
        following: action.payload.following
      }
    },
    getPopupData: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getPopupDataFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    },
    onOpenPopup: (state, action: PayloadAction<'default' | 'error'>) => {
      return {
        ...state,
        isOpen: true,
        type: action.payload
      }
    },
    onClosePopup: (state) => {
      return {
        ...state,
        isOpen: false
      }
    },
  }
})

export default popupSlice.reducer

const {
  getPopupDataSuccess,
  getPopupData,
  getPopupDataFailed,
  onOpenPopup,
  onClosePopup
} = popupSlice.actions

export const popupActions: IPopupActions = {
  getPopupDataSuccess: getPopupDataSuccess,
  getPopupData: getPopupData,
  getPopupDataFailed: getPopupDataFailed,
  onOpenPopup: onOpenPopup,
  onClosePopup: onClosePopup
}