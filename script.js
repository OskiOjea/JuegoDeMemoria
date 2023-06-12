let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = timer;
let tiempoRegresivoId = null;

// Apuntando a los elementos HTML para mostrar las estadísticas
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let botonInicio = document.getElementById("inicio");

// Generación de los números aleatorios y asignación a las tarjetas
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

// Función para contar el tiempo transcurrido del jugador
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Se te acabó el tiempo",
        showConfirmButton: true,
      });
    }
  }, 1000);
}

// Función para bloquear las tarjetas
function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(`tarjeta${i}`);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  }
}

// Función para desbloquear las tarjetas
function desbloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaDesbloqueada = document.getElementById(`tarjeta${i}`);
    tarjetaDesbloqueada.innerHTML = "";
    tarjetaDesbloqueada.disabled = false;
  }
}

// Función principal que maneja el juego
function destapar(id) {
  if (!temporizador) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas === 1) {
    tarjeta1 = document.getElementById(`tarjeta${id}`);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    tarjeta2 = document.getElementById(`tarjeta${id}`);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;

    if (primerResultado === segundoResultado) {
      aciertos++;
      movimientos++;
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos === 8) {
        clearInterval(tiempoRegresivoId);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Has ganado!",
          showConfirmButton: true,
        }).then(() => {
          reiniciarJuego();
        });
      }
    } else {
      movimientos++;
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
      }, 500);
    }

    tarjetasDestapadas = 0;
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  clearInterval(tiempoRegresivoId);
  temporizador = false;
  timer = timerInicial;
  tarjetasDestapadas = 0;
  tarjeta1 = null;
  tarjeta2 = null;
  primerResultado = null;
  segundoResultado = null;
  movimientos = 0;
  aciertos = 0;
  mostrarMovimientos.innerHTML = "Movimientos: 0";
  mostrarAciertos.innerHTML = "Aciertos: 0";
  mostrarTiempo.innerHTML = `Tiempo: ${timerInicial} segundos`;
  desbloquearTarjetas();
}

// Función para iniciar el juego
function iniciarJuego() {
  reiniciarJuego();
}



