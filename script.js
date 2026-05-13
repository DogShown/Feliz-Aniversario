const lamp = document.getElementById('lampSwitch');
const btn = document.getElementById('btnPresente');
const surprise = document.getElementById('surpriseArea');
const message = document.getElementById('message');
const hint = document.getElementById('hint');

// Lógica de ligar/desligar
lamp.addEventListener('click', () => {
    lamp.classList.toggle('active');
    
    if (lamp.classList.contains('active')) {
        hint.innerText = "A luz se fez!";
        hint.style.color = "#8a2be2";
    } else {
        hint.innerText = "Acenda a luz para ver a surpresa";
        hint.style.color = "#555";
        // Opcional: fechar a surpresa se apagar a luz
        surprise.classList.add('hidden');
        btn.style.display = 'block';
        message.style.display = 'block';
    }
});

// Lógica do Presente
btn.addEventListener('click', () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8a2be2', '#ffffff']
    });

    btn.style.display = 'none';
    message.style.display = 'none';
    surprise.classList.remove('hidden');
    surprise.classList.add('visible');
});