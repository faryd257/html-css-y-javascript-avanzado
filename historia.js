const video = document.querySelector('video');
const playBoton = document.getElementById("play");
const pauseBoton = document.getElementById("pause");
const showTime = document.getElementById('showTime');
const enlaces = document.querySelectorAll('.hyj');
let timeProgression;


setTimeout(() => {
    showTime.innerHTML = `Duración del video: 04:41`;
}, 100);


playBoton.addEventListener('click', () => {
    video.play();
    timeProgression = setInterval(() => {
        showTime.innerHTML = `${transformarTiempoActual(video.currentTime)}`;
    }, 1000);
});


pauseBoton.addEventListener('click', () => {
    video.pause();
    clearInterval(timeProgression);
});


window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

    nav.style.backgroundColor = scrollPosition > screenHeight * 0.40 ? 'hwb(0 100% 0%)' : 'rgba(47, 54, 69, 0)';

    enlaces.forEach(enlace => {
        if (scrollPosition > screenHeight * 0.45) {
            enlace.style.fontFamily = 'Roboto, serif';
            enlace.style.textShadow = '1px 1px white, 2px 3px black';
            enlace.style.color = '#2F3645';
        } else {
            enlace.style.color = '#FFFFFF';
        }
    });
});


function transformarTiempoActual(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60).toString().padStart(2, '0');
    return `${minutos}:${segundosRestantes}`;
}

function desptemaDia() {
    document.body.className = "body-day";
}

function temaNoche() {
    document.body.className = "body-night";
}
