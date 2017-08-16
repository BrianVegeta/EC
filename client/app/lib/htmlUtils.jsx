/* eslint-disable import/prefer-default-export */
import React from 'react';

export const htmlNewLineToBreak = text => (
  <div>
    {text.split('\n').map(t => (
      <div>{t}</div>
    ))}
  </div>
);
