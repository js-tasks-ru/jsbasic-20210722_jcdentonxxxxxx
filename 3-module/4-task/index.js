function showSalary(users, age) {
  let result = users.filter(item => item.age <= age);
  let str = '';
  for (let i = 0; i < result.length; i++) {
    str += result[i].name + ', ' + result[i].balance;
    if (i < result.length - 1) {
      str += '\n';
    }
  }


  return str;
}
