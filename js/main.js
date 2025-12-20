// LOGICA DEL BOTON FLOTANTE DE MUSICA
const portada = document.getElementById('primera-p'); 
const btnIngresar = document.getElementById('boton-ingresar'); 
const contenidoPrincipal = document.getElementById('contenido-principal'); 
const contenedorMusica = document.getElementById('contenedor-musica-flotante'); 

// Audio
const audio = document.getElementById('musica');
const btnFloat = document.getElementById('boton-play-flotante');
const icono = btnFloat.querySelector('i');

// --- EVENTO: AL HACER CLIC EN "INGRESAR" ---
btnIngresar.addEventListener('click', () => {
    // 1. Reproducir música (Aprovechamos el clic)
    audio.play();

    // 2. Desvanecer tu portada
    portada.classList.add('desvanecer-portada');

    // 3. Mostrar el contenido principal y el botón de música
    // Esperamos un poquito (0.5s) para que sea suave
    setTimeout(() => {
        portada.style.display = 'none'; // La quitamos del todo
        contenidoPrincipal.style.display = 'block'; // Mostramos la invitación
        contenedorMusica.style.display = 'block'; // Mostramos el botón flotante
    }, 800);
    
    // 4. Activar animación del botón flotante
    btnFloat.classList.add('animacion-reproduccion');
});

// --- CONTROL DEL BOTÓN FLOTANTE ---
btnFloat.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        icono.classList.remove('fa-play');
        icono.classList.add('fa-pause');
        btnFloat.classList.add('animacion-reproduccion');
    } else {
        audio.pause();
        icono.classList.remove('fa-pause');
        icono.classList.add('fa-play');
        btnFloat.classList.remove('animacion-reproduccion');
    }
});