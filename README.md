# Ahzos
Since the game is not running on the browser directly due to JavaScript-Canvas security measures, the game requires a server to be displayed correctly.

# How to Play
Within this repository there is a xampp server, in order to play the game you will need to follow the instructions below:

1. Download the repository.
2. Put the "xampp" folder onto your main disc (put it directly into the disk folder, NOT on the desktop/user/downloads etc.), discs are usually named "C:", "D:", "E:", etc.
3. Open the xampp folder and execute "xampp_control.exe".
4. Once the Control Panel has opened, press the "Start" Button next to "Apache".
5. Open your browser and type "localhost/webspace/jumprun_2023/index.html".
6. Here you go, enjoy the game!

# Controls
A - Walk Left
D - Walk Right
Space - Jump
Shift - Sprint
W - Climb Ladder Up
S - Climb Ladder Down

# Cheatcodes
To unlock all levels, simply run following code in the console of your xampp control panel:

window.localStorage.setItem('LastLevel', 25); window.location.reload();