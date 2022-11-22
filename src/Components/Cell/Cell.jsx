import React, { useRef, useState } from 'react';
import classes from './Cell.module.css';

const Cell = (props) => {
  const refCell = useRef();

  const onChangeHandler = () => {
    props.onChange(parseInt(refCell.current.value) || 0, props.i, props.j);
  };

  return (
    <>
      <input
        ref={refCell}
        type='text'
        maxLength='1'
        className={classes.cell}
        value={props.data}
        onInput={onChangeHandler}
        onFocus={(e) => (e.target.value = '')}
      />
    </>
  );
};

export default Cell;
