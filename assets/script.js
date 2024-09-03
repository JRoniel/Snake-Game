$(function() {
    let direction = 'right';
    let isPaused = false;
    let moveInterval;

    // Captura as setas do teclado e define a direção
    $(document).on('keydown', function(e) {
        const keyMap = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            32: 'pause' // Espaço para pausar
        };

        if (keyMap[e.which]) {
            if (keyMap[e.which] === 'pause') {
                isPaused = !isPaused;
                $('.pause-alert').toggleClass('hidden', !isPaused);
                if (isPaused) {
                    clearInterval(moveInterval);
                } else {
                    moveInterval = setInterval(moveSnake, 150);
                }
            } else if (!isPaused) {
                direction = keyMap[e.which];
            }
        }
    });

    function moveSnake() {
        if (isPaused) return;

        const head = $('.snake').first();
        const position = head.position();

        let newLeft = position.left;
        let newTop = position.top;

        switch(direction) {
            case 'left':
                newLeft -= 20;
                break;
            case 'right':
                newLeft += 20;
                break;
            case 'up':
                newTop -= 20;
                break;
            case 'down':
                newTop += 20;
                break;
        }

        // Ajuste da lógica de "wrap-around"
        if (newLeft < 0) newLeft = 380; // Saiu pela esquerda, reaparece na direita
        if (newLeft > 380) newLeft = 0; // Saiu pela direita, reaparece na esquerda
        if (newTop < 0) newTop = 380;   // Saiu por cima, reaparece embaixo
        if (newTop > 380) newTop = 0;   // Saiu por baixo, reaparece em cima

        head.css({ left: newLeft, top: newTop });

        // Atualiza a posição dos segmentos do corpo da cobrinha
        $('.snake').each(function(index) {
            if (index > 0) {
                const prevSegment = $(this).prev();
                $(this).css({
                    left: prevSegment.position().left,
                    top: prevSegment.position().top
                });
            }
        });
    }

    // Inicia o movimento da cobrinha
    moveInterval = setInterval(moveSnake, 150);
});