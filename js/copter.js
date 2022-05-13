var jsWrapBg = document.getElementById("wrapBg");
var jsHeadTitle = document.getElementById("headTitle");
var jsHeadBird = document.getElementById("headBird"); // get copter in the beginning title
var blocksArr = [];  //used to save the block obstacles
var blockDistance = baseObj.randomNum(120,350);
function clear_blocks() {
    var blocks = document.getElementsByClassName("block_in_game");
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.display = 'none';
        blocks[i].remove();
    }
}

// get the score display element
var jsScore = document.getElementById("score");
var jsNum1 = document.getElementById("num1");
var jsNum2 = document.getElementById("num2");
var jsNum3 = document.getElementById("num3");
var score = 0;
const fly_win_score = 5;

var jsGameOver = document.getElementById("gameOver");
var jsOkBtn = document.getElementById("ok");

//win control
var fly_win = document.getElementById("fly_win");
var fly_continue = document.getElementById("fly_continue");

//monster controler
var jsc_monster = document.getElementById("c_monster");
var jsmy_monster = document.getElementById("my_monster");
var monster_index = 0;
var monster_imgArr = ["img/c_monster1.png","img/c_monster2.png"];
var monster_wave = null;
function monster_w() {
    jsmy_monster.src = monster_imgArr[monster_index++];
    if (monster_index == 2) monster_index = 0;
}
var target = null;
var target_x = 0;
var target_y = 0;
var monster_catch_timer = null;
var distance_x = 0;
var distance_y = 0;
// monster start to catch the falled helicopter
function monster_catch() {
    if (jsc_monster.offsetTop < 370) {
        jsc_monster.style.top = jsc_monster.offsetTop + 0.05 * distance_y + "px";
        jsc_monster.style.left = jsc_monster.offsetLeft + 0.05 * distance_x + "px";
    }
    else {
        window.clearInterval(monster_catch_timer);
        window.clearInterval(monster_wave);//clear monster timer
    }
}
// monster will fade out if the helicopter escape successfully
var monster_lose_move = null;
function monster_lose() {
    if (jsc_monster.offsetLeft > distance_x) {
        jsc_monster.style.left = jsc_monster.offsetLeft + 0.05 * distance_x + "px";
        console.log(0);
    }
    else {
        window.clearInterval(monster_lose_move);
        console.log(1);
    }
}
// used to recover the monster's position, mainly used in game restart
function recover_monster() {
    jsc_monster.style.top = 0 + "px";
    jsc_monster.style.left = 0 + "px";
    jsc_monster.style.display = "none";
    distance_x = 0;
    distance_y = 0;
}

var Y = 3;
var index = 0;
var imgArr = ["img/bird0.png","img/bird1.png"] 
//Put the copter's image path into an array, and use the principle of frame animation to make the copter's propeller to rotate
var headWaveTimer = setInterval(headWave,200); //header wave timer
function headWave() {
    Y *= -1;
    jsHeadTitle.style.top = jsHeadTitle.offsetTop + Y + "px";
    jsHeadBird.src = imgArr[index++];
    if (index == 2) {
        index = 0;
    }
}

var jsGrassLand1 = document.getElementById("grassLand1"); //get grassland 1
var jsGrassLand2 = document.getElementById("grassLand2"); //get grassland 2

