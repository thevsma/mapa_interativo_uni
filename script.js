const mapContainer = document.querySelector('.map-container');
const mapBackground = document.querySelector('.map');

let scale = 1; // Fator de zoom inicial
let isDragging = false; // Controle de arraste
let startX, startY; // Coordenadas iniciais do mouse para o arraste
let offsetX = 0, offsetY = 0; // Deslocamento do mapa

// Função para aplicar o zoom
function applyZoom(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
        scale += 0.1; // Zoom in
    } else {
        scale -= 0.1; // Zoom out
    }

    // Limita o zoom para não ficar muito grande ou pequeno
    scale = Math.min(Math.max(0.5, scale), 3);

    // Aplica o zoom ao mapa
    mapBackground.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
}

// Função para começar o movimento do mapa (drag)
function startDrag(event) {
    event.preventDefault();
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    mapContainer.style.cursor = 'grabbing'; // Mudança de cursor durante o arraste
}

// Função para mover o mapa
function dragMap(event) {
    if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        offsetX += dx;
        offsetY += dy;

        // Aplica o deslocamento do mapa
        mapBackground.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;

        startX = event.clientX;
        startY = event.clientY;
    }
}

// Função para parar o movimento do mapa
function stopDrag() {
    isDragging = false;
    mapContainer.style.cursor = 'grab'; // Retorna ao cursor original
}

// Adiciona o evento de rolagem (zoom)
mapContainer.addEventListener('wheel', applyZoom);

// Adiciona os eventos para arrastar o mapa
mapContainer.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', dragMap);
window.addEventListener('mouseup', stopDrag);
