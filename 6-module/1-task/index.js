/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML =
      `
      <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
      </thead>
      `;

    this.createTable(rows);

    this.elem.addEventListener('click', function (e) {
      if (e.target.tagName !== 'BUTTON') {
        return;
      }

      let parent = e.target.closest('tr');
      parent.remove();
    });

  }

  createTable(rows) {
    let tBody = document.createElement('tbody');

    for (let row of rows) {
      let tr = document.createElement('tr');

      let tdName = document.createElement('td');
      tdName.innerHTML = row.name;
      tr.append(tdName);

      let tdAge = document.createElement('td');
      tdAge.innerHTML = row.age;
      tr.append(tdAge);

      let tdSalary = document.createElement('td');
      tdSalary.innerHTML = row.salary;
      tr.append(tdSalary);

      let tdCity = document.createElement('td');
      tdCity.innerHTML = row.city;
      tr.append(tdCity);

      let tdButton = document.createElement('td');
      tdButton.innerHTML = `<button>X</button>`;
      tr.append(tdButton);


      tBody.append(tr);
    }

    this.elem.append(tBody);
  }


}
