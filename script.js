// --- SISTEMA DE NAVEGAÇÃO SPA (Beyond Time) ---
function navegar(idSecao) {
    // 1. Tocar som de clique (com proteção)
    const clickSfx = document.getElementById('somClique');
    if (clickSfx) {
        clickSfx.currentTime = 0; // Reinicia o som
        clickSfx.play().catch(() => {});
    }

    // 2. Trocar Página (Seção)
    // Esconde todas
    document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
    // Mostra a escolhida
    const alvo = document.getElementById(idSecao);
    if (alvo) alvo.classList.add('active');

    // 3. Atualizar Botão Ativo no Menu
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const btnAtivo = document.getElementById('btn-' + idSecao);
    if (btnAtivo) btnAtivo.classList.add('active');
}

// --- SISTEMA DE ÁUDIO DE FUNDO (Inicia no primeiro clique) ---
document.addEventListener('click', function iniciarMusica() {
    const bgm = document.getElementById('musicaFundo');
    if (bgm && bgm.paused) {
        bgm.volume = 0.3;
        bgm.play().catch(() => console.log("Erro ao iniciar música. Verifique o ficheiro."));
        // Remove o evento para não tentar tocar toda vez que clicar
        document.removeEventListener('click', iniciarMusica);
    }
}, { once: true }); // Executa apenas uma vez

// --- CÓDIGO DO CANVAS (TRILHA DO MOUSE - ESTILO BRILHANTE) ---
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = '#fefae0';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.05) this.size -= 0.02;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) particles.push(new Particle(e.x, e.y));
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

// Iniciar animação
animate();