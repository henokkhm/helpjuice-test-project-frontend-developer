export const showInputModeOptionsPopup = () => {
  const InputModeOptionsPopup = document.querySelector(
    '#editor__input-mode-options-popup',
  );
  InputModeOptionsPopup.classList.add('visible');
};

export const isVisibleInputModeOptionsPopup = () => {
  const InputModeOptionsPopup = document.querySelector(
    '#editor__input-mode-options-popup',
  );
  return InputModeOptionsPopup && InputModeOptionsPopup.classList.contains('visible');
};

export const hideInputModeOptionsPopup = () => {
  const InputModeOptionsPopup = document.querySelector(
    '#editor__input-mode-options-popup',
  );
  InputModeOptionsPopup.classList.remove('visible');
};

export const setFilteringInputSpan = (filteringInput) => {
  const filteringKeywordSpan = document.querySelector(
    '#input-mode-options-popup__filtering-keyword',
  );
  filteringKeywordSpan.innerHTML = filteringInput;
};

export const showFilteringInputSpan = () => {
  const filteringKeywordSpan = document.querySelector(
    '#input-mode-options-popup__filtering-keyword',
  );
  filteringKeywordSpan.classList.add('visible');
};

export const hideFilteringInputSpan = () => {
  const filteringKeywordSpan = document.querySelector(
    '#input-mode-options-popup__filtering-keyword',
  );
  filteringKeywordSpan.classList.remove('visible');
};
