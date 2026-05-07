// --- SISTEMA DE NAVEGAÇÃO SPA ---
function navegar(idSecao) {
    // 1. Tocar som de clique
    const clickSfx = document.getElementById('somClique');
    if (clickSfx) {
        clickSfx.currentTime = 0; // Reinicia o som
        clickSfx.play().catch(() => console.log("Aguardando interação para som de clique."));
    }

    // 2. Trocar Página (Seção)
    // Esconde todas
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    // Mostra a escolhida
    const alvo = document.getElementById(idSecao);
    if (alvo) alvo.classList.add('active');

    // 3. Atualizar Botão Ativo na Sidebar
    document.querySelectorAll('.file-btn').forEach(btn => btn.classList.remove('active'));
    const btnAtivo = document.getElementById('btn-' + idSecao);
    if (btnAtivo) btnAtivo.classList.add('active');

    // 4. Atualizar Nome na Tab-Bar (Welcome_pai.py, etc.)
    // (Adicione a lógica para trocar o nome da tab aqui se desejar)
}

// --- SISTEMA DE ÁUDIO DE FUNDO (Inicia no primeiro clique) ---
document.addEventListener('click', function iniciarMusica() {
    const bgm = document.getElementById('musicaFundo');
    if (bgm) {
        bgm.volume = 0.3;
        bgm.play().catch(() => console.log("Erro ao iniciar música de fundo. Verifique o arquivo."));
        // Remove o evento para não tentar tocar toda vez que clicar
        document.removeEventListener('click', iniciarMusica);
    }
}, { once: true }); // Executa apenas uma vez

// --- CÓDIGO DO CANVAS (TRILHA DO MOUSE - INALTERADO) ---
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#deb887';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.05;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) particles.push(new Particle(e.x, e.y));
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

// Iniciar animação
animate();