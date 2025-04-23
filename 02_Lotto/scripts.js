let gewaehlteZahlen = new Set();
let gezogeneZahlen = [];

window.onload = () => {
  const buttonGrid = document.getElementById("lotto-buttons");
  for (let i = 1; i <= 49; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => toggleZahl(i, btn);
    buttonGrid.appendChild(btn);
  }
};

function toggleZahl(zahl, btn) {
  if (gewaehlteZahlen.has(zahl)) {
    gewaehlteZahlen.delete(zahl);
    btn.classList.remove("selected");
  } else {
    if (gewaehlteZahlen.size < 6) {
      gewaehlteZahlen.add(zahl);
      btn.classList.add("selected");
    }
  }

  document.getElementById("abgebenBtn").disabled = gewaehlteZahlen.size !== 6;
}

function tippAbgeben() {
  gezogeneZahlen = zieheZahlen();
  zeigeZiehung();

  const richtige = gezogeneZahlen.filter(z => gewaehlteZahlen.has(z));
  richtige.forEach(num => {
    [...document.querySelectorAll(".button-grid button")].forEach(btn => {
      if (parseInt(btn.textContent) === num) {
        btn.classList.add("correct");
      }
    });
  });

  document.getElementById("auswertung").innerHTML = `
    <p>Richtige Zahlen: ${richtige.length}</p>
    <p>${bewertungText(richtige.length)}</p>
  `;

  document.getElementById("abgebenBtn").disabled = true;
  document.getElementById("neuBtn").style.display = "inline-block";
}

function zieheZahlen() {
  const zahlen = new Set();
  while (zahlen.size < 6) {
    zahlen.add(Math.floor(Math.random() * 49) + 1);
  }
  return Array.from(zahlen).sort((a, b) => a - b);
}

function zeigeZiehung() {
  document.getElementById("ziehung").innerHTML = `
    <p>Gezogene Zahlen: ${gezogeneZahlen.join(", ")}</p>
  `;
}

function bewertungText(anzahl) {
  switch (anzahl) {
    case 6: return "UNGLAUBLICH! Alle richtig!";
    case 5: return "Mega! 5 Richtige!";
    case 4: return "Super! 4 Richtige!";
    case 3: return "Herzlichen Glückwunsch!";
    case 2: return "Na, wird besser!";
    case 1: return "Immerhin eine!";
    default: return "Schade, kein Treffer.";
  }
}

function neustart() {
  gewaehlteZahlen.clear();
  gezogeneZahlen = [];
  document.getElementById("ziehung").innerHTML = "";
  document.getElementById("auswertung").innerHTML = "";
  document.getElementById("neuBtn").style.display = "none";
  document.getElementById("abgebenBtn").disabled = true;

  const buttons = document.querySelectorAll(".button-grid button");
  buttons.forEach(btn => {
    btn.classList.remove("selected");
    btn.classList.remove("correct");
  });
}
