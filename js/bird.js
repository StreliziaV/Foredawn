// the copter object
var bird = {
	flyTimer:null,//copter's flight timer
	wingTimer:null,//Copter's Wing Swing Timer
	
	div:document.createElement("div"),
	fallSpeed: 0, //copter's falling speed
	showBird:function(parentObj) {
		this.div.style.width = "40px";
		this.div.style.height = "28px";
		this.div.style.backgroundImage = "url(img/bird0.png)";
		this.div.style.backgroundRepeat = "no-repeat";
		this.div.style.position = "absolute";
		this.div.style.left = "50px";
		this.div.style.top = "200px";
		this.div.style.zIndex = "1";
		this.div.id = "bird_in_game";
		this.fallSpeed = 0;
		
		parentObj.appendChild(this.div);  //Insert the copter div variable into the game interface
	},

	flyBird: function(){ //function that controls the flying and falling of the copter
		bird.flyTimer = setInterval(fly,40);
		var win_pic = ["url(img/bird0.png)", "url(img/bird1.png)"];
		var win_ind = 0;
		function fly() {
			bird.div.style.top = bird.div.offsetTop + bird.fallSpeed++ + "px";
			if (bird.div.offsetTop < 0) {  
				bird.fallSpeed = 2; //This is used to control the copter not to fly out of the interface
			}
			if (bird.div.offsetTop >= 395) {
				bird.fallSpeed = 0;
				clearInterval(bird.flyTimer); //Once on the ground, clear the timer, end game
				clearInterval(bird.wingTimer); //clear copter's flight timer
			}
			if (bird.fallSpeed > 12) {
				bird.fallSpeed = 12;  //The maximum falling speed of the copter is controlled at 12
			}
		
			if (score >= fly_win_score) {
				bird.fallSpeed = 0
				clearInterval(bird.wingTimer);
				bird.div.style.backgroundImage = win_pic[win_ind];
				bird.div.style.left = bird.div.offsetLeft + 10 + "px";
				win_ind++;
				if (win_ind == 2) win_ind = 0;
				if (bird.div.offsetLeft >= 343) window.clearInterval(bird.flyTimer);
			}
		}
	},
	
	wingWave: function() { //The function that controls the animation of the copter
		var up = ["url(img/up_bird0.png)", "url(img/up_bird1.png)"];
		var down = ["url(img/down_bird0.png)", "url(img/down_bird1.png)"];
		var i = 0, j = 0;
		bird.wingTimer = setInterval(wing,120);
		function wing() {
			if (bird.fallSpeed > 0) {
				bird.div.style.backgroundImage = down[i++];
				if (i==2) {i = 0}
			}if (bird.fallSpeed < 0) {
				bird.div.style.backgroundImage = up[j++];
				if (j==2) {j = 0}
			}
		}
	},	

	//used when restart the game
	removeBird() {
		var my_bird = document.getElementById("bird_in_game");
		my_bird.remove();
	}
};
