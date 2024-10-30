window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

    nav.style.backgroundColor = scrollPosition > screenHeight * 0.40 ? 'hwb(0 100% 0%)' : 'rgba(47, 54, 69, 0)';
});

const enlaces = document.querySelectorAll('.hyj');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;

    enlaces.forEach(enlace => {
        if (scrollPos > windowHeight * 0.35) {
            enlace.style.fontFamily = 'Roboto, serif';
            enlace.style.textShadow = '1px 1px white, 2px 3px black';
            enlace.style.color = '#2F3645';
        } else {
            enlace.style.color = '#FFFFFF';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let contador = 0;
    const ordenCorrecto = ["imagen2", "imagen1", "imagen3"];
    const ubicacionActual = [null, null, null];
    let tiempo = 0;
    let intervaloTiempo;
    const imagenes = document.querySelectorAll('#cajaimagenes img');
    const zonasDeSoltar = [
        document.getElementById('cajasoltar'),
        document.getElementById('cajasoltar2'),
        document.getElementById('cajasoltar3')
    ];
    const reinicioBtn = document.querySelector(".reinicio");
    const video = document.getElementById("miVideo");

    iniciar();

    function iniciar() {
        imagenes.forEach(imagen => {
            imagen.addEventListener('dragstart', arrastrado);
        });
        zonasDeSoltar.forEach((caja, index) => {
            caja.addEventListener('dragenter', e => e.preventDefault());
            caja.addEventListener('dragover', e => e.preventDefault());
            caja.addEventListener('drop', e => soltado(e, index));
        });
        reinicioBtn.addEventListener("click", reinicio);
        video.addEventListener("play", iniciarConteo);
    }

    function iniciarConteo() {
        tiempo = 0;
        clearInterval(intervaloTiempo);
        intervaloTiempo = setInterval(() => {
            tiempo++;
            console.log(`Tiempo transcurrido: ${tiempo} segundos`);
        }, 1000);
    }

    function arrastrado(e) {
        e.dataTransfer.setData('Text', e.target.id);
    }

    function soltado(e, index) {
        e.preventDefault();
        const id = e.dataTransfer.getData('Text');
        const imagen = document.getElementById(id);

        if (!imagen || ubicacionActual[index]) return;

        imagen.style.display = 'none';
        e.target.innerHTML = `<img src="${imagen.src}" height="400px" width="275px">`;
        ubicacionActual[index] = id;
        contador++;

        if (contador === 3) verificarOrden();
    }

    function verificarOrden() {
        const esCorrecto = ubicacionActual.every((id, index) => id === ordenCorrecto[index]);
        setTimeout(() => alert(esCorrecto 
            ? `¡Felicidades, has completado el rompecabezas en el orden correcto! Tiempo: ${tiempo} segundos` 
            : "El orden de las piezas no es correcto. Inténtalo de nuevo."), 500);
    }

    function reinicio() {
        contador = 0;
        ubicacionActual.fill(null);
        zonasDeSoltar.forEach(caja => caja.innerHTML = '<p>Arrastre y suelte la imagen aquí</p>');
        imagenes.forEach(imagen => imagen.style.display = 'block');
        tiempo = 0;
        clearInterval(intervaloTiempo);
    }
});
