function factorial(n) {
  if (n == 1 || n == 0) {
    return 1;
  }

  let fact = n;
  for (let i = n - 1; i >= 1; i--) {
    fact *= i;
  }

  return fact;
}
