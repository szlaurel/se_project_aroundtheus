class Section {
  constructor({ data, renderer }, cardSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._cardSelector = document.querySelector(cardSelector);
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardSelector.append(element);
  }
}

export default Section;
