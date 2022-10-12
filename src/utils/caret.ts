const setCaretAt = (element: HTMLElement, position: 'start' | 'end'): void => {
  const selection = window.getSelection();
  selection?.removeAllRanges();

  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(position === 'start');

  selection?.addRange(range);

  element.focus();
};

/**
 * Focuses inside the element and moves caret to the end.
 *
 * @param element
 */
export const setCaretAtEnd = (element: HTMLElement): void => {
  setCaretAt(element, 'end');
};

/**
 * Focuses inside the element and moves caret to the start.
 *
 * @param element
 */
export const setCaretAtStart = (element: HTMLElement): void => {
  setCaretAt(element, 'start');
};
