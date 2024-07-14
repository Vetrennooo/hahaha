const gameArea = document.getElementById('gameArea');
const tank = document.getElementById('tank');
let tankX = 280;
let tankY = 280;
let tankAngle = 0;

function updateTankPosition() {
    tank.style.left = `${tankX}px`;
    tank.style.top = `${tankY}px`;
    tank.style.transform = `rotate(${tankAngle}deg)`;
}

function handleKeydown(event) {
    switch(event.key) {
        case 'ArrowUp':
            tankX += 5 * Math.cos(tankAngle * Math.PI / 180);
            tankY += 5 * Math.sin(tankAngle * Math.PI / 180);
            break;
        case 'ArrowDown':
            tankX -= 5 * Math.cos(tankAngle * Math.PI / 180);
            tankY -= 5 * Math.sin(tankAngle * Math.PI / 180);
            break;
        case 'ArrowLeft':
            tankAngle -= 5;
            break;
        case 'ArrowRight':
            tankAngle += 5;
            break;
        case ' ':
            shoot();
            break;
    }
    updateTankPosition();
}

function shoot() {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = `${tankX + 15 * Math.cos(tankAngle * Math.PI / 180) + 15}px`;
    bullet.style.top = `${tankY + 15 * Math.sin(tankAngle * Math.PI / 180) + 15}px`;
    gameArea.appendChild(bullet);

    let bulletInterval = setInterval(() => {
        let bulletX = parseFloat(bullet.style.left);
        let bulletY = parseFloat(bullet.style.top);
        bulletX += 5 * Math.cos(tankAngle * Math.PI / 180);
        bulletY += 5 * Math.sin(tankAngle * Math.PI / 180);
        bullet.style.left = `${bulletX}px`;
        bullet.style.top = `${bulletY}px`;

        // Remove bullet if it goes out of game area
        if (bulletX < 0 || bulletX > 600 || bulletY < 0 || bulletY > 600) {
            bullet.remove();
            clearInterval(bulletInterval);
        }
    }, 30);
}

document.addEventListener('keydown', handleKeydown);
updateTankPosition();