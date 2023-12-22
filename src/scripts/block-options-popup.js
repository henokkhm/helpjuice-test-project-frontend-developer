export const showBlockOptionsPopup = () => {
  const blockOptionsPopup = document.querySelector(
    '#editor__block-options-popup',
  );
  blockOptionsPopup.classList.add('visible');
};

export const hideBlockOptionsPopup = () => {
  const blockOptionsPopup = document.querySelector(
    '#editor__block-options-popup',
  );
  blockOptionsPopup.classList.remove('visible');
};

export const setFilteringInputSpan = (filteringInput) => {
  const filteringKeywordSpan = document.querySelector(
    '#block-options-popup__filtering-keyword',
  );
  filteringKeywordSpan.innerHTML = filteringInput;
};

export const showFilteringInputSpan = () => {
  const filteringKeywordSpan = document.querySelector(
    '#block-options-popup__filtering-keyword',
  );
  filteringKeywordSpan.classList.add('visible');
};

export const hideFilteringInputSpan = () => {
  const filteringKeywordSpan = document.querySelector(
    '#block-options-popup__filtering-keyword',
  );
  filteringKeywordSpan.classList.remove('visible');
};
