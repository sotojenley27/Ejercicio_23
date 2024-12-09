// Lista de palabras
const words = ["javascript", "ahorcado", "programar", "frontend"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let attempts = 6;
let guessedWord = "_".repeat(selectedWord.length).split('');
let usedLetters = new Set();
let gameOver = false; // Bandera para controlar el estado del juego

// Referencias del DOM
const wordState = document.getElementById("wordState");
const attemptsDisplay = document.getElementById("attempts");
const usedLettersDisplay = document.getElementById("usedLetters");
const winModal = document.getElementById("winModal");
const loseModal = document.getElementById("loseModal");

// Inicializar el estado
function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  attempts = 6;
  guessedWord = "_".repeat(selectedWord.length).split('');
  usedLetters.clear();
  gameOver = false;

  // Actualizar DOM
  wordState.textContent = guessedWord.join('');
  attemptsDisplay.textContent = attempts;
  usedLettersDisplay.textContent = "Ninguna";
}

// Reiniciar el juego
function restartGame() {
  winModal.style.display = "none";
  loseModal.style.display = "none";
  initializeGame();
}

// Mostrar modales de ganar o perder
function showWinModal() {
  winModal.style.display = "flex";
  gameOver = true;
}

function showLoseModal() {
  loseModal.style.display = "flex";
  gameOver = true;
}

// Inicializar el juego por primera vez
initializeGame();

// Evento de teclado
document.addEventListener('keydown', (event) => {
  if (gameOver) return; // No permitir más entradas si el juego terminó

  const letter = event.key.toLowerCase();

  // Validar entrada
  if (!/^[a-z]$/.test(letter) || usedLetters.has(letter)) return;

  usedLetters.add(letter);
  usedLettersDisplay.textContent = Array.from(usedLetters).join(', ');

  // Verificar si la letra está en la palabra
  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        guessedWord[i] = letter;
      }
    }
    wordState.textContent = guessedWord.join('');
  } else {
    attempts--;
    attemptsDisplay.textContent = attempts;
  }

  // Verificar si el jugador ganó
  if (guessedWord.join('') === selectedWord) {
    showWinModal();
    return;
  }

  // Verificar si el jugador perdió
  if (attempts === 0) {
    showLoseModal();
    return;
  }
});

// Reiniciar al hacer clic en el modal
winModal.addEventListener('click', restartGame);
loseModal.addEventListener('click', restartGame);
