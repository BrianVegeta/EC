/* eslint-disable import/prefer-default-export */
import React from 'react';

export const htmlNewLineToBreak = text => (
  <div>
    {text.split('\n').map((t, i) => (
      <div key={`${i + 1}`}>{t}</div>
    ))}
  </div>
);
