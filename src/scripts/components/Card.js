class Card {
  constructor({name, link, likes}, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._likes = likes || [];
  }

  _getTemplateElement() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_active");
    evt.target.blur();
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeButton);

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => this._handleDeleteButton());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplateElement();
    const image = this._element.querySelector(".card__image");
    const title = this._element.querySelector(".card__text");
    const likeCounter = this._element.querySelector(".card__like-counter");

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;
    likeCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;