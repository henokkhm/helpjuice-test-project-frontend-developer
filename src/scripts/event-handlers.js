import {
  showInputModeOptionsPopup,
  isVisibleInputModeOptionsPopup,
  hideInputModeOptionsPopup,
  setFilteringInputSpan,
  showFilteringInputSpan,
  hideFilteringInputSpan,
} from './input-mode-options-popup-helpers.js';

/**
 * Adds event listeners to the main textbox that the user can use to create blocks.
 * @param {Object} blocksListObject - an instance of the BlocksList class that keeps
 * track of the blocks that have been added by the user
 * @param {Object} inputModesObject - an instance of the InputModes class that keeps
 * track of all the available input modes (such as paragraph, heading, etc..), and the
 * input mode that is currently selected
 * @returns {void}
 */
const addEditorEventListeners = (blocksListObject, inputModesObject) => {
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
};

/**
 * Adds event listeners to the pop up menu that allows the user to select an input mode.
 * @param {Object} inputModesObject - an instance of the InputModes class that keeps
 * track of all the available input modes (such as paragraph, heading, etc..), and the
 * input mode that is currently selected
 * @returns {void}
 */
const addInputModePopUpEventListeners = (inputModesObject) => {
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

/**
 * Adds event listeners to the div that contains saved blocks, that allows the user to
 * edit or delete each block.
 * @param {Object} blocksListObject - an instance of the BlocksList class that keeps
 * track of the blocks that have been added by the user
 * @returns {void}
 */
const addBlocksListEventListeners = (blocksListObject) => {
  const blocksListDiv = document.querySelector('#editor__saved-blocks-list');

  blocksListDiv.addEventListener('click', (event) => {
    let clickedElem = event.target;

    if (clickedElem.closest('button')) {
      clickedElem = event.target.closest('button');
    }

    if (
      clickedElem.classList.contains('editor__saved-block-item__delete-btn')
    ) {
      const { blockId } = clickedElem.dataset;
      const intId = parseInt(blockId, 10);
      blocksListObject.removeBlock(intId);
    }
  });

  blocksListDiv.addEventListener('keyup', (event) => {
    const { target } = event;
    if (target.classList.contains('editor__saved-block-item')) {
      const newBlockContent = target.innerText;
      const { blockId } = target.dataset;
      const intId = parseInt(blockId, 10);
      blocksListObject.updateBlock(intId, newBlockContent);
    }
  });
};

const addEventListeners = (blocksListObject, inputModesObject) => {
  addEditorEventListeners(blocksListObject, inputModesObject);
  addInputModePopUpEventListeners(inputModesObject);
  addBlocksListEventListeners(blocksListObject);
};

export default addEventListeners;
