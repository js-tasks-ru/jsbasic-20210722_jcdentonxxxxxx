function hideSelf() {
  let button = document.body.querySelector('.hide-self-button');
  button.onclick = function (e) {
    e.currentTarget.hidden = 'true';
  };
}
