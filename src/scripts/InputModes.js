class InputModes {
  #inputModes;

  #currentInputMode;

  #highlightedInputModeId;

  constructor() {
    this.#inputModes = [
      {
        id: 0,
        type: 'p',
        matcher: '0',
        label: 'Paragraph',
        description: 'Simply type text',
        placeholder: 'Type / for blocks, @ to link docs or people',
      },
      {
        id: 1,
        matcher: '1',
        type: 'h1',
        label: 'Heading 1',
        description: 'Shortcut: type # + space',
        placeholder: 'Heading 1',
      },
      {
        id: 2,
        type: 'h1',
        matcher: '2',
        label: 'Expandable Heading 1',
        description: 'Shortcut: type >># + space',
        placeholder: 'Expandable Heading 1',
      },
    ];

    [this.#currentInputMode] = this.#inputModes;
    this.#highlightedInputModeId = 0;
  }

  get modes() {
    return this.#inputModes;
  }

  decrementHighlightedInputModeId() {
    this.#highlightedInputModeId = (this.#highlightedInputModeId + 1) % this.#inputModes.length;

    this.renderInputModeOptions();
  }

  incrementHighlightedInputModeId() {
    const len = this.#inputModes.length;
    this.#highlightedInputModeId = (this.#highlightedInputModeId - 1 + len) % len;

    this.renderInputModeOptions();
  }

  setCurrentInputModeToHighlighted() {
    const highlightedInputMode = this.#inputModes.filter(
      (mode) => mode.id === this.#highlightedInputModeId,
    );
    this.#currentInputMode = highlightedInputMode;
    this.renderInputModeOptions();
  }

  setCurrentInputModeById(id) {
    const desiredInputMode = this.#inputModes.find((mode) => mode.id === id);
    this.#currentInputMode = desiredInputMode;
    this.renderInputModeOptions();
  }

  setHighlightedInputModeByPrefix(prefix) {
    const desiredInputMode = this.#inputModes.find(
      (mode) => mode.matcher === prefix,
    );

    if (desiredInputMode && desiredInputMode.matcher.startsWith(prefix)) {
      this.#highlightedInputModeId = desiredInputMode.id;
      this.renderInputModeOptions();
    }
  }

  renderCurrentInputMode() {
    const textareaElement = document.querySelector('#editor__input');

    /*
      Create and render an element such as:
      <textarea class="editor__input" id="editor__input" name="editor__input" cols="30" rows="10"
       placeholder="Type / for blocks, @ to link docs or people"></textarea>
    */
    const newTextAreaElement = document.createElement('textarea');
    newTextAreaElement.classList.add('editor__input');
    newTextAreaElement.classList.add(this.#currentInputMode.type);
    newTextAreaElement.setAttribute('id', 'editor__input');
    newTextAreaElement.setAttribute('name', 'editor__input');
    newTextAreaElement.setAttribute('cols', '30');
    newTextAreaElement.setAttribute('rows', '10');
    newTextAreaElement.setAttribute(
      'placeholder',
      this.#currentInputMode.placeholder,
    );

    textareaElement.replaceWith(newTextAreaElement);
  }

  renderInputModeOptions() {
    /*
      Create and render an element such as:
       <li class="input-mode-options-list__option-item" data-input-mode-id="">
          <span class="input-mode-options-list__option-item__icon">T</span>
          <span class="input-mode-options-list__option-item__label">Heading 1</span>
          <span class="input-mode-options-list__option-item__description">
            Shortcut: type # + space
          </span>
        </li>
    */
    const inputModesWrapper = document.querySelector(
      '#input-mode-options-popup__input-mode-options-list',
    );
    inputModesWrapper.innerHTML = '';

    const inputModesHTML = document.createDocumentFragment();

    // slice(1) to exclude the default paragraph mode
    this.#inputModes.slice(1).forEach((mode) => {
      const li = document.createElement('li');
      li.classList.add('input-mode-options-list__option-item');
      li.setAttribute('data-input-mode-id', mode.id);

      if (mode.id === this.#highlightedInputModeId) {
        li.classList.add('highlighted');
      }

      const iconSpan = document.createElement('span');
      iconSpan.classList.add('input-mode-options-list__option-item__icon');
      iconSpan.textContent = 'T';
      li.appendChild(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('input-mode-options-list__option-item__label');
      labelSpan.textContent = mode.label;
      li.appendChild(labelSpan);

      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add(
        'input-mode-options-list__option-item__description',
      );
      descriptionSpan.textContent = mode.description;
      li.appendChild(descriptionSpan);

      inputModesHTML.appendChild(li);
    });

    inputModesWrapper.appendChild(inputModesHTML);
  }
}

export default InputModes;
