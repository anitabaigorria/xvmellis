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

// LOGICA DE LA CUENTA REGRESIVA 

// Año, Mes (0-11), Día, Hora, Minutos, Segundos
const fechaEvento = new Date(2026, 2, 20, 0, 1, 0).getTime(); 

// 2. Referencias al DOM
const elDias = document.getElementById('dias');
const elHoras = document.getElementById('horas');
const elMinutos = document.getElementById('minutos');
const elSegundos = document.getElementById('segundos');
const contenedorLiDias = document.getElementById('li-dias'); 
const mensajeContador = document.getElementById('mensaje-contador'); 

const actualizarContador = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    // Cálculos matemáticos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // --- CASO 1: YA PASÓ EL EVENTO ---
    if (distancia < 0) {
        clearInterval(actualizarContador); // Detenemos el intervalo
        
        // Dejamos todo en cero fijo
        elDias.innerText = "00";
        elHoras.innerText = "00";
        elMinutos.innerText = "00";
        elSegundos.innerText = "00";
        
        // Si quieres que el mensaje de "Es hoy" desaparezca cuando termine:
        mensajeContador.classList.remove('visible');

        return; 
    }

    // --- CASO 2: ES HOY (Menos de 1 día) ---
    if (dias === 0) {
        // Ocultamos el contador de días
        contenedorLiDias.style.display = 'none';
        
        // Inyectamos HTML: Solo el SPAN tiene la clase de animación
        mensajeContador.innerHTML = '<span class="texto-latido">¡ES HOY!</span> Faltan solo:';
        mensajeContador.classList.add('visible');
    } else {
        // --- CASO 3: NORMAL ---
        contenedorLiDias.style.display = 'flex'; 
        mensajeContador.classList.remove('visible');
    }

    // Actualizamos los números mientras no sea menor a 0
    elDias.innerText = dias < 10 ? '0' + dias : dias;
    elHoras.innerText = horas < 10 ? '0' + horas : horas;
    elMinutos.innerText = minutos < 10 ? '0' + minutos : minutos;
    elSegundos.innerText = segundos < 10 ? '0' + segundos : segundos;

}, 1000);


// --- LÓGICA DEL CARRUSEL ---

const trackAuto = document.getElementById('track-fotos-auto');
const btnIzquierdaAuto = document.querySelector('.flecha-izq');
const btnDerechaAuto = document.querySelector('.flecha-der');

// Configuración
const autoPlaySpeed = 3000; // 3 segundos por foto
let autoPlayInterval;

// Función de movimiento (Siempre hacia adelante)
function moverCarruselAdelante() {
    const anchoSlide = trackAuto.clientWidth; // Ancho visible
    const posicionActual = trackAuto.scrollLeft;
    const anchoTotal = trackAuto.scrollWidth;

    // Si estamos en la última foto (o cerca del final)
    if (posicionActual + anchoSlide >= anchoTotal - 10) {
        // EFECTO CILINDRO: Volver al principio
        trackAuto.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        // Avanzar una foto normal
        trackAuto.scrollBy({ left: anchoSlide, behavior: 'smooth' });
    }
}

// Iniciar Auto-Play
function startAutoPlay() {
    stopAutoPlay(); // Limpiamos por seguridad
    autoPlayInterval = setInterval(moverCarruselAdelante, autoPlaySpeed);
}

// Detener Auto-Play
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// --- EVENTOS ---

// Iniciar al cargar
startAutoPlay();

// Pausar si el usuario toca (para ver la foto tranquilo)
trackAuto.addEventListener('touchstart', stopAutoPlay, { passive: true });
trackAuto.addEventListener('mouseenter', stopAutoPlay);

// Reanudar al soltar
trackAuto.addEventListener('touchend', startAutoPlay);
trackAuto.addEventListener('mouseleave', startAutoPlay);


// --- FLECHAS PC ---
btnDerechaAuto.addEventListener('click', () => {
    stopAutoPlay();
    moverCarruselAdelante(); // Usamos la misma lógica
    setTimeout(startAutoPlay, 5000); // Reanudar después de 5s
});

btnIzquierdaAuto.addEventListener('click', () => {
    stopAutoPlay();
    // Para atrás es simple
    trackAuto.scrollBy({ left: -trackAuto.clientWidth, behavior: 'smooth' });
    setTimeout(startAutoPlay, 5000);
});