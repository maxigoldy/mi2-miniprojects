function compareTexts() {
    const text1 = document.getElementById("text1").value.split("\n");
    const text2 = document.getElementById("text2").value.split("\n");

    let countMap1 = getCountMap(text1);
    let countMap2 = getCountMap(text2);

    let resultHTML1 = "";
    let resultHTML2 = "";

    let uniqueLines = new Set([...text1, ...text2]); // Alle vorkommenden Zeilen

    uniqueLines.forEach(line => {
        let count1 = countMap1[line] || 0;
        let count2 = countMap2[line] || 0;

        if (count1 > count2) {
            // Linke Seite hat mehr Instanzen als die rechte → Fehlende markieren
            for (let i = 0; i < count1 - count2; i++) {
                resultHTML1 += `<span class="removed">${line}</span>\n`;
            }
        }
        for (let i = 0; i < Math.min(count1, count2); i++) {
            // Gleich viele Instanzen → Normal anzeigen
            resultHTML1 += line + "\n";
            resultHTML2 += line + "\n";
        }
        if (count2 > count1) {
            // Rechte Seite hat mehr Instanzen als die linke → Hinzugefügte markieren
            for (let i = 0; i < count2 - count1; i++) {
                resultHTML2 += `<span class="added">${line}</span>\n`;
            }
        }
    });

    document.getElementById("result1").innerHTML = resultHTML1;
    document.getElementById("result2").innerHTML = resultHTML2;
}

// Erstellt eine Häufigkeitsmap für die Zeilen
function getCountMap(textArray) {
    let countMap = {};
    textArray.forEach(line => {
        countMap[line] = (countMap[line] || 0) + 1;
    });
    return countMap;
}
