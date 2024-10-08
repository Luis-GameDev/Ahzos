// zum freischalten aller Level geben sie bitte folgenden Cheatcode in die Konsole der Seite ein:
			// window.localStorage.setItem('LastLevel', 25); window.location.reload();

			// ab hier initialisierung und level selection | code by Luis
			// hier wird das LastLevel auf 0 gesetzt, sollte dieses keinen wert haben | code by Luis
			let LastLevel = window.localStorage.getItem('LastLevel');
			window.addEventListener('load', initialisierung);

			// das hauptmenü wird initialisiert, werte aus dem localstorage werden geladen um den spielstand anzuzeigen | code by Luis
			function initialisierung() {
				// sollte man zum ersten mal das spiel spielen, hat LastLevel den wert "null", in dem fall wird dieser wert auf 0 gesetzt | code by Luis
				if( LastLevel == null) {
					window.localStorage.setItem('LastLevel', 0);
				}
				// die variable i entspricht den levelbuttons, welche dann die farbe ändern, sollten sie schon abgeschlossen worden sein | code by Luis
				// solang das LastLevel + 1 größer ist, wird i um 1 erhöht, und somit auch der button grün gefärbt, solang bis das zuletzt abgeschlossene Level erreicht wurde | code by Luis
				for(let i = 1; (parseInt(LastLevel) + 1) > i; i++) {
					let levelButton = document.getElementById(i);
					levelButton.style.color = "green" ; 
				}
				// es wird automatisch das nächste, noch nicht abgeschlossene Level ausgewählt | code by Luis
				if(LastLevel !== null) {
					level(parseInt(LastLevel) + 1);
				}
				else {
					level(1);
				}
			}
			
			// hier wird das level initialisiert (zur jumprun seite redirected), im localstorage wurde das ausgewählte level bereits vermerkt, damit "jumprun.html" weiß, welches level initialisiert werden soll | code by Luis
			function spielInitialisieren() {
				window.location.href = "jumprun.html" ;
			}

			//  | code by Luis
			function level(GewaehltesLevel) {
				LastLevel = window.localStorage.getItem('LastLevel');
				let testLvl = parseInt(LastLevel) + 1;
				if (GewaehltesLevel <= testLvl) {
					window.localStorage.setItem('Level', GewaehltesLevel);
					let button = document.getElementById('abc');
					button.textContent = 'Level ' + GewaehltesLevel + ' Starten';
				} else {
					showNotification('Du musst erst das vorherige Level abschließen!');
				}
			}
			function toggleChapters() {
				var chaptersContainer = document.getElementById("chaptersContainer");
				if (chaptersContainer.style.display === "none" || chaptersContainer.style.display === "") {
					chaptersContainer.style.display = "block";
				} else {
					chaptersContainer.style.display = "none";
				}
			}
			// setzt den local storage zurück und läd die seite neu damit die werte wieder automatisch zugewiesen werden | code by Luis
			function resetLS() {
				window.localStorage.clear();
				window.location.reload();
			}

			// Funktion zur Anzeige einer benutzerdefinierten Benachrichtigung | code by Shania
			function showNotification(message) {
				// Erstellen Sie ein Element für die Benachrichtigung
				let notification = document.createElement('div');
				notification.className = 'notification';
				notification.textContent = message;

				// Fügen Sie die Benachrichtigung zum Dokument hinzu
				document.body.appendChild(notification);

				// Verzögertes Entfernen der Benachrichtigung nach einigen Sekunden
				setTimeout(function() {
					notification.style.opacity = '0';
					setTimeout(function() {
						document.body.removeChild(notification);
					}, 1000);
				}, 3000); // 3000 Millisekunden (3 Sekunden) Verzögerung
			}




			// | code by Shania

			var currentGifName = null;
			var timeoutId = null;
			var timeoutIdSkinImage = null;
			var skinSelectionVisible = false;

			function showGif(gifName) { // | code by Shania
				// Wenn dasselbe GIF bereits angezeigt wird, wird nichts unternommen
				if (gifName === currentGifName) {
					return;
				}

				// Alle GIF-Container ausblenden
				var gifContainers = document.querySelectorAll('.gif-container');
				gifContainers.forEach(function(container) {
					container.style.display = 'none';
				});

				// Das angeklickte GIF anzeigen
				var gifElement = document.getElementById(gifName);
				gifElement.style.display = 'block';

				// Das aktuelle GIF aktualisieren
				currentGifName = gifName;

				// Wenn bereits ein Timeout aktiv ist, wird es gelöscht
				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				// Ein neues Timeout starten, um das GIF nach 10 Sekunden auszublenden
				timeoutId = setTimeout(function() {
					gifElement.style.display = 'none';
					currentGifName = null;
					timeoutId = null;
				}, 10000);
			}

			function toggleSkinSelection() { // | code by Shania
				var skinSelection = document.getElementById("skinSelection");
				var skinSelectionImage = document.getElementById("skinSelectionImage");

				if (!skinSelectionVisible) {
					skinSelection.style.display = "block";
					skinSelectionImage.style.display = "block";
					skinSelectionVisible = true;

					// Wenn bereits ein Timeout für das Bild aktiv ist, wird es gelöscht
					if (timeoutIdSkinImage) {
						clearTimeout(timeoutIdSkinImage);
					}

					// Ein neues Timeout starten, um das Bild nach 10 Sekunden auszublenden
					timeoutIdSkinImage = setTimeout(function() {
						skinSelectionImage.style.display = 'none';
						timeoutIdSkinImage = null;
					}, 10000);
				} else {
					skinSelection.style.display = "none";
					skinSelectionImage.style.display = "none";
					skinSelectionVisible = false;
				}
			}   

			function showShaniaImage() {
				var shaniaImage = document.getElementById('shaniaImage');
				var luisImage = document.getElementById('luisImage');
				
				// Luis-Bild ausblenden, falls sichtbar
				luisImage.style.display = 'none';
			
				// Shania-Bild anzeigen
				shaniaImage.style.display = 'block';
			
				setTimeout(function() {
					shaniaImage.style.display = 'none';
				}, 6000);
			}
			
			function showLuisImage() {
				var shaniaImage = document.getElementById('shaniaImage');
				var luisImage = document.getElementById('luisImage');
			
				// Shania-Bild ausblenden, falls sichtbar
				shaniaImage.style.display = 'none';
			
				// Luis-Bild anzeigen
				luisImage.style.display = 'block';
			
				setTimeout(function() {
					luisImage.style.display = 'none';
				}, 6000);
			}

			document.addEventListener('mousemove', function(event) {
				var customMouse = document.getElementById('custom-mouse');
				customMouse.style.left = event.clientX + 'px';
				customMouse.style.top = event.clientY + 'px';
			});


			// Funktion, die beim Klicken auf das Bild aufgerufen wird  | code by Shania
			function redirectToLinktree() {
				// Weiterleitung zur gewünschten URL (hier Linktree)
				window.location.href = "https://linktr.ee/shaniaskaka";
			}

			function redirectToDiscordProfile() {
				window.location.href = "https://discordapp.com/users/450395254198370314"
			}
	
			// Bild-Element aus dem DOM auswählen
			var shaniaImage = document.getElementById('shaniaImage');
			var luisImage = document.getElementById('luisImage');
	
			// Klickereignis-Handler hinzufügen
			shaniaImage.addEventListener('click', redirectToLinktree);
			luisImage.addEventListener('click', redirectToDiscordProfile);

			var isMusicPlaying = true; // Variable, um den Musikstatus zu verfolgen  | code by Shania

			function toggleMusic() {
				var music = document.getElementById('background-music'); // Das Audio-Element auswählen
			
				if (isMusicPlaying) {
					music.pause(); // Musik pausieren, wenn sie gerade läuft
				} else {
					music.play(); // Musik abspielen, wenn sie gerade pausiert ist
				}
				
				// Musikstatus aktualisieren
				isMusicPlaying = !isMusicPlaying;
			
				// Symbol auf entsprechendes Icon ändern
				var buttonIcon = isMusicPlaying ? "url('media/img/volume-icon.png')" : "url('media/img/volume-icon_leise.png')";
				document.getElementById('top-right-button').style.backgroundImage = buttonIcon;
			}


