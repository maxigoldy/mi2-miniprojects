document.addEventListener("DOMContentLoaded", () => {
  const bitCount = 8;
  const rotateIntervalMs = 1000;
  let bits = [];
  let interval;
  const bitRow = document.getElementById("bitRow");
  const message = document.getElementById("message");
  const invertButton = document.getElementById("invertButton");

  function initGame() {
    bits = Array(bitCount).fill(0);
    let active = 0;
    while (active < 2) {
      const index = Math.floor(Math.random() * bitCount);
      if (bits[index] === 0) {
        bits[index] = 1;
        active++;
      }
    }

    updateView();
    message.textContent = "";

    clearInterval(interval);
    interval = setInterval(() => {
      rotateBits();
      updateView();
      checkGameState();
    }, rotateIntervalMs);
  }

  function rotateBits() {
    const first = bits.shift();
    bits.push(first);
  }

  function updateView() {
    bitRow.innerHTML = "";
    bits.forEach(bit => {
      const bitDiv = document.createElement("div");
      bitDiv.classList.add("bit");
      if (bit === 1) bitDiv.classList.add("on");
      bitRow.appendChild(bitDiv);
    });
  }

  function invertRightBit() {
    const lastIndex = bits.length - 1;
    bits[lastIndex] = bits[lastIndex] === 1 ? 0 : 1;
    updateView();
    checkGameState();
  }

  function checkGameState() {
    const sum = bits.reduce((a, b) => a + b, 0);
    if (sum === 0) {
      message.textContent = "🎉 Gewonnen! Alle Bits sind aus.";
      clearInterval(interval);
      setTimeout(initGame, 2000);
    } else if (sum === bits.length) {
      message.textContent = "💥 Game Over! Alle Bits sind an.";
      clearInterval(interval);
      setTimeout(initGame, 2000);
    }
  }

  invertButton.addEventListener("click", invertRightBit);
  initGame();
});
