function generateLotto() {
    const spiele = parseInt(document.getElementById("spiele").value);
    const lottoTabelle = document.getElementById("lottoTabelle");
    lottoTabelle.innerHTML = "";
  
    const table = document.createElement("table");
  
    for (let i = 0; i < spiele; i++) {
      const row = document.createElement("tr");
      const zahlen = generateNumbers(6, 1, 49);
      zahlen.sort((a, b) => a - b);
  
      zahlen.forEach((zahl) => {
        const cell = document.createElement("td");
        cell.textContent = zahl;
        row.appendChild(cell);
      });
  
      table.appendChild(row);
    }
  
    lottoTabelle.appendChild(table);
}
  
function generateNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(num);
    }
    return Array.from(numbers);
}
  