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
    return newBlock;
  }

  removeBlock(id) {
    this.#blocks = this.#blocks.filter((block) => block.id !== id);
    localStorage.setItem('blocks', JSON.stringify(this.#blocks));
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

  generateHTML() {
    const blocksHTML = [];

    this.#blocks.forEach(({ id, type, content }) => {
      blocksHTML.push(
        `<${type} class="editor__saved-block-item" data-block-id="${id}" data-block-type="${type}">${content}</${type}>`,
      );
    });

    return blocksHTML.join('\n');
  }
}

export default BlocksList;
