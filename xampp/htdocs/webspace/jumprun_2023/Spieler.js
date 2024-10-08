class Spieler {
	// Instanzeigenschaften: ------------------------------------------------
	// Ort
	posX = 0 ; // Horizontale Position im Level
	posY = 0 ; // Vertikale Position im Level
	// Kollisionsbox
	breite = 62 ; //62 Maße aus Spritesheet
	hoehe = 70 ; //70 Maße aus Spritesheet
	// Bewegung
	geschwindigkeit = 220 ; // Pixel pro Sekunde Horizontal
	fallgeschwindigkeit = 0 ; // Pixel pro Sekunde Vertikal
	sprungkraft = 300 ; // eigentlich: Absprunggeschwindigkeit
	boden = false ; // Flag (=Signal), ob Spieler auf Boden / Plattform ist
	// Darstellung und Animation
	sprite = undefined ;
	animation = 1 ;
	frame = 0 ;
	interval = 0 ;
	
	// Konstruktor | code by Herr. Erkert verändert by Luis
	constructor( startX, startY, spritesheet, bullet ) {
		this.posX = startX ;
		this.posY = startY ;
		this.sprite = spritesheet ;
		this.bullet = bullet ;
		this.anzeigen() ;
		this.setStats() ;
	}
	
	// aktualisieren | code by Herr. Erkert verändert by Luis
	aktualisieren( dauer ) {
		this.bewegen( dauer ) ; // Veränderung der Position im Level
		this.animieren( dauer ) ; // Passenden Ausschnitt aus Spritesheet berechnen
		this.sammeln() ; // tiles welche bei kollision aufgesammelt werden und ein HP hinzufügen | code by Luis
		this.sammelnDeadly() ; // tiles welche bei kollision aufgesammelt werden und ein HP abziehen | code by Luis
	    this.deadly() ; // tödliche tiles | code by Luis
		this.passGoal() ; // level abschließen durch kollision mit ziel tile | code by Luis
		this.anzeigen() ;
		this.klettern() ;
		this.droptile() ;
		this.deadlyhit() ;
		this.addTime(5) ;
		this.TURRET( dauer ) ;
	}
	
	// blockade | code by Herr. Erkert verändert by Luis
	blockade( pixelX, pixelY, map ) {
		let zeichenLO, zeichenLU, zeichenRO, zeichenRU , zeichenMU , zeichenMO , zeichenML , zeichenMR ; // Berührte Zeichen aus der Map
		let b = {} ; // enthält ein "Blockade-Objekt" mit Boolean-Eigenschaften links, oben, rechts, unten
		// Berechne aus den Pixel-Koordinaten die Tilemap-Koordinaten
		b.spalteLinks = Math.floor( pixelX / FELD ) ; 
		b.spalteRechts = Math.floor( ( pixelX + this.breite ) / FELD ) ;
		b.zeileOben = Math.floor( pixelY / FELD ) ;
		b.zeileUnten = Math.floor( ( pixelY + this.hoehe ) / FELD ) ;
		b.spalteMitteO = Math.floor( (pixelX) / FELD ) ;
		b.spalteMitteU = Math.floor( (pixelX + this.breite/2 ) / FELD ) ;
		b.zeileMitteL = Math.floor((pixelY) /FELD ) ;
		b.zeileMitteR = Math.floor((pixelY + this.hoehe/2 ) / FELD) ;
		// Blockade-information: true, falls in der Map in der Zeile / Spalte ein blockierendes Tile steht
		// Nimm das Zeichen aus der angegebenen Zeile und Spalte
		zeichenLO = map[ b.zeileOben ].charAt( b.spalteLinks ) ;
		zeichenLU = map[ b.zeileUnten ].charAt( b.spalteLinks ) ;
		zeichenRO = map[ b.zeileOben ].charAt( b.spalteRechts ) ;
		zeichenRU = map[ b.zeileUnten ].charAt( b.spalteRechts ) ;
		zeichenMO = map[ b.zeileOben ].charAt( b.spalteMitteO ) ;
		zeichenMU = map[ b.zeileUnten ].charAt( b.spalteMitteU ) ;
		zeichenML = map[ b.zeileMitteL ].charAt( b.spalteLinks ) ;
		zeichenMR = map[ b.zeileMitteR ].charAt( b.spalteRects ) ;

		// Falls es in BLOCKER vorkommt, ist diese Richtung blockiert (true) ;
		b.links = ( BLOCKER.indexOf( zeichenLO ) >= 0 || BLOCKER.indexOf( zeichenLU ) >= 0 /*|| BLOCKER.indexOf( zeichenML ) >= 0 */) ;
		b.rechts = ( BLOCKER.indexOf( zeichenRO ) >= 0 || BLOCKER.indexOf( zeichenRU ) >= 0 /*|| BLOCKER.indexOf( zeichenMR ) >= 0 */) ;
		b.oben = ( BLOCKER.indexOf( zeichenLO ) >= 0 || BLOCKER.indexOf( zeichenRO ) >= 0 /*|| BLOCKER.indexOf( zeichenMO ) >= 0 */) ;
		b.unten = ( BLOCKER.indexOf( zeichenLU ) >= 0 || BLOCKER.indexOf( zeichenRU ) >= 0 /*|| BLOCKER.indexOf( zeichenMU ) >= 0 */) ;

		return b ;
	}
	// bewegen | code by Herr. Erkert verändert by Shania und Luis
	bewegen( dauer ) { // Sprintfunktion | code by Shania
		let beschleunigungsfaktor = 1;
		if (steuerung.shift) { // Überprüfung, ob Shift gedrückt wird
			beschleunigungsfaktor = 2; 
		}
		if( steuerung.links ) {
			// Berechnung der angestrebten neuen Position
			this.posX -= this.geschwindigkeit * beschleunigungsfaktor * dauer;
			// Erstellung des Blockade-Objektes für diese Position
			let blockiert = this.blockade( this.posX, this.posY, KARTE ) ;

			// Falls Blockade in Laufrichtung vorliegt, versezten an den Anfang des blockierenden Feldes
			if( blockiert.links ) this.posX = FELD * blockiert.spalteLinks + FELD ;
		}
		if( steuerung.rechts ) {
			// Berechnung der angestrebten neuen Position
			this.posX += this.geschwindigkeit * beschleunigungsfaktor * dauer;
			// Erstellung des Blockade-Objektes für diese Position
			let blockiert = this.blockade( this.posX, this.posY, KARTE ) ;
			// Falls Blockade in Laufrichtung vorliegt, versezten an den Anfang des blockierenden Feldes
			if( blockiert.rechts ) this.posX = FELD * blockiert.spalteRechts - this.breite -1 ;
		}

		if( this.boden ) { // Spieler hat Boden unter den Füßen
			// Absprung:
			if( steuerung.sprung ) { // Falls Spieler gerade Sprungtaste drückt
				// Setze eine negative Fallgeschwindigkeit = Aufwärtsbewegung ein
				this.fallgeschwindigkeit = -this.sprungkraft ;
				this.boden = false ; // Registriere, dass Boden verlassen wurde
				if(audio === true) {
					ton(); // abspielen des jump sounds | code by Luis
				}
			}
			let blockiert = this.blockade( this.posX,this.posY, KARTE ) ;
			// Falls Spieler beim Laufen unten nicht mehr blockiert ist
			if( ! blockiert.unten ) {
				// dann mit dem Fall beginnen
				this.fallgeschwindigkeit += GRAVITATION * dauer ;
				// und Bodenkontakt abstellen
				this.boden = false ;
			} 
		} 
		else { // Füße des Spielers in der Luft
			if( AusgewaehltesLevel > 10 && AusgewaehltesLevel < 16 ) { // in Level 3 ist unendlich springen erlaubt | code by Luis
				if( steuerung.sprung ) { // Falls Spieler gerade Sprungtaste drückt
					// Setze eine negative Fallgeschwindigkeit = Aufwärtsbewegung ein
					this.fallgeschwindigkeit = -this.sprungkraft ;
					this.boden = false ; // Registriere, dass Boden verlassen wurde
					if(audio === true) {
						ton(); // abspielen des jump sounds | code by Luis
					}
				}
			}
			this.fallgeschwindigkeit += GRAVITATION * dauer ;
			this.posY += this.fallgeschwindigkeit * dauer ;
			let blockiert = this.blockade( this.posX, this.posY, KARTE ) ;
			// Falls Spieler am Fallen und unten blockiert ist
			if( this.fallgeschwindigkeit > 0 && blockiert.unten ) {
				// Spieler bleibt mit seinen Füßen auf der Oberseite des Blockers stehen
				this.posY = FELD * blockiert.zeileUnten -this.hoehe -0.1 ;
				this.fallgeschwindigkeit = 0 ;
				this.boden = true ;
				
			}
			// Kollisionskontrolle bei Aufwärtsbewegung => undurchlässige Plattformen
			if( this.fallgeschwindigkeit < 0 && blockiert.oben ) {
				// Aufwärtsbewegung endet abrupt.
				this.fallgeschwindigkeit = 0 ;
				// Kopf wird auf Unterkante des blockierenden Feldes gesetzt
				this.posY = FELD * blockiert.zeileOben + FELD ;
			}
		}
	}
	
	// animieren | code by Herr. Erkert verändert by Luis
	animieren( dauer ) {
		// Eigene Zeitmessung bis zum nächsten Animationszustand
		this.interval += dauer ;
		if( this.interval > 0.05 ) { // Falls seit dem letzten Bildwechsel mehr als 1/20 Sekunde vergangen sind 
			// Stelle anhand der Steuerung ein, welche Animationsfolge gezeigt werden soll
			if( steuerung.links ) { this.animation = 1 ; }
			if( steuerung.rechts ) { this.animation = 0 ; }
			if( steuerung.links != steuerung.rechts ) { // Nur eine der Lauftasten gedrückt
				this.frame = ( this.frame +1 ) %8 ; // dann nächsten Frame zeigen
			}
			// Setze die Zeitmessung für nächsten Bildwechsel zurück.
			this.interval = 0 ;
		}
	}
	
	// sammeln | code by Herr. Erkert verändert und erweitert by Luis
	sammeln() {
		// Map-Spalte und Map-Zeile zur Spielerposition ermitteln
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) ;
		// Falls das Zeichen an der entspr. Stelle der Map das gesuchte item ist, und meine HP noch nicht voll sind | VERÄNDERT by Luis
		if( HPUP.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 ) {
			if( healthpoints < maxhp) {
				healthpoints++ ;
				// Erstetze in der Map den Item-Buchstaben durch Leerzeichen
				let vorItem = KARTE[ zeile ].substring( 0, spalte ) ;
				let nachItem = KARTE[ zeile ].substring( spalte+1 ) ;
				// Item aus der Map entfernen, d.h. durch Leerzeichen ersetzen
				KARTE[ zeile ] = vorItem +' '+ nachItem ;
				// level = zeichneLevel( KARTE ) ; // Komplettes Level ohne eingesammeltes Item zeichnen
				let stift = level.getContext('2d') ;
				stift.drawImage( hintergrund, spalte*FELD,zeile*FELD , FELD,FELD , spalte*FELD,zeile*FELD , FELD,FELD ) ;
			}
		}
		if( HPUP.indexOf(KARTE[ zeile - 1 ].charAt( spalte )) >= 0 ) {
			if( healthpoints < maxhp) {
				healthpoints++ ;
				// Erstetze in der Map den Item-Buchstaben durch Leerzeichen
				let vorItem = KARTE[ zeile - 1 ].substring( 0, spalte ) ;
				let nachItem = KARTE[ zeile - 1 ].substring( spalte+1 ) ;
				// Item aus der Map entfernen, d.h. durch Leerzeichen ersetzen
				KARTE[ zeile - 1 ] = vorItem +' '+ nachItem ;
				// level = zeichneLevel( KARTE ) ; // Komplettes Level ohne eingesammeltes Item zeichnen
				let stift = level.getContext('2d') ;
				stift.drawImage( hintergrund, spalte*FELD,(zeile - 1)*FELD , FELD,FELD , spalte*FELD,(zeile - 1)*FELD , FELD,FELD ) ;
			}
		}
	}

	// fügt dem timer in den wüsten levels 5s bonus zeit hinzu, sobald ein ADDTIME tile aufgesammelt wurde | code by Luis
	addTime(bonus) {
		// Map-Spalte und Map-Zeile zur Spielerposition ermitteln
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) ;
		// Falls das Zeichen an der entspr. Stelle der Map das gesuchte item ist, und meine HP noch nicht voll sind | VERÄNDERT by Luis
		if( ADDTIME.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 ) {
			bonusZeit = bonusZeit + bonus;
			// Erstetze in der Map den Item-Buchstaben durch Leerzeichen
			let vorItem = KARTE[ zeile ].substring( 0, spalte ) ;
			let nachItem = KARTE[ zeile ].substring( spalte+1 ) ;
			// Item aus der Map entfernen, d.h. durch Leerzeichen ersetzen
			KARTE[ zeile ] = vorItem +' '+ nachItem ;
			// level = zeichneLevel( KARTE ) ; // Komplettes Level ohne eingesammeltes Item zeichnen
			let stift = level.getContext('2d') ;
			stift.drawImage( hintergrund, spalte*FELD,zeile*FELD , FELD,FELD , spalte*FELD,zeile*FELD , FELD,FELD ) ;
		}
		if( ADDTIME.indexOf(KARTE[ zeile - 1 ].charAt( spalte )) >= 0 ) {
			bonusZeit = bonusZeit + bonus;
			// Erstetze in der Map den Item-Buchstaben durch Leerzeichen
			let vorItem = KARTE[ zeile - 1 ].substring( 0, spalte ) ;
			let nachItem = KARTE[ zeile - 1 ].substring( spalte+1 ) ;
			// Item aus der Map entfernen, d.h. durch Leerzeichen ersetzen
			KARTE[ zeile - 1 ] = vorItem +' '+ nachItem ;
			// level = zeichneLevel( KARTE ) ; // Komplettes Level ohne eingesammeltes Item zeichnen
			let stift = level.getContext('2d') ;
			stift.drawImage( hintergrund, spalte*FELD,(zeile - 1)*FELD , FELD,FELD , spalte*FELD,(zeile - 1)*FELD , FELD,FELD ) ;
		}
	}

	// gesamte droptile function | code by Luis (mit Unterstützung von Herr Erkert)
	checkDroptileArrayPos(z, s) {
		// durchsuche das gesamte array
		for(let i = 0; droptileArray.length > i; i++) {
			// suche, ob es bereits ein eintrag im array mit den angefragen zeilen und spalten angaben gibt
			// wenn ja, dann darf kein weiterer eintrag erstellt werden
			if(s == droptileArray[i].spalte && z == droptileArray[i].zeile) {
				return true;
			}
			// wenn nein, darf ein weiterer eintrag mit den angefragten parametern dem array hinzugefügt werden
			else {
				return false;
			}
		}
	}

	droptile() {
		// zeile und spalte der spielerposition ermitteln
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) +1 ;
		// wenn der Spieler sich an der Positiion(zeile+1) des droptiles befindet... 
		if( DROPTILE.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 ) {
			// wenn das betretene droptile noch nicht berührt (im array vermerkt) wurde, wir ein neuer eintrag erstellt
			if(! this.checkDroptileArrayPos(zeile, spalte)) {
				let droptileZeit = new Date();
				// erstelle droptile-objekt mit angaben zur zeile und spalte des spielers, die zeit des betretens wird auch vermerkt
				let droptilePassed = {zeile, spalte, droptileZeit} ;
				// füge das droptile-objekt dem droptile-array hinzu
				droptileArray.push(droptilePassed);
			}
		}
		// erhalte die aktuelle systemzeit
		let neueZeit = new Date();
		// durchsuche jede verfügbare stelle im array
		for(let i = 0; droptileArray.length > i; i++) {
			let alteZeit = droptileArray[i].droptileZeit;
			// frage ab, ob der zeitpunkt des betretens + das delay, bereits kleiner ist als die aktuelle zeit
			// hier kann das delay zum verschwinden der tiles geändert werden | code by Luis
			if(( alteZeit.getTime() + 1500 ) <= neueZeit.getTime() ) {
				// ermittle die spalte vor und nach dem zu löschenden zeichen in der map
				let vorItem = KARTE[ droptileArray[i].zeile ].substring( 0, droptileArray[i].spalte ) ;
				let nachItem = KARTE[ droptileArray[i].zeile ].substring( droptileArray[i].spalte+1 ) ;
				// schneide das tile aus der map aus
				KARTE[ droptileArray[i].zeile ] = vorItem +' '+ nachItem ;
				let stift = level.getContext('2d') ;
				stift.drawImage( hintergrund, droptileArray[i].spalte*FELD,droptileArray[i].zeile*FELD , FELD,FELD , droptileArray[i].spalte*FELD,droptileArray[i].zeile*FELD , FELD,FELD ) ;		
				// entferne den eintrag zu diesem tile aus dem array			
				droptileArray.splice(i,1);
			}
		}
	}

	// sammelnDeadly | code by Luis
	sammelnDeadly() {
		// Map-Spalte und Map-Zeile zur Spielerposition ermitteln
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) ;
		// Falls das Zeichen an der entspr. Stelle der Map das gesuchte item ist, und meine HP noch nicht voll sind | VERÄNDERT by Luis
		if( DEADLYUP.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 ) {
			healthpoints--;
			// Erstetze in der Map den Item-Buchstaben durch Leerzeichen
			let vorItem = KARTE[ zeile ].substring( 0, spalte ) ;
			let nachItem = KARTE[ zeile ].substring( spalte+1 ) ;
			// Item aus der Map entfernen, d.h. durch Leerzeichen ersetzen
			KARTE[ zeile ] = vorItem +' '+ nachItem ;
			// level = zeichneLevel( KARTE ) ; // Komplettes Level ohne eingesammeltes Item zeichnen
			let stift = level.getContext('2d') ;
			stift.drawImage( hintergrund, spalte*FELD,zeile*FELD , FELD,FELD , spalte*FELD,zeile*FELD , FELD,FELD ) ;
		}
		if( DEADLYUP.indexOf(KARTE[ zeile - 1 ].charAt( spalte )) >= 0 ) {
			healthpoints--;
			// Erstetze in der Map den Item-Buchstaben durch Leerzeichen
			let vorItem = KARTE[ zeile - 1 ].substring( 0, spalte ) ;
			let nachItem = KARTE[ zeile - 1 ].substring( spalte+1 ) ;
			// Item aus der Map entfernen, d.h. durch Leerzeichen ersetzen
			KARTE[ zeile - 1 ] = vorItem +' '+ nachItem ;
			// level = zeichneLevel( KARTE ) ; // Komplettes Level ohne eingesammeltes Item zeichnen
			let stift = level.getContext('2d') ;
			stift.drawImage( hintergrund, spalte*FELD,(zeile - 1)*FELD , FELD,FELD , spalte*FELD,(zeile - 1)*FELD , FELD,FELD ) ;
		}
	}

	klettern() { 	// Kletterfunktion code by Shania
		// Map-Spalte und Map-Zeile zur Spielerposition ermitteln
		let spalte = Math.floor((this.posX + this.breite * 0.5) / FELD);
		let zeile = Math.floor((this.posY + this.hoehe * 0.7) / FELD);
		// Überprüfung, ob sich der Spieler auf dem Tile 'M' befindet
		if (KARTE[zeile].charAt(spalte) === 'M') {
			// Überprüfung, ob Spieler die Steuerung "oben" drückt
			if (steuerung.oben && zeile > 0) {
				// Suche das nächste 'M'-Tile über dem Spieler
				for (let i = zeile - 1; i >= 0; i--) {
					if (KARTE[i].charAt(spalte) === 'M') {
						// Spieler langsam nach oben gleiten lassen
						this.posY -= this.geschwindigkeit * 0.1; // Anpassen Sie den Faktor nach Bedarf für die gewünschte Geschwindigkeit
						break;
					}
				}
			}
			// Überprüfung, ob Spieler die Steuerung "unten" drückt 
			if (steuerung.unten && zeile < KARTE.length - 1) {
				// Suche das nächste 'M'-Tile unter dem Spieler
				for (let i = zeile + 1; i < KARTE.length; i++) {
					if (KARTE[i].charAt(spalte) === 'M') {
						// Spieler langsam nach unten gleiten lassen
						this.posY += this.geschwindigkeit * 0.1; // Anpassen Sie den Faktor nach Bedarf für die gewünschte Geschwindigkeit
						break;
					}
				}
			}
		}
	}

	// bei kollision werden sofort alle healthpoints abgezogen und man stirbt umgehend | code by Luis
	deadly() {
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) ;
		// if bedingung = wenn sich der spieler mit den füßen oder dem kopf auf einem deadlytile befindet dann setze healthpoints auf 0 (=tod) | code by Luis
		if( DEADLY.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 || DEADLY.indexOf(KARTE[ zeile - 1 ].charAt( spalte )) >= 0) {
			healthpoints = 0 ;
		}
	}

	TURRET(dauer) {		
		// position des turrets im level (maximal 1 turret pro level möglich) | code by Luis
		let tSpalte;
		let tZeile;
		// startposition der bullet | code by Luis
		let startPosX;
		let startPosY;	
		// frage ab ob der schuss-cooldown bereits abgelaufen ist | code by Luis
		if(allowShot) {	
			// frage ab ob es überhaupt ein turret im level gibt | code by Luis
			let turretObj = this.CONTAINSTURRET();
			if (turretObj != null && turretObj != undefined) {	
				// weise der variablen ihre werte mit der tile-position des turrets zu | code by Luis			
				tSpalte = turretObj.turretSpalte;
				tZeile = turretObj.turretZeile;
				// Position des Spielers bei Zeitpunkt des Abschusses ist das Ziel | code by Luis
				let endPosX = this.posX ;
				let endPosY = this.posY + 30 ;
				//console.log('endX ' + endPosX + 'endY ' + endPosY + 'playerX ' + this.posX + 'playerY ' + this.posY);
				// wandle tile-position in pixelposition um und setze die turret-position als startposition der bullet | code by Luis
				startPosX = tSpalte * 40 + 10;
				startPosY = tZeile * 40 + 10;
				// Aktuelle Position der Kugel | code by Luis
				let currentPosX = startPosX;
				let currentPosY = startPosY;
				// Zusammenbauen des Kugel-Objekts | code by Luis
				let recentBullet = { startPosY, startPosX, currentPosY, currentPosX, endPosY, endPosX };
				// spawne die kugel | code by Luis
				turretArray.push(recentBullet);
				// aktiviere den 3-sekunden schuss-cooldown nach dem schießen | code by Luis
				allowShot = false;
				setTimeout(() => {
					allowShot = true;
				}, 3000);
			}
		}
		// Die kugel bewegt sich mit der geschwindigkeit von bulletVelocity(px) pro frame | code by Luis
		for (let i = 0; i < turretArray.length; i++) {
			let winkel = Math.tan(Math.abs(turretArray[i].startPosY - turretArray[i].endPosY) / Math.abs(turretArray[i].startPosX - turretArray[i].endPosX)) ;
			// berechne die flugbahn der kugel | code by Luis
			if(turretArray[i].endPosX > turretArray[i].startPosX) {
				winkel = (winkel * -1) + Math.PI;
			}	
			//if(turretArray[i].endPosY > turretArray[i].startPosY) {
			//	winkel = winkel + (Math.PI / 2);
			//}
			turretArray[i].currentPosX -= bulletVelocity * Math.cos(winkel) * dauer;
			turretArray[i].currentPosY -= bulletVelocity * Math.sin(winkel) * dauer;
			// berechne, dass die kugel auf dem ausschnitt ist, und sich deshalb nicht mit dem spieler bewegen darf | code by Luis
			let ausschnittX = this.posX - ausschnitt.width / 2 + this.breite / 2;			
			let ausschnittY = this.posY - ausschnitt.height / 2 + this.hoehe / 2;			
			// definiere die differenz zwischen dem ausschnitt und dem level | code by Luis
			ausschnittX = Math.max(0, Math.min(ausschnittX, level.width - ausschnitt.width));
			ausschnittY = Math.max(0, Math.min(ausschnittY, level.height - ausschnitt.height));
			// zeichne die kugel in den ausschnitt und ziehe die differenz dessen zum level ab | code by Luis
			let bulletStift = ausschnitt.getContext('2d');
			bulletStift.drawImage(this.bullet, turretArray[i].currentPosX - ausschnittX, turretArray[i].currentPosY - ausschnittY);
			// abstand von kugel zu spieler berechnen | code by Luis
			let abstandX = Math.abs((this.posX + this.breite/3) - turretArray[i].currentPosX) ;
			let abstandY = Math.abs((this.posY + this.hoehe/3) - turretArray[i].currentPosY) ;
			// abstand von kugel zu kanone berechnen | code by Luis
			let abstandTurretX = Math.abs(turretArray[i].startPosX - turretArray[i].currentPosX) ;
			let abstandTurretY = Math.abs(turretArray[i].startPosY - turretArray[i].currentPosY) ;			
			// lösche die kugel bei kollision mit spieler, und ziehe healthpoints ab | code by Luis
			if(abstandX < 25 && abstandY < 40) {
				turretArray.splice(i,1);
				healthpoints--;
			}
			// lösche die kugel, sobald sie eine gewisse distanz zurückgelegt hat | code by Luis
			if(abstandTurretX > turretRange || abstandTurretY > turretRange) {
				turretArray.splice(i,1);
			}
		}
	}
	
	// fragt ab, ob in der Map ein Turret vorhanden ist, wenn ja, dann dürfen bullets gespawnt werden | code by Luis
	CONTAINSTURRET() {
		// i steht für jede einzelne zeile der map
		for (let i = 0; i <= 17; i++) {
			let level = KARTE[i];
			if( level.includes(TURRET) ) {
				let turretZeile = i;
				let turretSpalte = KARTE[i].indexOf(TURRET);
				let turretObj = {turretZeile, turretSpalte};
				return turretObj;
			}
		}
	}

	// bei kollision kann man alle 1 sekunden schaden erhalten | code by Luis
	deadlyhit() {
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) ;
		// if bedingung = wenn sich der spieler mit den füßen oder dem kopf auf einem deadlytile befindet dann setze healthpoints auf 0 (=tod) | code by Luis
		if( DEADLYHIT.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 || DEADLY.indexOf(KARTE[ zeile - 1 ].charAt( spalte )) >= 0) {
			if(allowHit === true) {
				healthpoints-- ;
				allowHit = false ;
				setTimeout(() => {
					allowHit = true ;
			    }, 1000);
			}
		}
	}
	// goal function | code by Luis
	passGoal() {
		let spalte = Math.floor( ( this.posX + this.breite*0.5 ) / FELD ) ;
		let zeile = Math.floor( ( this.posY + this.hoehe*0.7 ) / FELD ) ;
		// if bedingung = wenn sich der spieler mit den füßen oder dem kopf auf einem zielblock befindet dann: level abgeschlossen | code by Luis
		if( GOAL.indexOf(KARTE[ zeile ].charAt( spalte )) >= 0 || GOAL.indexOf(KARTE[ zeile - 1 ].charAt( spalte )) >= 0 ) {
			// stoppe level | code by Luis				
			ende = new Date() ;
			// Zeige im win-screen die differenz zwischen initialisieren und abschließen des levels in sekunden an | code by Luis			
			document.getElementById('dauerWin').textContent = 'Zeit: ' + parseInt((ende - anfang) / 1000) + 's' ;
			levelAn = false;	
			// frage das letzte level aus dem localstorage ab | code by Luis
			let LastLevel = window.localStorage.getItem('LastLevel');
			let AusgewaehltesLevel = window.localStorage.getItem('Level');
			// wenn das abgeschlossene level bereits dem maximalen level entspricht wird der "Nächstes Level" button nicht angezeigt | code by Luis
			if(AusgewaehltesLevel == MAXLVL) {
				let next = document.getElementById('nextLvl');
				next.style.display = 'none';
				if(LastLevel < MAXLVL) {
					LastLevel++;
				}
			}
			// andererseits, wenn es nicht das maxlvl war, dann wird das LastLevel um 1 erhöht, insofern dieses level nicht bereits zuvor abgeschlossen wurde | code by Luis
			else if(AusgewaehltesLevel == (parseInt(LastLevel) + 1)) {
				LastLevel++;
			}
			// blende das Win-popup ein und blende die UI aus | code by Luis
			document.getElementById('win').style.display = "block" ;
			document.getElementById('UI').style.visibility = "hidden";
			// speichere das neue LastLevel im localStorage | code by Luis
			window.localStorage.setItem('LastLevel', LastLevel);
		}
	}
	
	// anzeigen | code by Herr. Erkert verändert und erweitert by Luis
	anzeigen() {
        let levelStift = level.getContext('2d');
        // Neue Position des Ausschnitts basierend auf der Position des Characters
        let ausschnittX = this.posX - ausschnitt.width / 2 + this.breite / 2;
        let ausschnittY = this.posY - ausschnitt.height / 2 + this.hoehe / 2;

        // Sobald der ausschnitt die min/max width/height des spielfelds erreicht hat bewegt sich der ausschnitt nicht weiter mit dem character | code by Luis
        ausschnittX = Math.max(0, Math.min(ausschnittX, level.width - ausschnitt.width));
        ausschnittY = Math.max(0, Math.min(ausschnittY, level.height - ausschnitt.height));

        let posChar = levelStift.getImageData(ausschnittX, ausschnittY, ausschnitt.width, ausschnitt.height);
        let ausschnittStift = ausschnitt.getContext('2d');
        ausschnittStift.putImageData(posChar, 0, 0);
        ausschnittStift.strokeStyle = '#ffffff00';
        ausschnittStift.strokeRect(this.posX - ausschnittX, this.posY - ausschnittY, this.breite, this.hoehe);
        ausschnittStift.drawImage(this.sprite, this.frame * this.breite, this.animation * this.hoehe, this.breite, this.hoehe, this.posX - ausschnittX, this.posY - ausschnittY, this.breite, this.hoehe);
    }
	
	// setStats | code by Luis
	setStats() {
		// verändert die physikalischen gegebenheiten in allen wasser-leveln
		if(AusgewaehltesLevel > 10 && AusgewaehltesLevel < 16) {
			this.geschwindigkeit = 150 ;
			this.sprungkraft = 100 ;
			this.fallgeschwindigkeit = 0 ;
			GRAVITATION = 200 ;
		}
	}
}
	
