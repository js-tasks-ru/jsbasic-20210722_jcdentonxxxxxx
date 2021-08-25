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

    let customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
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
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    sliderThumb.style.left = `${this.value / segments * 100}%`;
  }

  moveProgress(segments) {
    let sliderProgress = this.elem.querySelector('.slider__progress');
    sliderProgress.style.width = `${this.value / segments * 100}%`;
  }
}
