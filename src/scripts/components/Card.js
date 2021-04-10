class Card {
  constructor(
      {name, link, likes, owner, _id}, 
      cardSelector, 
      handleImageClick, 
      handleCardDelete, 
      handleCardLike,
      userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._userId = userId;
    this._owner = owner;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplateElement() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeButton(evt) {
    this._handleCardLike(evt)
      .then(({likes}) => {
        evt.target.classList.remove("card__like-button_active");
        this._likes = likes;
        this._updateLikes();
      })
      .catch(err => {
        console.log(err);
      })
    
  }

  _getLikesCount() {
    return this._likes.length;
  }

  _isLikedByUser() {
    const result = this._likes.find(
      like => like._id === this._userId
    );
    return Boolean(result);
  }

  _isOwnedByUser() {
    return this._owner._id === this._userId;
  }

  _toggleLikeButton(likeButtonElement) {
    likeButtonElement.classList.toggle("card__like-button_active");
  }

  _updateLikes() {
    const likeCounter = this._element.querySelector(".card__like-counter");
    const likeButton = this._element.querySelector(".card__like-button");

    likeCounter.textContent = this._getLikesCount();
    if (this._isLikedByUser()) {
      this._toggleLikeButton(likeButton);
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => this._handleLikeButton(evt));

    if (this._isOwnedByUser()) {
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
    const deleteButton = this._element.querySelector(".card__delete");

    this._updateLikes();
    if (!this._isOwnedByUser()) deleteButton.remove();

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;