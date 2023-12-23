import addEventListeners from './event-handlers.js';
import BlocksList from './BlocksList.js';
import InputModes from './InputModes.js';

const blocksList = new BlocksList();
blocksList.renderBlocks();

const inputModes = new InputModes();
inputModes.renderCurrentInputMode();
inputModes.renderInputModeOptions();

window.addEventListener('load', () => addEventListeners(blocksList, inputModes));
