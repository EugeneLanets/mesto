export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item)
  }

  renderItems() {
    this._container.append(...this._items.map(item => this._renderer(item)));
  }
}