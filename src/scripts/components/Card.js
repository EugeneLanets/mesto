class Card {
  constructor(
      {name, link, likes, owner, _id}, 
      cardSelector, 
      handleImageClick, 
      handleCardDelete, 
      userId) {
    
    this._name = name;
    this._link = link;
    this._likes = likes || [];
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  
    this._IsOwnedByUser = owner._id === userId;
    this._handleCardDelete = handleCardDelete;
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

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeButton);

    if (this._IsOwnedByUser) {
      this._element
        .querySelector(".card__delete")
        .addEventListener("click", () => this._handleCardDelete());
    }

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick(this._name, this._link));
  }

  remove() {
    this._element.remove();
  }

  getId() {
    return this._id;
  }

  generateCard() {
    this._element = this._getTemplateElement();
    const image = this._element.querySelector(".card__image");
    const title = this._element.querySelector(".card__text");
    const likeCounter = this._element.querySelector(".card__like-counter");
    const deleteButton = this._element.querySelector(".card__delete");

    if (!this._IsOwnedByUser) deleteButton.remove();

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;
    likeCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;