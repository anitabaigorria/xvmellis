// --- LÓGICA DEL REPRODUCTOR DE MÚSICA ---

const audio = document.getElementById('musica');
const botonPlay = document.getElementById('boton-play');
const icon = botonPlay.querySelector('i');

// 1. CONTROL DEL CLIC (Solo le dice al audio qué hacer)
botonPlay.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// 2. SINCRONIZACIÓN VISUAL (Escucha al audio y actualiza el botón)
// Esto funciona si usas Autoplay, si das clic, o si se detiene sola.

// Cuando el audio empieza a sonar (Event: 'play')
audio.addEventListener('play', () => {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    botonPlay.classList.add('animacion-reproduccion');
});

// Cuando el audio se detiene (Event: 'pause')
audio.addEventListener('pause', () => {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    botonPlay.classList.remove('animacion-reproduccion');
});

// 3. INTENTO DE AUTOPLAY (Opcional pero recomendado)
// Muchos navegadores bloquean el autoplay HTML. Esto intenta forzarlo y gestiona el error.
document.addEventListener("DOMContentLoaded", () => {
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Si entras aquí, es porque el navegador bloqueó el autoplay (muy común).
            // No hacemos nada, dejamos el botón de Play listo para que el usuario toque.
            console.log("Autoplay bloqueado. Esperando interacción del usuario.");
        });
    }
});