function abrirCarta() {
    const envelope = document.getElementById('envelope-body');
    const overlay = document.getElementById('overlay-envelope');
    const content = document.getElementById('main-content');
    const instrucao = document.getElementById('instrucao');

    envelope.classList.add('aberto');
    if (instrucao) instrucao.style.opacity = '0';
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            
            // Força a exibição e centralização dos itens
            content.style.display = 'flex';
            
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
            
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
        const rot = (Math.random() * 10) - 5; 
        // O translate(-50%, -50%) mantém a foto grudada no meio
        photo.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
    });
}
setupStack();

// 2. Lógica de Mergulho das Fotos (100% Centralizada)
stackContainer.addEventListener('click', function(e) {
    const clickedPhoto = e.target.closest('.photo');
    
    if (clickedPhoto && clickedPhoto === stackContainer.lastElementChild) {
        clickedPhoto.style.pointerEvents = 'none';

        // FASE 1: Sobe mantendo o eixo X no meio (-50%)
        clickedPhoto.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        clickedPhoto.style.transform = `translate(-50%, -130%) rotate(0deg) scale(0.85)`;
        clickedPhoto.style.opacity = '0';

        setTimeout(() => {
            // Joga pro fundo da lista
            stackContainer.prepend(clickedPhoto); 
            
            const allPhotos = document.querySelectorAll('.photo');
            allPhotos.forEach((p, index) => { p.style.zIndex = index + 1; });

            // Posiciona lá em cima (invisível), mantendo o centro
            clickedPhoto.style.transition = "none"; 
            clickedPhoto.style.transform = `translate(-50%, -100vh) rotate(0deg) scale(1)`;
            
            setTimeout(() => {
                // FASE 2: Mergulha devolta pro centro exato
                clickedPhoto.style.transition = "all 1.2s cubic-bezier(0.19, 1, 0.22, 1)"; 
                clickedPhoto.style.opacity = '1';
                
                const finalRot = (Math.random() * 10) - 5;
                clickedPhoto.style.transform = `translate(-50%, -50%) rotate(${finalRot}deg) scale(1)`;

                setTimeout(() => {
                    clickedPhoto.style.pointerEvents = 'auto';
                }, 1200);
            }, 50);
        }, 650); 
    }
});

// 3. Pétalas caindo
function createPetal() {
    const container = document.getElementById('petals-container');
    if(!container) return;
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

// 4. Assinatura Automática
const faturafinalText = "ass. o último romântico.";
const speed = 100;
let charIdx = 0;

function typeWriter() {
    const signatureP = document.querySelector('#finalSignature p');
    if (charIdx < faturafinalText.length) {
        signatureP.innerHTML += faturafinalText.charAt(charIdx);
        charIdx++;
        setTimeout(typeWriter, speed);
    } else {
        document.getElementById('finalSignature').classList.add('escrita-concluida');
    }
}

// O sensor dispara quando a assinatura chega em 50% da tela do celular
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && charIdx === 0) {
            typeWriter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); 

const target = document.getElementById('finalSignature');
if(target) observer.observe(target);