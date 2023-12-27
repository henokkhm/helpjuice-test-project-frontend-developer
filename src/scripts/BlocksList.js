class BlocksList {
  #blocks;

  constructor() {
    const storedBlocks = localStorage.getItem('blocks');
    this.#blocks = storedBlocks ? JSON.parse(storedBlocks) : [];
  }

  get blocks() {
    return this.#blocks;
  }

  addBlock(type, content) {
    const randId = Math.floor(Math.random() * 10 ** 16);

    const newBlock = {
      id: randId,
      type,
      content,
    };

    this.#blocks.push(newBlock);

    localStorage.setItem('blocks', JSON.stringify(this.#blocks));
    this.renderBlocks();
    return newBlock;
  }

  removeBlock(id) {
    this.#blocks = this.#blocks.filter((block) => block.id !== id);
    localStorage.setItem('blocks', JSON.stringify(this.#blocks));
    this.renderBlocks();
  }

  updateBlock(id, newContent) {
    const newBlocks = this.#blocks.map((block) => {
      if (block.id === id) {
        return { ...block, content: newContent };
      }
      return block;
    });

    this.#blocks = newBlocks;

    localStorage.setItem('blocks', JSON.stringify(this.#blocks));
  }

  renderBlocks() {
    const savedBlocksList = document.querySelector(
      '#editor__saved-blocks-list',
    );
    savedBlocksList.innerHTML = '';

    const blocksHTML = document.createDocumentFragment();

    this.#blocks.forEach(({ id, type, content }) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('editor__saved-block-item-wrapper');
      const deleteButton = BlocksList.generateDeleteButton(id);
      wrapper.appendChild(deleteButton);

      const block = document.createElement(type);
      block.classList.add('editor__saved-block-item');
      block.setAttribute('data-block-id', id);
      block.setAttribute('data-block-type', type);
      block.setAttribute('contenteditable', true);
      block.textContent = content;
      wrapper.appendChild(block);

      blocksHTML.appendChild(wrapper);
    });

    savedBlocksList.appendChild(blocksHTML);
  }

  static generateDeleteButton(blockId) {
    const trashBinSVG = `<svg
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 15C1.8375 15 1.4845 14.8369 1.191 14.5108C0.8975 14.1847 0.7505 13.7922 0.75 13.3333V2.5H0V0.833333H3.75V0H8.25V0.833333H12V2.5H11.25V13.3333C11.25 13.7917 11.1032 14.1842 10.8097 14.5108C10.5162 14.8375 10.163 15.0006 9.75 15H2.25ZM9.75 2.5H2.25V13.3333H9.75V2.5ZM3.75 11.6667H5.25V4.16667H3.75V11.6667ZM6.75 11.6667H8.25V4.16667H6.75V11.6667Z"
              fill="#E1E3E6"
            />
          </svg>`;
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'editor__saved-block-item__delete-btn');
    btn.setAttribute('data-block-id', blockId);
    btn.innerHTML = trashBinSVG;

    return btn;
  }
}

export default BlocksList;
