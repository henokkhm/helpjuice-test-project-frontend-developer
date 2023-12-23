import {
  showInputModeOptionsPopup,
  hideInputModeOptionsPopup,
  setFilteringInputSpan,
  showFilteringInputSpan,
  hideFilteringInputSpan,
} from './input-mode-options-popup-helpers.js';

const addEditorInputEventListeners = () => {
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
      } else {
        hideFilteringInputSpan();
      }
    } else {
      hideInputModeOptionsPopup();
    }
  });

  editorInput.addEventListener('blur', hideInputModeOptionsPopup);

  editorInput.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      hideInputModeOptionsPopup();
      // TODO: Remove the next line if this is not desired behavior
      editorInput.value = '';
    }
  });
};

export default addEditorInputEventListeners;
