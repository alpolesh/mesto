export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clearContainer() {
    this._container.innerHTML = '';
  }

  renderItems(renderedItems) {
    this.clearContainer();
    renderedItems.forEach((item) => {
      this._renderer(item);
    }) 
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}