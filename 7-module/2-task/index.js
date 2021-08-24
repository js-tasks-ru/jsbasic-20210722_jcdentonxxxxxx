import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.elem.addEventListener('click', this.clickClose);

  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">

            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>

          <div class="modal__body">
          </div>
        </div>

      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.documentElement.addEventListener('keydown', this.keyClose);
  }

  setTitle(str) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = str;
  }

  setBody(elem) {
    let modalBody = this.elem.querySelector('.modal__body');
    let child = modalBody.firstElementChild;
    if (child) {
      child.remove();
    }
    modalBody.append(elem);
  }

  close() {
    let modal = document.body.querySelector('.modal');
    if (!modal) {
      return;
    }
    modal.remove();
    document.body.classList.remove('is-modal-open');
    document.documentElement.removeEventListener('keydown', this.keyClose);
  }

  clickClose = (e) => {
    let modalClose = e.target.closest('.modal__close');
    if (!modalClose) {
      return;
    }

    let modal = e.target.closest('.modal');
    modal.remove();
    document.body.classList.remove('is-modal-open');
    document.documentElement.removeEventListener('keydown', this.keyClose);
  }

  keyClose = (e) => {
    if (e.code === 'Escape') {
      let modal = document.body.querySelector('.modal');
      modal.remove();
      document.body.classList.remove('is-modal-open');
      e.currentTarget.removeEventListener('keydown', this.keyClose);
    }
  }
}
