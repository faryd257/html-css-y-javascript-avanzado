window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const enlaces = document.querySelectorAll('.hyj');
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

   
    nav.style.backgroundColor = scrollPosition > screenHeight * 0.50 ? 'hwb(0 100% 0%)' : 'rgba(47, 54, 69, 0)';

    enlaces.forEach(enlace => {
        enlace.style.color = scrollPosition > screenHeight * 0.45 ? '#000000' : '#FFFFFF';
        enlace.style.boxShadow = scrollPosition > screenHeight * 0.45 ? '0 4px 8px rgba(128, 128, 128, 0.2)' : 'none';
    });
});
