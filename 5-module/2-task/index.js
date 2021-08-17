function toggleText() {
  let toggleButton = document.body.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  toggleButton.onclick = function () {
    text.hidden = !text.hidden;
  };
}
