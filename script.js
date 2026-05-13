const lamp = document.getElementById('lampSwitch');
const btn = document.getElementById('btnPresente');
const surprise = document.getElementById('surpriseArea');
const card = document.getElementById('mainCard');
const message = document.getElementById('message');

// 1. Lógica da Lâmpada (Igual ao vídeo)
lamp.addEventListener('click', () => {
    lamp.classList.toggle('active');
    // Efeito sonoro básico de clique (opcional)
    const clickAudio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    clickAudio.volume = 0.5;
    clickAudio.play().catch(() => {}); // catch para evitar erro se o navegador bloquear
});

// 2. Lógica do Presente Especial
btn.addEventListener('click', () => {
    // Disparar Confetes
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8a2be2', '#ffffff', '#ffd700']
    });

    // Mostrar a surpresa
    btn.style.display = 'none';
    message.style.display = 'none';
    surprise.classList.remove('hidden');
    surprise.classList.add('visible');
    
    // Deixar o cartão "especial"
    card.style.borderColor = '#8a2be2';
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 0 40px rgba(138, 43, 226, 0.3)';
});