const form = document.querySelector(".calc_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const salario = document.querySelector("#salario_input").value;
  const dependentes = document.querySelector("#dependentes_input").value;
  const result = document.querySelector('.result')

  calcular(salario, dependentes);
  result.classList.remove('none')
});

function calcular(salario, dependentes) {
  let inss = getInss(salario);
  let dep = descontarDependentes(inss, dependentes);
  let imposto = getAliquota(dep)

  let ref = document.querySelector('#ref');
  let valor = document.querySelector('#valor');

  ref.textContent = imposto.ref
  valor.textContent = imposto.valor.toFixed(2)
}

function getInss(salario) {
  let newSalario = 0;

  if (salario > 0 && salario < 1302.0) {
    newSalario = salario - (salario * 7.5) / 100;
  } else if (salario > 1302.01 && salario < 2571.29) {
    newSalario = salario - (salario * 9) / 100;
  } else if (salario > 2571.3 && salario < 3856.94) {
    newSalario = salario - (salario * 12) / 100;
  } else if (salario > 3856.95) {
    newSalario = salario - (salario * 14) / 100;
  }
  return newSalario;
}

function descontarDependentes(valor, dependentes){
  let newSalario = valor;

  if(dependentes > 0){
    newSalario = valor - (189.59 * dependentes)
  };

  return newSalario;
}

function getAliquota(salario){
  let newSalario = {
    ref: 'isento',
    valor: 0
  }

  if (salario > 0 && salario < 2112.00) {
    newSalario.valor = 0;
    newSalario.ref = 'isento'
  } else if (salario > 2112.01 && salario < 2826.65) {
    newSalario.valor = salario * 7.5 / 100 - 158.40;
    newSalario.ref = '7.5%'
  } else if (salario > 2826.66 && salario < 3751.05) {
    newSalario.valor = salario * 15 / 100 - 370.40;
    newSalario.ref = '15%'
  } else if (salario > 3751.06 && salario < 4664.68) {
    newSalario.valor = salario * 22.5 / 100 - 651.73;
    newSalario.ref = '22.5%'
  } else if (salario > 4664.68) {
    newSalario.valor = salario * 27.5 / 100 - 884.96;
    newSalario.ref = '27.5%'
  }

  return newSalario;
}