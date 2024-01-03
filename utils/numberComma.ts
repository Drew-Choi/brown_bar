import React, { ChangeEvent, RefObject } from 'react';

//천단위 콤마생성
export const changeEnteredNumComma = (el: number | string) => {
  const comma = (el: number | string) => {
    el = String(el);
    return el?.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };
  const uncomma = (el: number | string) => {
    el = String(el);
    return el.replace(/[^\d]+/g, '');
  };
  return comma(uncomma(el));
};

export const commaInput = (
  e: ChangeEvent<HTMLInputElement>,
  fn: Function,
  ref: RefObject<HTMLInputElement>,
) => {
  const cursorPosition = e.target.selectionStart;
  const oldValue = e.target.value;
  const newValue = changeEnteredNumComma(e.target.value);

  fn(newValue);

  const oldCommaCount = (oldValue.substring(0, Number(cursorPosition)).match(/,/g) || []).length;
  const newCommaCount = (newValue.substring(0, Number(cursorPosition)).match(/,/g) || []).length;
  const cursorOffset = newCommaCount - oldCommaCount;

  if (cursorPosition !== null) {
    setTimeout(() => {
      ref.current?.setSelectionRange(cursorPosition + cursorOffset, cursorPosition + cursorOffset);
    }, 0);
  }
};

//콤마제거하고 연산 가능한 숫자로 바꾸기
export const resultCommaRemove = (el: string) => {
  return Number(el.split(',').reduce((cur, acc) => cur + acc, ''));
};
//-------
