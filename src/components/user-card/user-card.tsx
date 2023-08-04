import React, {FunctionComponent} from 'react';

import userCardStyles from './user-card.module.css';

import {TUserCard} from '../../services/types/props';

export const UserCard: FunctionComponent<TUserCard> = (props) => {
  return (
    <li className={userCardStyles.card}
        onClick={props.onClickCard}>
      <div className={userCardStyles['card__content-wrap']}>
        <img src={props.avatarSrc} alt="Аватар пользователя" className={userCardStyles.avatar}/>
        <div className={userCardStyles['card__text-wrap']}>
          <h2
            className={`${userCardStyles['card__text']} ${userCardStyles['card__text_heading']}`}>{props.login}</h2>
          <p className={`${userCardStyles['card__text']} ${userCardStyles['card__text_paragraph']}`}>
            <span className={`${userCardStyles['card__text']} ${userCardStyles['card__text_span']}`}>
              Тип аккаунта:&ensp;
            </span>
            {props.type === 'User'
            ? 'Пользователь'
            : 'Организация'}
          </p>
        </div>
      </div>
      <a href={props.profileUrl}
         className={`${userCardStyles['card__text']} ${userCardStyles['card__text_paragraph']} ${userCardStyles['card__text_link']}`}
         target="_blank" rel="noreferrer">
        Перейти в профиль на GitHub
      </a>
    </li>
  )
}