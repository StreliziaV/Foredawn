// Global variables
var getBody = document.body;

var someScenes = [0, 16, 20, 27, 40, 48, 72, 77, 91, 92, 94];  // scenes with achievement

// display the nth scene
function display(n) {
    // display achievement
    if (someScenes.indexOf(n) != -1) {
        var achievement = document.getElementById('achievement');
        achievement.innerHTML = 'New Achievement:<br>';
        switch (n) {
            case 0:
                achievement.innerHTML += 'Hello, World!';
                break;
            case 16:
                achievement.innerHTML += 'Pants Pisser';
                break;
            case 20:
                achievement.innerHTML += 'That\'s it?';
                break;
            case 27:
                achievement.innerHTML += 'Show off';
                break;
            case 40:
                achievement.innerHTML += 'Curious Baby';
                break;
            case 48:
                achievement.innerHTML += 'Not a cat';
                break;
            case 72:
                achievement.innerHTML += 'Language?';
                break;
            case 77:
                achievement.innerHTML += 'Rookie of the Year';
                break;
            case 91:
                achievement.innerHTML += 'Where to go?';
                break;
            case 92:
                achievement.innerHTML += 'Don\'t eat me!';
                break;
            case 94:
                achievement.innerHTML += 'Law of Karma';
                break;
        }
        achievement.style.display = 'block';
        setTimeout('achievement.style.display = \'none\'', 2500);  // the achievement lasts for 2.5 seconds
    }
    // display background image
    getBody.style.backgroundImage = 'url(' + dic2[scenes[n].scene] + ')';
    getBody.style.backgroundSize = '100%';
    // display conversation, but first check whether the current scene is a minigame
    if (scenes[n].name == 'Game') {
        if (scenes[n].text == 'Fly Bird') {
            fly_bird();  // launch minigame1
        } else if (scenes[n].text == 'Your Name') {
            enter_name();
        } else if (scenes[n].text == 'Treasure Hunter') {
            clearScreen();
            start();  // launch minigame2
        }
    } else {
        if (n == 47 || n == 53) hasRing = 1;  // "ring" is a key item, player can get it in these two scenes
        var name = document.getElementById('name');
        var text = document.getElementById('text');
        var triangle = document.getElementById('triangle');
        var choice1 = document.getElementById('choice1');
        var choice2 = document.getElementById('choice2');
        var choice3 = document.getElementById('choice3');
        // check whether the current speaker is the same as the previous one, if yes, no need to update his/her image
        if (name.innerHTML != scenes[n].name) {
            name.innerHTML = scenes[n].name;
            var profile = document.getElementById('profile');
            profile.style.background = 'url(' + dic[name.innerHTML] + ')';
            profile.style.backgroundSize = '100%';
        }
        // check whether the speaker's words contain the player's name, since this name is given uniquely by each player earlier
        if (typeof scenes[n].text != 'object') {
            text.innerHTML = scenes[n].text;
        } else {  // if yes, the global variable "me" comes into use, which stores the player's name
            text.innerHTML = '';
            for (var i = 0; i < scenes[n].text.length; i++) {
                if (scenes[n].text[i] != undefined) {
                    text.innerHTML += scenes[n].text[i];
                } else {
                    text.innerHTML += me;
                }
            }
        }
        // check whether there are choices in the current scene
        if (scenes[n].choices == undefined) {  // if no, the three choice buttons will be hidden
            triangle.style.display = 'block';
            choice1.style.display = 'none';
            choice2.style.display = 'none';
            choice3.style.display = 'none';
        } else {  // if yes, the corresponding choice buttons will be displayed
            triangle.style.display = 'none';
            switch (scenes[n].choices.length) {
                case 1:
                    choice1.innerHTML = scenes[n].choices[0];
                    choice1.style.display = 'block';
                    choice2.style.display = 'none';
                    choice3.style.display = 'none';
                    break;
                case 2:
                    choice1.innerHTML = scenes[n].choices[0];
                    choice2.innerHTML = scenes[n].choices[1];
                    choice1.style.display = 'block';
                    choice2.style.display = 'block';
                    choice3.style.display = 'none';
                    break;
                case 3:
                    choice1.innerHTML = scenes[n].choices[0];
                    choice2.innerHTML = scenes[n].choices[1];
                    choice3.innerHTML = scenes[n].choices[2];
                    choice1.style.display = 'block';
                    choice2.style.display = 'block';
                    choice3.style.display = 'block';
                    break;
            }
        }
    }
}

