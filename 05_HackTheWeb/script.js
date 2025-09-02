const input = document.getElementById("input");
const output = document.getElementById("output");

let currentMission = null;

const missions = {
  mission1: {
    description: "Mission 1 gestartet: Finde das Passwort im Quellcode...",
    password: "access_granted_42",
    completed: false
  },
  mission2: {
    description: "Mission 2 gestartet: Finde die versteckte Datei im Terminal...",
    password: "hidden_file.txt",
    completed: false
  },
  mission3: {
    description: "Mission 3 gestartet: Berechne das Ergebnis von (1337 * 3) + 1",
    password: "4012",
    completed: false
  },

  mission4: {
    description: "Mission 4 gestartet: Welche Hochschule ist die beste? (Nur Abkürzung, CAPS)",
    password: "HSB",
    completed: false
  }
};

const commands = {
  help: "Verfügbare Befehle: help, about, clear, mission1, mission2, mission3, mission4, enter [passwort]",
  about: "Hack the Web v1.0 - Eine interaktive Fake-Hacking-Simulation. Dies ist ein University Project.",
  clear: "__clear__"
};

function print(text) {
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function handleMission(name) {
  if (missions[name]) {
    currentMission = name;
    print(missions[name].description);
  } else {
    print("Unbekannte Mission.");
  }
}

function checkPassword(pass) {
  if (!currentMission) {
    print("Starte zuerst eine Mission (z. B. 'mission1').");
    return;
  }

  const mission = missions[currentMission];
  if (mission.password === pass) {
    if (!mission.completed) {
      print("✅ Passwort korrekt! Mission abgeschlossen.");
      mission.completed = true;
    } else {
      print("✔️ Diese Mission wurde bereits abgeschlossen.");
    }
  } else {
    print("❌ Falsches Passwort. Versuche es erneut.");
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const value = input.value.trim();
    print("$ " + value);

    if (value.startsWith("mission")) {
      handleMission(value);
    } else if (value.startsWith("enter ")) {
      const pw = value.substring(6).trim();
      checkPassword(pw);
    } else if (commands[value]) {
      if (commands[value] === "__clear__") {
        output.innerHTML = "";
      } else {
        print(commands[value]);
      }
    } else {
      print("Unbekannter Befehl. Tippe 'help' für eine Liste.");
    }

    input.value = "";
  }
});
