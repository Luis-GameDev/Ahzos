
// Alles umgesetzt von CodingNepal mit Codes von Shania

document.addEventListener("DOMContentLoaded", function() {
    const blackOverlay = document.getElementById("black-overlay");
    const zumSpielButton = document.getElementById("zum-Spiel");
    const gameModal = document.querySelector(".game-modal");

    // Event-Listener für das Klicken auf den "Zum Spiel" Button
    zumSpielButton.addEventListener("click", function() {
        window.location.href = "jumprun_2023/index.html"; // Weiterleitung zur anderen Seite
    });

    // Event-Listener für das Klicken auf den schwarzen Hintergrund | code by Shania
    blackOverlay.addEventListener("click", function(event) {
        if (event.target === blackOverlay) {
            blackOverlay.style.display = "none"; // Schwarzen Hintergrund verbergen, wenn außerhalb des Buttons geklickt wird
        }
    });
    
    const wordDisplay = document.querySelector(".word-display");
    const guessesText = document.querySelector(".guesses-text b");
    const keyboardDiv = document.querySelector(".keyboard");
    const hangmanImage = document.querySelector(".hangman-box img");

    // Initialisierung der Spielvariablen
    let currentWord, correctLetters, wrongGuessCount;
    const maxGuesses = 6;

    const resetGame = () => {
        // Zurücksetzen der Spielvariablen und UI-Elemente
        correctLetters = [];
        wrongGuessCount = 0;
        hangmanImage.src = "images/hangman-0.svg";
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
        gameModal.classList.remove("show");
    }

    const gameOver = (isVictory) => { // | code by Shania
        // Nach Spielende... Anzeigen des Modals mit relevanten Details
        const modalText = isVictory ? `Du hast's geschafft!:` : 'Der Name lautet:';
        gameModal.querySelector("h4").innerText = isVictory ? 'Nice!' : 'Game Over!';
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    
        // Text für den "Zum Spiel" Button aktualisieren
        const zumSpielButtons = document.querySelectorAll(".zum-Spiel");
        zumSpielButtons.forEach(button => {
            if (isVictory) {
                button.innerText = "Zum Spiel"; // Text zurück zu "Zum Spiel" ändern bei Sieg
            } else {
                button.innerText = "Nochmal"; // Text zu "Nochmal" ändern bei Niederlage
            }
        });
    
        // Event-Listener für den "Nochmal" Button
        const nochmalButtons = document.querySelectorAll(".zum-Spiel");
        nochmalButtons.forEach(button => {
            button.addEventListener("click", function() {
                if (!isVictory) {
                    resetGame(); // Spiel zurücksetzen bei Niederlage
                } else {
                    window.location.href = "jumprun_2023/index.html"; // Weiterleitung zur anderen Seite bei Sieg
                }
            });
        });
    }

    const initGame = (button, clickedLetter) => {
        // Umwandlung des eingegebenen Buchstabens in Kleinbuchstaben
        clickedLetter = clickedLetter.toLowerCase();

        // Überprüfen, ob der geklickte Buchstabe im aktuellen Wort enthalten ist
        if(currentWord.includes(clickedLetter)) {
            // Anzeigen aller korrekten Buchstaben im Wort
            [...currentWord].forEach((letter, index) => {
                if(letter === clickedLetter) {
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            // Falls der geklickte Buchstabe nicht vorhanden ist, wird die Anzahl der falschen Versuche aktualisiert und das Hangman-Bild geändert
            wrongGuessCount++;
            hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        }
        button.disabled = true; // Deaktivieren des geklickten Buttons, damit der Benutzer nicht erneut klicken kann
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

        // gameOver-Funktion aufrufen, wenn eine der folgenden Bedingungen erfüllt ist
        if(wrongGuessCount === maxGuesses) return gameOver(false);
        if(correctLetters.length === currentWord.length) return gameOver(true);
    }

    // Das aktuelle Wort auf "Ahzos" setzen
    currentWord = "ahzos";

    // Erstellen der Tastatur-Buttons und Hinzufügen von Event-Listenern
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
    }

    resetGame(); // Spiel initialisieren
});