// New Game button
starter.children[0].addEventListener('click', function() {
    starter.style.display = 'none';
    recoverScreen();
    currentScene = 0;
    hasRing = 0;
    display(currentScene);
})
// Load Game button
starter.children[1].addEventListener('click', function() {
    starter.style.display = 'none';
    load();
})

// hide the conversation box
function clearScreen() {
    chatBox.style.display = 'none';
}

// display the conversation box
function recoverScreen() {
    chatBox.style.display = 'block';
}

// minigame 1: "escape"
function fly_bird() {
    clearScreen();
    var wrapBg = document.getElementById('wrapBg');
    wrapBg.style.display = 'block';
}

// ask player for a name of the main character
function enter_name() {
    clearScreen();
    yourNameBox.style.display = 'block';
}

// Player information
var me;  // name of the main character
var currentScene;  // the current scene
var hasRing;  // a flag for "ring" which will play a role later

// Saved records, we limit the number of records to be 10
// store currentScene
var saved = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
]
// store me
var saved2 = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
]
// store hasRing
var saved3 = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
]

// HTML5 elements
var textBox = document.getElementById('textBox');
var button1 = document.getElementById('choice1');
var button2 = document.getElementById('choice2');
var button3 = document.getElementById('choice3');
var saveButton = document.getElementById('save');
var loadButton = document.getElementById('load');
var saveBox = document.getElementById('saveBox');
var backButton = document.getElementById('back');
var cross = document.getElementById('x1');
var location1 = document.getElementById('location1');
var location2 = document.getElementById('location2');
var location3 = document.getElementById('location3');
var location4 = document.getElementById('location4');
var location5 = document.getElementById('location5');
var location6 = document.getElementById('location6');
var location7 = document.getElementById('location7');
var location8 = document.getElementById('location8');
var location9 = document.getElementById('location9');
var location10 = document.getElementById('location10');
var yourNameBox = document.getElementById('yourNameBox');
var button4 = document.getElementById('go');

// click the conversation box to continue
textBox.onclick = function() {
    if (typeof graph[currentScene] == "number") {
        currentScene = graph[currentScene];
        display(currentScene);
    } else if (typeof graph[currentScene] == "undefined") {
        if (hasRing == 0) {
            currentScene = 87;
        } else {
            currentScene = 88;
        }
        display(currentScene);
    }
}

// click choice button to respond
button1.onclick = function() {
    if (typeof graph[currentScene] == "object") {
        currentScene = graph[currentScene][0];
        display(currentScene);
    }
}
button2.onclick = function() {
    if (typeof graph[currentScene] == "object") {
        currentScene = graph[currentScene][1];
        display(currentScene);
    }
}
button3.onclick = function() {
    if (typeof graph[currentScene] == "object") {
        currentScene = graph[currentScene][2];
        display(currentScene);
    }
}

// mode = "save" or "load"
var mode;

// load saved records
function load() {
    clearScreen();
    mode = 'load';
    saveBox.style.display = 'block';
}
loadButton.onclick = function() {
    load();
}

// save a record
saveButton.onclick = function() {
    mode = 'save';
    saveBox.style.display = 'block';
}

// stop the "save" or "load" operation
cross.onclick = function() {
    saveBox.style.display = 'none';
    if (currentScene == undefined) {
        starter.style.display = 'flex';
    } else {
        recoverScreen();
    }
}

// go back to the main menu
backButton.onclick = function() {
    clearScreen();
    starter.style.display = 'flex';
}

