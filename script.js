// 1. LÓGICA DE NAVEGAÇÃO SPA
function navegar(idSecao) {
    // Tocar som de clique
    const clickSfx = document.getElementById('somClique');
    clickSfx.currentTime = 0;
    clickSfx.play();

    // Trocar Página (Seção)
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(idSecao).classList.add('active');

    // Atualizar Botão Ativo na Sidebar
    document.querySelectorAll('.file-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + idSecao).classList.add('active');

    // Atualizar Nome na Tab-Bar
    const tabNames = {
        home: 'welcome_pai.py',
        historia: 'historia.lore',
        lembrancas: 'lembrancas.log',
        bencaos: 'bencaos.ccb',
        carinho: 'carinho.py'
    };
    document.getElementById('tab-name').innerText = tabNames[idSecao];
}

// 2. MÚSICA DE FUNDO (Inicia no primeiro clique)
document.addEventListener('click', function iniciarMusica() {
    const bgm = document.getElementById('musicaFundo');
    bgm.volume = 0.3;
    bgm.play();
    document.removeEventListener('click', iniciarMusica);
}, { once: true });

// 3. TRILHA DO MOUSE (CANVAS)
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
animate();