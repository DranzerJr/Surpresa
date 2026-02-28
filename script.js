function abrirCarta() {
            const envelope = document.getElementById('envelope-body');
            const overlay = document.getElementById('overlay-envelope');
            const content = document.getElementById('main-content');
            const instrucao = document.getElementById('instrucao');

            // 1. Inicia animação de abertura
            envelope.classList.add('aberto');
            instrucao.style.opacity = '0';
            
            // 2. Após a aba abrir, faz o overlay sumir
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.visibility = 'hidden';
                    content.style.opacity = '1';
                    // Inicia as pétalas
                    setInterval(createPetal, 500);
                }, 800);
            }, 800);
        }


const stackContainer = document.getElementById('photoStack');

// 1. Configuração inicial
function setupStack() {
    const photos = document.querySelectorAll('.photo');
    photos.forEach((photo, i) => {
        photo.style.zIndex = i + 1;
        const rot = (Math.random() * 12) - 6;
        photo.style.transform = `rotate(${rot}deg) translate(0,0)`;
    });
}
setupStack();

// 2. Lógica do Clique com Volta vindo de Cima
stackContainer.addEventListener('click', function(e) {
    const clickedPhoto = e.target;
    
    // Verifica se clicou na foto que está no topo
    if (clickedPhoto.classList.contains('photo') && clickedPhoto === stackContainer.lastElementChild) {
        
        clickedPhoto.style.pointerEvents = 'none';

        // --- FASE 1: SAÍDA (Sobe rápido e some no topo) ---
        clickedPhoto.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        clickedPhoto.style.transform = `translateY(-120vh) rotate(10deg) scale(0.6)`;
        clickedPhoto.style.opacity = '0';

        setTimeout(() => {
            // --- PREPARAÇÃO INVISÍVEL ---
            // Move a foto para o início da lista (fundo da pilha) no HTML
            stackContainer.prepend(clickedPhoto); 
            
            // Reajusta Z-index de todas (1 é o fundo, maior é o topo)
            const allPhotos = document.querySelectorAll('.photo');
            allPhotos.forEach((p, index) => { p.style.zIndex = index + 1; });

            // Posiciona a foto BEM ALTO fora da tela (preparando o mergulho)
            clickedPhoto.style.transition = "none"; 
            clickedPhoto.style.transform = `translateY(-150vh) rotate(0deg) scale(1.1)`;
            
            // Pequena pausa para o navegador processar a nova posição
            setTimeout(() => {
                // --- FASE 2: VOLTA (Desce de cima para o fundo da pilha) ---
                // Transição bem lenta e elegante (2 segundos)
                clickedPhoto.style.transition = "all 2.0s cubic-bezier(0.19, 1, 0.22, 1)"; 
                clickedPhoto.style.opacity = '1';
                
                const finalRot = (Math.random() * 12) - 6;
                // Volta para a posição original (0,0) encaixando por baixo
                clickedPhoto.style.transform = `translateY(0) rotate(${finalRot}deg) scale(1)`;

                // Libera o clique após a animação de volta terminar
                setTimeout(() => {
                    clickedPhoto.style.pointerEvents = 'auto';
                }, 2000);
            }, 100);

        }, 900); // Tempo da subida inicial
    }
});

// --- 3. PÉTALAS ---
function createPetal() {
    const container = document.getElementById('petals-container');
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 12 + 10;
    petal.style.width = size + 'px';
    petal.style.height = (size * 1.6) + 'px';
    petal.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 7 + 7;
    
    petal.animate([
        { top: '-20px', transform: 'rotate(0deg) translateX(0)' },
        { top: '110vh', transform: `rotate(${Math.random() * 540}deg) translateX(${Math.random() * 120 - 60}px)` }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });

    container.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
}

// --- Lógica da Assinatura com Efeito de Escrita ---

const faturafinalText = "ass. o último romântico.";
const speed = 100; // Velocidade da escrita (em milissegundos por letra)
let i = 0;
const signatureP = document.querySelector('#finalSignature p');
const signatureContainer = document.getElementById('finalSignature');

// Função que escreve o texto
function typeWriter() {
    if (i < faturafinalText.length) {
        signatureP.innerHTML += faturafinalText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // Quando termina de escrever, esconde o cursor
        signatureContainer.classList.add('escrita-concluida');
    }
}

// --- Sensor para iniciar a escrita no momento certo ---
const observerOptions = {
    root: null,
    threshold: 1.0 // Só começa quando 100% do elemento estiver visível
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && i === 0) { // Só escreve uma vez
            typeWriter();
            // Para de observar depois que começou a escrever
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(signatureContainer);