// save or load a specific record, there are totally 10 locations
location1.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[0] = currentScene;
        saved2[0] = hasRing;
        saved3[0] = me;
        save_data(1, saved[0], this.innerHTML, saved2[0], saved3[0]);
    } else {  // mode == 'load'
        if (saved[0] != undefined) {
            recoverScreen();
            currentScene = saved[0];
            hasRing = saved2[0];
            me = saved3[0];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location2.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[1] = currentScene;
        saved2[1] = hasRing;
        saved3[1] = me;
        save_data(2, saved[1], this.innerHTML, saved2[1], saved3[1]);
    } else {
        if (saved[1] != undefined) {
            recoverScreen();
            currentScene = saved[1];
            hasRing = saved2[1];
            me = saved3[1];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location3.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[2] = currentScene;
        saved2[2] = hasRing;
        saved3[2] = me;
        save_data(3, saved[2], this.innerHTML, saved2[2], saved3[2]);
    } else {
        if (saved[2] != undefined) {
            recoverScreen();
            currentScene = saved[2];
            hasRing = saved2[2];
            me = saved3[2];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location4.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[3] = currentScene;
        saved2[3] = hasRing;
        saved3[3] = me;
        save_data(4, saved[3], this.innerHTML, saved2[3], saved3[3]);
    } else {
        if (saved[3] != undefined) {
            recoverScreen();
            currentScene = saved[3];
            hasRing = saved2[3];
            me = saved3[3];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location5.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[4] = currentScene;
        saved2[4] = hasRing;
        saved3[4] = me;
        save_data(5, saved[4], this.innerHTML, saved2[4], saved3[4]);
    } else {
        if (saved[4] != undefined) {
            recoverScreen();
            currentScene = saved[4];
            hasRing = saved2[4];
            me = saved3[4];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location6.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[5] = currentScene;
        saved2[5] = hasRing;
        saved3[5] = me;
        save_data(6, saved[5], this.innerHTML, saved2[5], saved3[5]);
    } else {
        if (saved[5] != undefined) {
            recoverScreen();
            currentScene = saved[5];
            hasRing = saved2[5];
            me = saved3[5];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location7.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[6] = currentScene;
        saved2[6] = hasRing;
        saved3[6] = me;
        save_data(7, saved[6], this.innerHTML, saved2[6], saved3[6]);
    } else {
        if (saved[6] != undefined) {
            recoverScreen();
            currentScene = saved[6];
            hasRing = saved2[6];
            me = saved3[6];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location8.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[7] = currentScene;
        saved2[7] = hasRing;
        saved3[7] = me;
        save_data(8, saved[7], this.innerHTML, saved2[7], saved3[7]);
    } else {
        if (saved[7] != undefined) {
            recoverScreen();
            currentScene = saved[7];
            hasRing = saved2[7];
            me = saved3[7];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location9.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[8] = currentScene;
        saved2[8] = hasRing;
        saved3[8] = me;
        save_data(9, saved[8], this.innerHTML, saved2[8], saved3[8]);
    } else {
        if (saved[8] != undefined) {
            recoverScreen();
            currentScene = saved[8];
            hasRing = saved2[8];
            me = saved3[8];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}
location10.onclick = function() {
    if (mode == 'save') {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        if (me == undefined) {
            this.innerHTML = scenes[currentScene].heading + ' ' + dateTime;
        } else {
            this.innerHTML = me + ': ' + scenes[currentScene].heading + ' ' + dateTime;
        }
        saved[9] = currentScene;
        saved2[9] = hasRing;
        saved3[9] = me;
        save_data(10, saved[9], this.innerHTML, saved2[9], saved3[9]);
    } else {
        if (saved[9] != undefined) {
            recoverScreen();
            currentScene = saved[9];
            hasRing = saved2[9];
            me = saved3[9];
            display(currentScene);
            saveBox.style.display = 'none';
        }
    }
}

// used to adjust the name the player gives the main character
button4.onclick = function() {
    var yourName = document.getElementById('yourName');
    var temp = yourName.value;
    var finishCheck = false;
    while (!finishCheck) {
        if (temp.length <= 1) {
            if (temp == '') {
                temp = 'Mr. Nobody';
            } else if (temp == ' ') {
                temp = 'Mr. Space';
            } else {
                temp = 'Mr. ' + temp;
            }
            finishCheck = true;
        } else {
            // remove redundant ' ' in the name, e.g. "  James   Harden  " becomes "James Harden"
            for (var i = 0; i < temp.length; i++) {
                if (temp[i] == ' ') {
                    if (i == 0) {
                        temp = temp.substring(1);
                        break;
                    } else if (i == temp.length - 1) {
                        temp = temp.substring(0, i);
                        break;
                    } else {
                        if (temp[i + 1] == ' ') {
                            temp = temp.substring(0, i) + temp.substring(i + 1);
                            break;
                        } else {
                            continue;
                        }
                    }
                } else {
                    if (i == temp.length - 1) finishCheck = true;
                }
            }
        }
    }
    // we limit the maximum length of the name to be 16
    if (temp.length > 16) {
        if (temp[15] == ' ') {
            me = temp.substring(0, 15);
        } else {
            me = temp.substring(0, 16);
        }
    } else {
        me = temp;
    }
    yourNameBox.style.display = 'none';
    recoverScreen();
    currentScene = graph[currentScene];
    display(currentScene);
}
