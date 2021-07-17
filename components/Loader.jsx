import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from '../styles/Loader.module.css'

export default function SimpleBackdrop({showLoader}) {
  return (
    <Backdrop className={style.backdrop} open={showLoader}>
        <CircularProgress 
          className={style.colorPrimary}
        />
    </Backdrop>
  );
}