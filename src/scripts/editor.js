import {
  showBlockOptionsPopup,
  hideBlockOptionsPopup,
  setFilteringInputSpan,
  showFilteringInputSpan,
  hideFilteringInputSpan,
} from './block-options-popup.js';

const addEditorInputEventListeners = () => {
  const editorInput = document.querySelector('#editor__input');

  editorInput.addEventListener('input', (event) => {
    const { value } = event.target;
    if (value.startsWith('/')) {
      showBlockOptionsPopup();
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
    }
  });

  editorInput.addEventListener('blur', hideBlockOptionsPopup);

  editorInput.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      hideBlockOptionsPopup();
      // TODO: Remove the next line if this is not desired behavior
      editorInput.value = '';
    }
  });
};

export default addEditorInputEventListeners;