var landTimer = setInterval(landRun,30); //timer for land and obstacles moving
var passed_blocks = 1;
function landRun() {
    if (jsGrassLand1.offsetLeft <= -343) {
        jsGrassLand1.style.left = "343px";
    }
    if (jsGrassLand2.offsetLeft <= -343) {
        jsGrassLand2.style.left = "343px";
    }
    jsGrassLand1.style.left = jsGrassLand1.offsetLeft - 3 + "px";
    jsGrassLand2.style.left = jsGrassLand2.offsetLeft - 3 + "px";
    
    if (blocksArr.length) {
        for (var i = 0; i < blocksArr.length; i++) {
            blocksArr[i].moveBlock();
            var x =baseObj.rectangleCrashExamine(blocksArr[i].downDivWrap, bird.div);
            var y = baseObj.rectangleCrashExamine(blocksArr[i].upDivWrap, bird.div);
            var z = bird.div.offsetTop >= 390;
            if (x || y || z) {
                window.clearInterval(landTimer);//clear land move timer
                bird.fallSpeed = 0; //the copter falls
                jsWrapBg.onclick = null; //clear clicking event
                jsScore.style.display = "none"; //hide score display

                //monster catch the copter successfully, player lose
                distance_x = 50 - jsc_monster.offsetLeft;
                distance_y = 370 - jsc_monster.offsetTop;
                setTimeout("monster_catch_timer = setInterval(monster_catch, 30)", 20);

                setTimeout("jsGameOver.style.display = \"block\"", 1500); // display gameover
                clear_blocks();
                clear_blocks();
            }
        }
        if (blocksArr[blocksArr.length - 1].downDivWrap.offsetLeft < (450 - blockDistance) && passed_blocks < fly_win_score) {
                blockDistance = baseObj.randomNum(130,250);
                var newBlock = new Block();
                newBlock.createBlock();
                blocksArr.push(newBlock);
                passed_blocks++;
        }
        
        if (blocksArr[0].downDivWrap.offsetLeft == -12) {
                score++;//score plus one
                if (score < 10) {
                    jsNum1.style.backgroundImage = "url(img/" + score + ".jpg)";
                } else if (score < 100) {
                    jsNum2.style.display = "block";
                    jsNum1.style.backgroundImage = "url(img/" + parseInt(score/10) + ".jpg)";
                    jsNum2.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
                } else if (score < 1000) {
                    jsNum3.style.display = "block";
                    jsNum1.style.backgroundImage = "url(img/" + parseInt(score/100) + ".jpg)";
                    jsNum2.style.backgroundImage = "url(img/" + parseInt(score/10)%10 + ".jpg)";
                    jsNum3.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
                }
        }
        
        if (blocksArr[0].downDivWrap.offsetLeft < -50) {
                jsWrapBg.removeChild(blocksArr[0].downDivWrap);
                jsWrapBg.removeChild(blocksArr[0].upDivWrap);
                blocksArr.shift(blocksArr[0]);
        }
    }

    // if score larger or equals to the winning score, stop game, clear obstacles, fade monster, the helicopter escape, display winning information
    //also need to reset game
    if (score >= fly_win_score) {
        distance_x = -40;
        window.clearInterval(landTimer); //clear landTimer
        //monster lose
        monster_lose_move = window.setInterval(monster_lose, 50);
        setTimeout("window.clearInterval(monster_lose_move);", 5000)
        jsWrapBg.onclick = null; //clear mouse click event

        clear_blocks();
        clear_blocks();

        //reset game, hide game, display scenes
        fly_continue.onclick = function () {
            score = 0;
            jsWrapBg.style.display = "none";
            bird.removeBird();
            clear_blocks();
            blocksArr = [];

            jsGameOver.style.display = 'none';
            jsHeadTitle.style.display = 'block';
            headWaveTimer = setInterval(headWave,200);
            jsGameOver.style.display = 'none';

            //recover monster
            recover_monster();

            //restart game
            fly_win.style.display = "none";
            jsStartBtn.style.display = "block";
            landTimer = setInterval(landRun,30);

            jsWrapBg.style.display = "none";
            document.getElementById("chatBox").style.display = "block";
            currentScene = graph[currentScene];
            display(currentScene);
        }
        setTimeout("fly_win.style.display = \"block\"", 3000);
    }
}

// the function for start game
//click the start button to enter the mini game
var jsStartBtn = document.getElementById("startBtn");
jsStartBtn.onclick = function() { //add onclick event for start button
    clearInterval(landTimer);
    landTimer = setInterval(landRun,30);
    jsGrassLand2.style.left = 343 + "px";
    jsGrassLand1.style.left = 0 + "px";

    //stop header
    fly_win.style.display = "none";
    jsHeadTitle.style.display = "none"; //hide header
    clearInterval(headWaveTimer); //stop header's timer
    jsStartBtn.style.display = "none"; //hide start button

    //start game
    bird.showBird(jsWrapBg); //insert copter
    bird.flyBird(); //control of the copter
    bird.wingWave(); //copter's animation
    bird.fallSpeed = 0;
    jsWrapBg.onclick = function(){
        bird.fallSpeed = -8;
    };
    var b = new Block();
    b.createBlock();		
    blocksArr.push(b);
    jsNum1.style.display = "block";
    jsNum2.style.display = "none";
    jsNum3.style.display = "none";
    passed_blocks = 1;

    score = 0;
    jsScore.style.display = 'block';
    jsNum1.style.backgroundImage = "url(img/" + score + ".jpg)";
    jsNum2.style.backgroundImage = "url(img/" + score + ".jpg)";
    jsNum3.style.backgroundImage = "url(img/" + score + ".jpg)";

    //recover monster
    window.clearInterval(monster_wave);
    jsc_monster.style.display = "block";
    monster_wave = setInterval(monster_w,200);
}

// the OK button will reset the the mini-game to initial state
jsOkBtn.onclick = function() {
    bird.removeBird();
    clear_blocks();
    blocksArr = [];

    jsGameOver.style.display = 'none';
    jsHeadTitle.style.display = 'block';
    headWaveTimer = setInterval(headWave,200);
    jsGameOver.style.display = 'none';

    //recover monster
    recover_monster();
    window.clearInterval(monster_wave);

    //restart game
    jsStartBtn.style.display = "block";
    landTimer = setInterval(landRun,30);
}
		