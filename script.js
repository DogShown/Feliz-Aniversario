// --- CONFIGURAÇÃO DO CANVAS (TRILHA DO MOUSE) ---
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = '#deb887'; // Cor Cozy/Zelda
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Evento de rastro do mouse
window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.x, e.y));
    }
});

// Função de animação (Loop constante)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

// --- SISTEMA DE ÁUDIO (FORA DO LOOP DE ANIMAÇÃO) ---

// 1. Música de Fundo (Inicia com o primeiro clique no site)
const musica = document.getElementById('musicaFundo');

function iniciarMusica() {
    if (musica) {
        musica.volume = 0.4;
        musica.play().catch(e => console.log("Aguardando interação para áudio."));
        // Remove o evento para não tentar tocar toda vez que clicar
        document.removeEventListener('click', iniciarMusica);
    }
}
document.addEventListener('click', iniciarMusica);

// 2. Som de Clique nos Botões
// Certifique-se de ter <audio id="somClique" src="..."></audio> no HTML
const audioClique = document.getElementById('somClique');

function tocarSomBotao() {
    if (audioClique) {
        audioClique.currentTime = 0;
        audioClique.play();
    }
}

// Aplica o som a todos os botões existentes e futuros
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('a')) {
        tocarSomBotao();
    }
});

// Iniciar animação
animate();