    // Globale Konstanten welche das Spielprinzip definieren
    const maxhp = 3 ; // maximale herzen konstante | code by Luis
    const MAXLVL = 25 ; // maximales Level konstante | code by Luis
    const FELD = 40 ; // Feldgröße der Tiles: 40 x 40 px
    const TILES = ['A','D','M','P','S','E','B','G','T','Z','I','O','Ö','L','R','U','Ü','Y','Q','W','C','N','V','X','H','Ä','J','K','F','1','2','3','4','5','6','7','8','9','0','ß','#','?','$','%'] ;
    // A = Lava | D = Blätterdach | M = Leiter | P = Plattform Blau | S = Stachel | E = Erde | B = Erde mit Gras
    // G = Geist (Gegner) | T = Keule (HP) | Z = Zielblock (Exit) | I = Zielblock (Exit) | O = Sandstein (Oben) 
    // Ö = Leiter | L = Plattform (Gelb) | R = Kaktus | U = Erde (Wüste) | Ü = Sandstein (Unten) | Y = Pilz
    // Q = Seeigel | W = Seeigel | C = Plattform (Grau) | N = Dornenranken | V = Sand | X = Sand (Oberfläche)
    // H = Pufferfish | Ä = Luftblase (HP) | J = Dämon (Gegner) | K = Feuer (Oben, Deadly) | F = Leiter 
    // 1 = Plattform (Rot) | 2 = Stachel | 3 = Erde (Hölle) | 4 = Erde (Oben, Hölle) | 5 = Wolke | 6 = Plattform (Weiß)
    // 7 = Wolke2 | 8 = Feuer (Unten, Deadly) | 9 = Rabe (Deadlyup) | 0 = Wolkenblock | ß = Sonne (HPup) | # = Wassertropfen (HPup)
    // ? = Wolkentrap (No collision) | $ = Lava (Deadly, Filled) | % = Unsichtbar (deadly)

    // Globale Konstanten welche das Tileset definieren
    const BLOCKER = 'DPEBOLUÜCVX3406157' ; // Unpassierbare Felder
    const DEADLY = 'SG2$N%' ; // tödliche Felder, sofortiger tod bei kollision | code by Luis
    const DEADLYHIT = 'ARKR8' ; // felder bei denen man alle x-sekunden schaden erhält | code by Luis
    const DEADLYUP = 'QWHY9' ; // felder auf denen man bei kollision ein HP abgezogen bekommt | code by Luis
    const GOAL = 'Z' ; // ziel Felder, level wird bei kollision abgeschlossen | code by Luis
    const HPUP = 'TÄß#' ; // felder auf denen man bei kollision einen HP bekommt | code by Luis
    const DROPTILE = '57' ; // felder die bei kollision nach bestimmter zeit verschwinden | code by Luis
    const ADDTIME = 'I' ; // felder welche im wüstenbiom die zeit erhöhen | code by Luis
    const TURRET = 'J' ; // tile welches projektile in spieler richtung schießt (max. 1 pro level) | code by Luis

    // Bereich für Deklaration globaler Variablen			
    let GRAVITATION = 500 ; // Pro Sekunde 500px Fallgeschwindigkeit

    let hintergrund ;	// <img> mit Hintergrund-Grafik
    let tileset ;		// <img> mit Tileset-Grafik
    let spritesheet ; 	// <img> mit Spritesheet-Grafik
    let bullet ;        // <img> mit Bullet-Grafik
    let level ;			// <canvas> mit komplett generiertem level
    let ausschnitt ;	// <canvas> für Übertragung des sichtbaren Ausschnitts
    let spielfeld ;		// <div> zur Darstellung des <canvas> mit Spielfeld
    let anzeige ;		// <div> zur Anzeige benötigter Spielwerte, z.B. Position, Punkte

    let steuerung ;		// JS-Objekt mit Information zu gedrückten Tasten im Spiel
    let zuletzt ;		// DATE-Objekt mit Zeitpunkt des zuletzt dargestellten Frames
    let meinSpieler ;	// Referenz auf die aktuelle Instanz der Spieler-Klasse => Player Character
    let allowShot = true ; // Variable um das schießen der Turrets zu regulieren | code by Luis
    let levelPosX ;		// Horizontale Scrollposition des Levels innerhalb des Ausschnitts	
    let anfang ;        // Variable welche die Startzeit eines Levels enthält | code by Luis
    let ende ;          // Variable welche die Stopzeit eines Levels enthält | code by Luis
    let zeit = ende - anfang ; // variable welche die dauer von anfang bis ende enthält | code by Luis

    let settingsOpened = false ; // variable welche sagt ob die settings geöffnet oder geschlossen sind | code by Luis
    let allowHit = true ; // erlaube den abzug von HP durch bestimmte tiles | code by Luis
    let droptileArray = [] ; // das array welches die betretenen droptiles speichert, und sie löscht sobald sie zerbrechen | code by Luis
    let turretArray = [] ; // das array welches die geschossenen kugeln eines turrets speichert und wieder löscht | code by Luis
    let levelAn ; // Variable die true sein muss damit das level aktualisiert werden kann | code by Luis
    let healthpoints = 1 ;  // Healthpoints zu beginn des spiels | code by Luis
    let UIscale = 1 ;   // größe der UI skalieren in dezimalzahlen, 1 ist standard und 2 ist dementsprechend doppelt, 1 entspricht 100% | code by Luis
    let audio = true ;  // audio an oder aus | code by Luis
    let audioVolume = 50 ; // audio lautstärke verändern | code by Luis
    let AusgewaehltesLevel = window.localStorage.getItem('Level') ; // variable für das level das gestartet werden soll, kann nur im hauptmenü geändert werden und wird bei direktem verweis auf jumprun.html auf level 1 gesetzt | code by Luis
    let KARTE = KARTEN[AusgewaehltesLevel - 1] ; // mehrdimensionales array welches alle maps enthält, die maps sind in Maps.js zu finden | code by Luis
    let bonusZeit = 0 ; // zeit welche im Wüstenlevel durch aufheben von addTime-tiles erhalten werden kann | code by Luis
    let bulletVelocity = 300 ; // geschwindigkeit der vom turret geschossenen kugeln | code by Luis
	let turretRange = 400 ; // reichweite des turrets | code by Luis

    // Spielstart nach Ende des Ladevorgangs
    window.addEventListener('load', initialisieren ) ;
    
    function initialisieren( ereignis ) {	
        // sichert den fall ab, dass das level ohne hauptmenü betreten wurde | code by Luis
        if( AusgewaehltesLevel == null) {			
            window.localStorage.setItem('Level', 1);				
            AusgewaehltesLevel = 1 ;
        }
        // verweiß auf das mehrdimensionale KARTEN-array | code by Luis
        KARTE = KARTEN[AusgewaehltesLevel - 1];
        // zeige das aktuelle level am oberen bildschirmrand an | code by Shania
        let header = document.getElementById('levelAusgewaehlt');
        header.textContent = 'Level ' + AusgewaehltesLevel ;
        // funktion zum auswählen des passenden hintergrundes | code by Luis
        setBackground();
        // starte sauerstoffverlust im wasserbiom | code by Luis
        if( AusgewaehltesLevel > 10 && AusgewaehltesLevel < 16 ) {
            healthpoints = maxhp;
            startHpLoss();
        }
        document.getElementById('UI').style.visibility = "visible";
        levelAn = true ; // schaltet die aktualisierung für das level an | code by Luis
        // Merken der Bildquellen für künftigen Gebrauch
        tileset = document.getElementById('Tileset') ;
        npcgrafik = document.getElementById('npcgrafik') ;
        spritesheet = document.getElementById('Spritesheet') ;
        bullet = document.getElementById('bullet') ;
        spielfeld = document.getElementById('Spielfeld') ;
        anzeige = document.getElementById('Anzeige') ;
        // Initialisierung des auf dem Spielfeld sichtbaren Ausschnitts
        ausschnitt = document.createElement('canvas') ;
        ausschnitt.setAttribute("id", "ausschnitt");
        ausschnitt.width = 1550 ;
        ausschnitt.height = 700 ;
        spielfeld.appendChild( ausschnitt ) ;
        // Aufbau des aktuellen Levels anhand der Einträge der Karte
        level = zeichneLevel( KARTE ) ;
        // Spieler klasse instanzieren | code by Luis
        meinSpieler = new Spieler( 150, 300, spritesheet, bullet ) ;
        // steuerung-objekt implementieren | code by Luis
        steuerung = {
            'links': false ,
            'rechts': false ,
            'sprung': false ,
            'shift': false ,
            'oben': false ,
            'unten': false ,
            'settings': false ,
            'fullscreen': false
        }
        window.addEventListener('keydown', steuern ) ;
        window.addEventListener('keyup', steuern ) ;
        // Zeitmessung starten
        zuletzt = new Date() ;
        anfang = new Date() ;
        // Framefolge starten
        window.requestAnimationFrame( aktualisieren ) ;

    }
    // function wird ausgeführt beim klicken des "nächstes level" buttons | code by Luis
    function nextLevel() {
        // frage das ausgewählte level aus dem localStorage ab | code by Luis
        let AusgewaehltesLevel = window.localStorage.getItem('Level');
        // erhöhe das level bei 1 | code by Luis
        if(AusgewaehltesLevel < MAXLVL) {
            AusgewaehltesLevel++;
        }
        // gebe das erhöhte level zurück an den localStorage | code by Luis
        window.localStorage.setItem('Level', AusgewaehltesLevel);
        // lade die seite neu, damit das ausgewählte level automatisch gestartet werden kann | code by Luis
        location.reload();
    }
    
    function aktualisieren() {
        // Dauer seit dem letzten aktualisieren() in Sekunden mit Dezimalstellen berechnen
        // nur wenn levelAn === true ist darf aktualisiert werden, wird beim initialisieren automatisch auf true gesetzt | code by Luis
        if(levelAn === true) {
            let jetzt = new Date() ;
            let dauer = ( jetzt.getTime() - zuletzt.getTime() ) /1000 ;
            zuletzt = jetzt ;
            meinSpieler.aktualisieren( dauer ) ;
            window.requestAnimationFrame( aktualisieren ) ;
            // aktualisiere die herzen und prüfe ob man tod ist | code by Luis
            hearts();
            checkDeadOrAlive();			
            // settings per ESC taste öffnen | code by Luis
            if(steuerung.settings) {
                openSettings();
            }
            if(steuerung.fullscreen) {
                toggleFullscreen();
            }
            // timer | code by Luis &  timer.png nur bei 6-10 | code by Shania
            if (AusgewaehltesLevel >= 5 && AusgewaehltesLevel <= 11) {
                document.getElementById('timer').style.display = "block";
            } else {
                document.getElementById('timer').style.display = "none";
            }
    
            if (AusgewaehltesLevel > 5 && AusgewaehltesLevel < 11) {
                document.getElementById('timerCountdown').style.display = "block";
            } else {
                document.getElementById('timerCountdown').style.display = "none";
            }
            
            let ablaufZeit = (anfang.getTime() + 31000 ) - jetzt.getTime();
            let ablaufAnzeige = parseInt(ablaufZeit/1000) + bonusZeit;
            document.getElementById('timerCountdown').innerHTML = ablaufAnzeige;
            if(ablaufAnzeige <= 0 && AusgewaehltesLevel > 5 && AusgewaehltesLevel < 11) {
                healthpoints = 0;
            }
        }
        else {
            document.getElementById('timer').style.display = "none";
            document.getElementById('timerCountdown').style.display = "none";
        }
    }

    // es wird bei jedem aktualisieren geprüft ob man tod ist, wenn ja wird das level gestoppt und die death-UI angezeigt | code by Luis
    function checkDeadOrAlive() {
        // wenn die healthpoints weniger als 1 sind ist man tod | code by Luis
        if(healthpoints <= 0) {
            // stoppe das level | code by Luis
            levelAn = false ;
            // blende die death popup ein | code by Luis
            document.getElementById('death').style.display = "block" ;
            // blende die UI aus | code by Luis
            document.getElementById('UI').style.visibility = "hidden";
        }
    }

    function startHpLoss() {
        setTimeout(() => {
              healthpoints-- ;
            startHpLoss();
        }, 10000);
    }

    function steuern(ereignis) {
        switch (ereignis.keyCode) {
            case 65: steuerung.links = (ereignis.type == 'keydown') ? true : false; break;
            case 68: steuerung.rechts = (ereignis.type == 'keydown') ? true : false; break;
            case 32: steuerung.sprung = (ereignis.type == 'keydown') ? true : false; break; // Leertaste für Sprung
            case 16: steuerung.shift = (ereignis.type == 'keydown') ? true : false; break; // Shift-Taste für Beschleunigung/Sprinten | code by Shania
            case 87: steuerung.oben = (ereignis.type == 'keydown') ? true : false; break; // W für nach oben klettern | code by Shania
            case 83: steuerung.unten = (ereignis.type == 'keydown') ? true : false; break; // S für nach oben bewegen | code by Shania
            case 27: steuerung.settings = (ereignis.type == 'keydown') ? true : false; break; // ESC taste eingefügt | code by Luis
            case 36: steuerung.fullscreen = (ereignis.type == 'keydown') ? true : false; break; // F11 für fullscreen
            default: ; 
        }
    }
    
    function zeichneLevel( map ) {
        let leinwand = document.createElement('canvas') ;
        leinwand.width = FELD * map[0].length ;
        leinwand.height = FELD * map.length ;
        let pinsel = leinwand.getContext('2d') ;
        pinsel.drawImage( hintergrund, 0,0 , leinwand.width,leinwand.height , 0,0 , leinwand.width,leinwand.height  ) ;
        console.log('Breite: '+ leinwand.width +' , Höhe: '+ leinwand.height ) ;
        // Durchlaufe alle Zeilen der Map
        for( let zeile = 0 ; zeile < map.length ; zeile++ ) {
            // Durchlaufe darin alle Spalten der Map
            for( spalte = 0 ; spalte < map[0].length ; spalte++ ) {
                // Bestimme die Position des aktuellen Feldes im TILES-Array
                let pos = TILES.indexOf( map[zeile].charAt( spalte ) ) ;
                // Falls Map-Eintrag unter den angegebenen TILES ist
                if( pos >= 0 ) {
                    // dann zeichne das entsprechende Feld auf die Leinwand 
                    pinsel.drawImage( tileset, FELD*pos,0 , FELD,FELD , spalte*FELD,zeile*FELD , FELD,FELD  ) ;
                }
            }
        }
        return leinwand ;
    }

    // bei click auf das zahnrad werden settings geöffnet | code by Luis
    function openSettings() {				
        console.log('Du hast die Einstellungen geöffnet!') ;
        // blende die settings ein | code by Luis
        document.getElementById('settings').style.display = "block" ;
        audio = window.localStorage.getItem('audio');
        // zeige beim öffnen direkt den vorliegenden wert der variablen an | code by Luis
        if (audio == 'false') {
            document.getElementById('anundaus').style.color = "red" ;
        }
        else {
            document.getElementById('anundaus').style.color = "green" ;
        }
        document.getElementById('UIscale').textContent = 'x' + UIscale ;
    }
    // wenn settings geschlossen werden, werden sie eigentlich nur auf display: none gesetzt | code by Luis
    function closeSettings() {
        document.getElementById('settings').style.display = "none" ;
    }
    function showLevelWindow() {
        var levelFenster = document.getElementById('levelFenster');
        if (levelFenster.style.display === 'none') {
            levelFenster.style.display = 'block';
        } else {
            levelFenster.style.display = 'none';
        }
    }

    function hearts() {
        // i steht für die zahl hinter dem heart in der ID und es werden so viele IDs generiert wie es maxhp gibt | code by Luis
        for( let i = 1; i <= maxhp; i++ ) {
            // basis der ID ist "heart", die zahl von 1 bis maxhp wird drangehängt | code by Luis
            let heartid = 'heart' + i ;
            let herzaktuell = document.getElementById(heartid) ;
            // herzen werden nicht angezeigt wenn die menge an img-tag-herzen größer ist als healthpoints | code by Luis
            if(i > healthpoints) {
                herzaktuell.style.display = "none" ;
            }
            else {
                herzaktuell.style.display = "block" ;
            }		
        }	
        // verändere größe der UI basierend auf den UI settings | code by Luis
        let UIgear = document.getElementById('gear') ;	
        // for-schleife um alle herzen anzusprechen (selbe schleife wie oben beim erstellen der img tags) | code by Luis
        for( let i = 1; i <= maxhp; i++ ) {
            let heartid = 'heart' + i ;
            let herzaktuell = document.getElementById(heartid) ;
            // hier wird die variable UIscale eingesetzt welche in den settings per schieberegler verändert werden kann | code by Luis
            herzaktuell.style.transform = 'scale(' + UIscale + ')' ;
        }
        // herzen werden skaliert basierend auf der UI scale | code by Luis
        let heartcontainer = document.getElementById('heart-container') ;
        heartcontainer.style.transform = 'scale(' + UIscale + ')' ;
        UIgear.style.transform = 'scale(' + UIscale + ')' ;
        // erhöhe margin der herzen ab einer UI Skalierung von 1.26, damit die icons voll zu sehen sind und nicht abgeschnitten werden | code by Luis
            if(UIscale > 1.25) {
                document.getElementById('gear').style.margin = '3vw 3vw' ;
                document.getElementById('heart-container').style.margin = '2.5vw 5vw' ;
            }
            else {
                document.getElementById('gear').style.margin = '1vw' ;
                document.getElementById('heart-container').style.margin = '0 2vw' ;
            }
        }
				// Lautstärkeregler | code by Shania
				function adjustVolume(volume) {
					audioVolume = volume;
					let audioElement = document.querySelector("audio");
					audioElement.volume = volume / 100; // Die Lautstärke wird auf einen Wert zwischen 0 und 1 normalisiert
					localStorage.setItem("audioVolume", volume); // Speichern der Lautstärke im localStorage
				}
				window.onload = function() {
					let volume = localStorage.getItem("audioVolume");
					if (volume === null) {
						volume = 50; // Standardwert, falls keine gespeichert ist
					}
					document.getElementById("audioVolumeSlider").value = volume;
					adjustVolume(volume);
				}	
				// | code by Luis
				function updateSlider(value) {
					UIscale = value ;
				}
				// Funktion zum Laden des Audio-Status beim Laden der Seite | code by Shania
				window.onload = function() {
					let audioEnabled = localStorage.getItem("audio") === "true";
					let audioInput = document.getElementById("audioVolumeSlider");
				}	

				// leite zum hauptmenü weiter | code by Luis
				function weiterleiten() {
					window.location.href = "index.html";
				}
				// spiele sound ab | code by Luis
				function ton() {
					let audioEnabled = localStorage.getItem("audio");
					if(audioEnabled) {
						var x = document.getElementById("audio");
						// Schreibe folgendes Tag in das Element mit der ID audio | code by Luis
						x.innerHTML='<audio autoplay><source src="media/av/jump.mp3" type="audio/mpeg"/></audio>';
					}
				}
              
        // funktion zum zuordnen des passenden hintergrunds zum level | code by Luis
        function setBackground() {
            if(AusgewaehltesLevel < 6 && AusgewaehltesLevel > 0) {
                hintergrund = document.getElementById('Hintergrund1') ;
            }
            if(AusgewaehltesLevel < 11 && AusgewaehltesLevel > 5) {
                hintergrund = document.getElementById('Hintergrund2') ;
            }
            if(AusgewaehltesLevel < 16 && AusgewaehltesLevel > 10) {
                hintergrund = document.getElementById('Hintergrund3') ;
            }
            if(AusgewaehltesLevel < 21 && AusgewaehltesLevel > 15) {
                hintergrund = document.getElementById('Hintergrund4') ;
            }
            if(AusgewaehltesLevel < 26 && AusgewaehltesLevel > 20) {
                hintergrund = document.getElementById('Hintergrund5') ;
            }
        }

        // fullscreenButton | code by Shania
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                // Wenn Dokument nicht im Fullscreen-Modus, wechsle in den Fullscreen-Modus
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            } else {
                // Andernfalls, wenn Dokument bereits im Fullscreen-Modus ist, verlasse den Fullscreen-Modus
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) { 
                    document.msExitFullscreen();
                }
            }
        }