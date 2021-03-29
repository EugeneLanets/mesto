import Popup from "./Popup";


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".big-picture__image");
    this._caption = this._popup.querySelector(".big-picture__caption");
  }

  open(caption, link) {
    this._image.src = link;
    this._image.alt = caption;
    this._caption.textContent = caption;
    super.open()
  }
}