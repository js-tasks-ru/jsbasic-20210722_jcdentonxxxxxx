export default function promiseClick(button) {
  return new Promise((resolve) => {
    button.onclick = (event) => {
      return resolve(event);
    };
  });
}
