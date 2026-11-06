// 1. Selección de elementos del DOM
const container = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

// 2. Variables de Estado
let playerX = 180;
let playerSpeed = 15;
let score = 0;
let record = 0;
let gameOver = false;
let gameInterval;
let bugSpawnInterval;
let bugType;

// 3. Controles del Teclado
document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  if ((e.key === 'ArrowLeft' || e.key === 'a') && playerX > 0) {
    playerX -= playerSpeed;
  }
  if ((e.key === 'ArrowRight' || e.key === 'd') && playerX < container.clientWidth - 40) {
    playerX += playerSpeed;
  }

  player.style.left = `${playerX}px`;
});

// 4. Función utilitaria para detectar colisión entre 2 elementos del DOM
function checkCollision(elem1, elem2) {
  const r1 = elem1.getBoundingClientRect();
  const r2 = elem2.getBoundingClientRect();

  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

function createBug() {
  let bug = document.getElementById("bug");
  let topDistance = 0;
  let bugOptions = ["php", "js"];

  bugType = bugOptions[Math.floor(Math.random() * bugOptions.length)];

  let velocity = (Math.sqrt(score / 100)) + Math.floor(Math.random() * 3) + 2;
  console.log(velocity);

  playerSpeed = 15;
  playerSpeed += velocity * 4;

  bug.style.top = 0;
  bug.style.left = Math.floor(Math.random() * 100) + "%";
  bug.style.display = "relative;"


  if (bugType == "php") {
    bug.style.backgroundImage = "url(./img/php-logo.svg)"
  }
  else {
    bug.style.backgroundImage = "url(./img/js02-svgrepo-com.svg)"
  }



  let interval = setInterval(() => {

    topDistance += velocity;
    bug.style.top = topDistance + "px";

    if (bugType != "php") {

      if (topDistance >= 500) {

        score = 0;
        clearInterval(interval);
        gameOverScreen.className = "overlay";

      } else if (checkCollision(bug, document.getElementById("player"))) {

        score += 100;

        if (score > record)
          record = score;

        clearInterval(interval);
        createBug();
      }
      scoreEl.textContent = score;
      highScoreEl.textContent = record;
    } else {

      if (topDistance >= 500) {

        score += 100;

        if (score > record)
          record = score;

        clearInterval(interval);
        createBug();

      } else if (checkCollision(bug, document.getElementById("player"))) {
        score = 0;
        clearInterval(interval);
        gameOverScreen.className = "overlay";
        console.log(gameOverScreen.style.class);

      }
      scoreEl.textContent = score;
      highScoreEl.textContent = record;
    }


  }, 16);

}



gameOverScreen.addEventListener("click", (e) => {
  if (e.target.id == "restart-btn") {
    gameOverScreen.className = "overlay hidden";
    createBug();
  }
})

createBug();
// 5. TODO por los alumnos:
// - Función para crear bugs periódicamente (`document.createElement`)
// - Mover los bugs hacia abajo en un intervalo/frame
// - Comprobar colisión con `checkCollision(player, bug)`
// - Actualizar puntuación y gestionar Game Over