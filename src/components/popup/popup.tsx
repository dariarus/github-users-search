import React, {FunctionComponent, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';

import popupStyles from './popup.module.css';

import {Overlay} from '../overlay/overlay';
import {TPopup} from '../../services/types/props';
import userCardStyles from '../user-card/user-card.module.css';

export const Popup: FunctionComponent<TPopup> = (props) => {
  const popupRoot = document.getElementById('popup');

  const handleEscClose = useCallback((evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      props.onClosePopup();
    }
  }, [props])

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose)
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, [handleEscClose])

  if (popupRoot !== null) {
    return ReactDOM.createPortal(
      (
        <>
          <Overlay onClose={props.onClosePopup}/>
          <div className={popupStyles.popup}>
            <button className={popupStyles['popup__cross-icon']} onClick={() => {
              props.onClosePopup()
            }}>
            </button>
            <h3 className={`${popupStyles['popup__text']} ${popupStyles['popup__text_heading']}`}>{props.login}</h3>
            <a href={props.profileUrl}
               className={`${popupStyles['popup__text']} ${popupStyles['popup__text_link']}`}
               target="_blank">
              Посмотреть на GitHub
            </a>
            <p className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']}`}>
              <span
                className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']} ${popupStyles['popup__text_span']}`}>
                Имя:&ensp;
              </span>
              {props.username}
            </p>
            <p className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']}`}>
              <span
                className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']} ${popupStyles['popup__text_span']}`}>
                О пользователе:&ensp;
              </span>
              {props.userInfo}
            </p>
            <p className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']}`}>
              <span
                className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']} ${popupStyles['popup__text_span']}`}>
                Подписчики:&ensp;
              </span>
              {props.followers}
            </p>
            <p className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']}`}>
              <span
                className={`${popupStyles['popup__text']} ${popupStyles['popup__text_paragraph']} ${popupStyles['popup__text_span']}`}>
                Подписки:&ensp;
              </span>
              {props.following}
            </p>
          </div>
        </>
      ), popupRoot
    )
  } else return null

}