document.addEventListener('DOMContentLoaded', function() {
    const pile = document.querySelector('.photo-pile');
    const images = pile.querySelectorAll('img');
    let currentIndex = images.length - 1; // Começa com a foto de cima

    function rotatePile() {
        const topImage = images[currentIndex];

        // Animação para a foto que está saindo (fade out e move)
        topImage.style.opacity = '0';
        topImage.style.transform = 'scale(0.8) translate(-100px, -100px) rotate(-15deg)';

        // Após a animação, move a imagem para o final da pilha
        setTimeout(() => {
            topImage.style.zIndex = '1'; // Z-index baixo para ir para trás
            pile.prepend(topImage); // Move para o início do container (atrás de todas)
            topImage.style.opacity = '1'; // Restaura a opacidade

            // Reaplica o efeito de "pilha bagunçada" para a nova posição
            // Isso é um pouco complexo de automatizar perfeitamente com JS puro para uma pilha,
            // então, para simplificar, vamos apenas resetar a transformação.
            topImage.style.transform = 'none';

            // Atualiza o índice da imagem do topo
            currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        }, 500); // Tempo da animação (deve bater com o CSS transition)
    }

    // Gira a pilha automaticamente a cada 4 segundos
    setInterval(rotatePile, 4000);

    // Permite girar a pilha ao clicar em uma foto
    pile.addEventListener('click', rotatePile);
});