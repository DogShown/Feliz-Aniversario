const lamp = document.getElementById('lampSwitch');
const body = document.body;
const btnPresente = document.getElementById('btnPresente');
const surpriseArea = document.getElementById('surpriseArea');
const message = document.getElementById('message');
const hint = document.getElementById('hint');

// 1. Lógica para Ligar/Desligar e Revelar o Espaço
lamp.addEventListener('click', () => {
    lamp.classList.toggle('active');
    body.classList.toggle('space-active');
    
    if (lamp.classList.contains('active')) {
        hint.innerText = "O universo brilha para você!";
        hint.style.color = "#d896ff";
    } else {
        hint.innerText = "Toque para iluminar o universo";
        hint.style.color = "#444";
        // Resetar surpresa se apagar a luz (opcional)
        surpriseArea.classList.add('hidden');
        btnPresente.style.display = 'block';
        message.style.display = 'block';
    }
});

// 2. Lógica do Botão de Presente
btnPresente.addEventListener('click', () => {
    // Efeito de Confetes
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8a2be2', '#ffffff', '#ffd700']
    });

    // Troca de conteúdo no cartão
    btnPresente.style.display = 'none';
    message.style.display = 'none';
    surpriseArea.classList.remove('hidden');
    surpriseArea.classList.add('visible');
});