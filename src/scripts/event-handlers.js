import {
  showInputModeOptionsPopup,
  isVisibleInputModeOptionsPopup,
  hideInputModeOptionsPopup,
  setFilteringInputSpan,
  showFilteringInputSpan,
  hideFilteringInputSpan,
} from './input-mode-options-popup-helpers.js';

const addEventListeners = (blocksListObject, inputModesObject) => {
  const editorInput = document.querySelector('#editor__input');

  editorInput.addEventListener('input', (event) => {
    const { value } = event.target;
    if (value.startsWith('/')) {
      showInputModeOptionsPopup();
      const filteringInput = value
        .slice(1)
        .trim()
        .split(/\b(\s)/)[0];

      if (filteringInput) {
        showFilteringInputSpan();
        setFilteringInputSpan(filteringInput);
        inputModesObject.setHighlightedInputModeByPrefix(filteringInput);
      } else {
        hideFilteringInputSpan();
      }
    } else {
      hideInputModeOptionsPopup();
    }
  });

  editorInput.addEventListener('keyup', (event) => {
    if (isVisibleInputModeOptionsPopup()) {
      if (event.key === 'Escape') {
        hideInputModeOptionsPopup();
        // TODO: Remove the next line if this is not desired behavior
        editorInput.value = '';
      } else if (event.key === 'Enter' || event.key === ' ') {
        inputModesObject.setCurrentInputModeToHighlighted();
        hideInputModeOptionsPopup();
      } else if (event.key === 'ArrowUp') {
        inputModesObject.incrementHighlightedInputModeId();
      } else if (event.key === 'ArrowDown') {
        inputModesObject.decrementHighlightedInputModeId();
      }
    }

    if (!isVisibleInputModeOptionsPopup()) {
      if (event.key === 'Backspace' && editorInput.value === '') {
        inputModesObject.setCurrentInputModeById(0);
      }
      if (event.key === 'Escape' && editorInput.value === '') {
        inputModesObject.setCurrentInputModeById(0);
      }
      if (event.key === 'Enter' && editorInput.value.length > 0) {
        const blockType = inputModesObject.currentInputMode.type;
        blocksListObject.addBlock(blockType, editorInput.value);
        inputModesObject.setCurrentInputModeById(0);
      }
    }
  });

  const inputModeOptions = document.querySelector(
    '#editor__input-mode-options-popup',
  );

  inputModeOptions.addEventListener('click', (event) => {
    let clickedElem = event.target;

    if (clickedElem.closest('li')) {
      clickedElem = event.target.closest('li');
    }

    const { inputModeId } = clickedElem.dataset;
    inputModesObject.setCurrentInputModeById(inputModeId);
    hideInputModeOptionsPopup();
  });
};

export default addEventListeners;
