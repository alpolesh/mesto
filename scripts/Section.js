export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clearContainer() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clearContainer();
    this._renderedItems.forEach((item) => {
      _this.renderer(item);
    }) 
  }

  setItem(element) {
    this._container.append(element);
  }
}