function highlight(table) {
  let numberGender = findNumber(table, 'Gender');
  let numberAge = findNumber(table, 'Age');



  let trList = table.querySelectorAll('tbody tr');
  for (let i = 0; i < trList.length; i++) {
    let currentTr = trList[i];
    let tdList = currentTr.querySelectorAll('td');
    let available = currentTr.querySelector('[data-available]');

    if (available) {
      available.dataset.available === 'true' ? currentTr.classList.add('available') : currentTr.classList.add('unavailable');

    } else {
      currentTr.hidden = true;
    }

    checkMaleFemale(tdList, numberGender, currentTr);
    checkAge(tdList, numberAge, currentTr);
  }
}


function findNumber(table, str) {
  let listTdHead = table.firstElementChild.querySelectorAll('td');

  for (let i = 0; i < listTdHead.length; i++) {
    if (listTdHead[i].innerHTML.toLowerCase() === str.toLowerCase()) {
      return i;
    }

  }
}

function checkMaleFemale(tdList, numberGender, currentTr) {
  if (tdList[numberGender].innerHTML === 'm') {
    currentTr.classList.add('male');

  } else if (tdList[numberGender].innerHTML === 'f') {
    currentTr.classList.add('female');
  }
}

function checkAge(tdList, numberAge, currentTr) {
  if (tdList[numberAge].innerHTML < 18) {
    currentTr.style.textDecoration = 'line-through';
  }
}
