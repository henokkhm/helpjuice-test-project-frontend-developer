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
    this.renderHTML();
    return newBlock;
  }

  removeBlock(id) {
    this.#blocks = this.#blocks.filter((block) => block.id !== id);
    localStorage.setItem('blocks', JSON.stringify(this.#blocks));
    this.renderHTML();
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
    this.renderHTML();
  }

  renderBlocks() {
    if (this.#blocks.length === 0) {
      return;
    }

    const savedBlocksList = document.querySelector(
      '#editor__saved-blocks-list',
    );
    savedBlocksList.innerHTML = '';

    const blocksHTML = document.createDocumentFragment();

    this.#blocks.forEach(({ id, type, content }) => {
      const block = document.createElement(type);
      block.classList.add('editor__saved-block-item');
      block.setAttribute('data-block-id', id);
      block.setAttribute('data-block-type', type);
      block.textContent = content;

      blocksHTML.appendChild(block);
    });

    blocksHTML.appendChild(blocksHTML);
  }
}

export default BlocksList;
