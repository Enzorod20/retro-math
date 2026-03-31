let numerosMostrados = 0;
let intervalo;
let sumaTotal = 0;

const botonIniciar = document.getElementById('configuracion');
botonIniciar.addEventListener('click', iniciarJuego);

function iniciarJuego(){
    const tiempo = document.getElementById('TiempoIntervalo').value;
    const tiempoEnMilisegundos = tiempo * 1000; 

    document.getElementById('configurarPanel').style.display = 'none';
    document.getElementById('panelJuego').style.display = 'flex';

    intervalo = setInterval(mostrarSiguienteNumero, tiempoEnMilisegundos);
}

function mostrarSiguienteNumero(){
    const cantidad = document.getElementById('cantidad').value;
    const permiteNegativos = document.getElementById('negativos').checked;

    if(numerosMostrados == cantidad){
        clearInterval(intervalo);
        document.getElementById('numeroDisplay').innerText = "¿Cuánto es?";
        document.getElementById('zonaRespuesta').style.display = 'block';
        document.getElementById('cantidadNumeros').style.display = 'none';
        iniciarContador();
        return;
    }
   
    let numeroAleatorio;
    if(permiteNegativos == false){
        numeroAleatorio = Math.floor(Math.random()*10)+1;
    } else {
        numeroAleatorio = Math.floor(Math.random()*21)-10;
    }

    sumaTotal = sumaTotal + numeroAleatorio;

    const pantallaNumero = document.getElementById('numeroDisplay');
    pantallaNumero.innerText = numeroAleatorio;

    // --- MAGIA DEL LATIDO ---
    // Quitamos la clase y la volvemos a poner para reiniciar la animación
    pantallaNumero.classList.remove('animar-numero');
    void pantallaNumero.offsetWidth; // Truco de JS para forzar al navegador a reiniciar la animación
    pantallaNumero.classList.add('animar-numero');

    numerosMostrados++;
    const pantallaCant = document.getElementById('cantidadNumeros');
    pantallaCant.innerText = 'Números mostrados: ' + numerosMostrados;
}

const botonRespuesta = document.getElementById('respuesta');
let tiempoLimite = 8;
let cronometro;


function iniciarContador(){
    const mostrarTiempo = document.getElementById('mostrarTiempo');
    cronometro = setInterval(()=>{
        tiempoLimite--;
        mostrarTiempo.innerText = tiempoLimite;
        if (tiempoLimite<=0) {
            clearInterval(cronometro);
            botonRespuesta.disabled = true;
            verificarResultado();
        }
    }, 1000);
}

botonRespuesta.addEventListener('click', ()=>{
    clearInterval(cronometro);
     verificarResultado();
    });

    
function verificarResultado(){
    clearInterval(cronometro);
    const respuestaUsuario = parseInt(document.getElementById('resultado').value);
    const panelJuego = document.getElementById('panelJuego');

    let mensajeFinal = document.getElementById('mensajeFinal');
    if (!mensajeFinal) {
        mensajeFinal = document.createElement('div');
        mensajeFinal.id = 'mensajeFinal';
        panelJuego.appendChild(mensajeFinal);
    }

    if (respuestaUsuario === sumaTotal){
        if (sumaTotal === 777) {
            mensajeFinal.className = 'jackpot';
            mensajeFinal.innerText = '¡JACKPOT!\nERES UNA LEYENDA 🎰 (777)';
        } else if (sumaTotal === 42) {
            mensajeFinal.className = 'easter-egg';
            mensajeFinal.innerText = '¡EL SENTIDO DE LA VIDA!\nACERTASTE 🌌 (42)';
        } else if (sumaTotal === 10){
            mensajeFinal.className = 'messi-10';
            mensajeFinal.innerText = 'Coronado de glora como Messi 🐐(10)'
        } else if (sumaTotal === 3){
            mensajeFinal.className = 'campeones-3';
            mensajeFinal.innerText = 'CAMPEONES DEL MUNDO ⭐⭐⭐(3)'
        } else if (sumaTotal === 93){
            mensajeFinal.className = 'suga-93';
            mensajeFinal.innerText = 'D-BOY 😼🇰🇷(93)'
        }
        else {
            mensajeFinal.className = 'win';
            mensajeFinal.innerText = '¡ACERTASTE!\nYOU WIN 🏆';
        }
    } else {
        mensajeFinal.className = 'game-over';
        mensajeFinal.innerText = 'GAME OVER 👾\nEl resultado era: ' + sumaTotal;
    }

    document.getElementById('zonaRespuesta').style.display = 'none';
    document.getElementById('numeroDisplay').innerText = "FIN";
    iniciarContador();

  
    setTimeout(function() {
        location.reload();
    }, 3000);
}