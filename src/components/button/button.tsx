import React, {FunctionComponent} from 'react';

import buttonStyles from './button.module.css';

import {ButtonName, TButton} from '../../services/types/props';

export const Button: FunctionComponent<TButton> = (props) => {
  return (
    <button type="submit"
            className={props.buttonName === ButtonName.SEARCH
              ? `${buttonStyles.button} ${buttonStyles['button_search']}`
              : `${buttonStyles.button} ${buttonStyles['button_more']}`}
            onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  )
}