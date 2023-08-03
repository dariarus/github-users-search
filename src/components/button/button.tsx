import React, {FunctionComponent} from 'react';

import buttonStyles from './button.module.css';

import {TButton} from '../../services/types/props';

export const Button: FunctionComponent<TButton> = (props) => {
  return (
    <button type="submit"
            className={`${buttonStyles.button} ${buttonStyles['button_search']}`}
            onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  )
}