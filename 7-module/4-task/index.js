import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    this.steps = steps;
    this.value = value;
    this.render();

    this.elem.addEventListener('click', this.onClick);

    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.addEventListener('pointerdown', this.onPointerDown);

  }

  render() {
    this.elem = createElement(`

      <div class="slider">
        <div class="slider__thumb" style="left: ${this.value / (this.steps - 1) * 100}%;">
          <span class="slider__value">${this.value}</span>
        </div>

        <div class="slider__progress" style="width: ${this.value / (this.steps - 1) * 100}%;"></div>

        <div class="slider__steps">

        </div>
      </div>

    `);

    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      let span = createElement(`<span></span>`);
      if (i === this.value) {
        span.classList.add('slider__step-active');
      }
      sliderSteps.append(span);
    }
  }

  onClick = (e) => {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    if (this.value === value) {
      return;
    }
    this.value = value;


    this.changeValue();
    this.checkSteps();
    this.moveThumb(segments);
    this.moveProgress(segments);

    this.makeEvent();
  }

  changeValue() {
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value;
  }

  checkSteps() {
    let sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    for (let i = 0; i < sliderSteps.length; i++) {
      if (sliderSteps[i].classList.contains('slider__step-active')) {
        sliderSteps[i].classList.remove('slider__step-active');
      }

      if (i === this.value) {
        sliderSteps[i].classList.add('slider__step-active');
      }
    }
  }

  moveThumb(segments) {

    this.sliderThumb.style.left = `${this.value / segments * 100}%`;
  }

  moveProgress(segments) {
    let sliderProgress = this.elem.querySelector('.slider__progress');
    sliderProgress.style.width = `${this.value / segments * 100}%`;
  }

  makeEvent() {
    let customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

  onPointerDown = (e) => {
    e.preventDefault();
    this.elem.classList.add('slider_dragging');
    let oldValue = this.value;
    let shiftX = e.clientX - this.sliderThumb.getBoundingClientRect().left - this.sliderThumb.offsetWidth / 2;


    let pointerMove = (e) => {
      e.preventDefault();

      let left = e.clientX - shiftX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;
      let progress = this.elem.querySelector('.slider__progress');
      this.sliderThumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);

      if (this.value === value) {
        return;
      }
      this.value = value;
      this.checkSteps();
      this.changeValue();

    };

    let pointerUp = (e) => {
      this.moveThumb(this.steps - 1);
      this.moveProgress(this.steps - 1);
      if (this.value !== oldValue) {
        this.makeEvent();
      }
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointerup', pointerUp);
      document.removeEventListener('pointermove', pointerMove);

    };

    document.addEventListener('pointermove', pointerMove);
    document.addEventListener('pointerup', pointerUp);

  }


}
