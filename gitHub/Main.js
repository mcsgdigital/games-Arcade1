var canvas;
var W,H;
var container;
var queue;

var gameTitle;
var panel, btn_ok, menu_btn_ok;
var panelResult;
var bg0;
var foreground;
var targets;
var isChallengeReady;
var bullets, btn_reload; 
var crosshair, crosshairFire;
var targetsHolder;
var txtScore, txtTimer;
var challengeTime;
var interfaceContainer;
var bgChallenges, challenges, challengesArray;

var tweensArray;
var challengeSelected;
var score;

var firstTimePlayed = true;

var nbrOfTargets, nbrOfTargetsHit, onScreenTargets;
var objectives;

window.onload = function init() {
		
        getGameData();
		if(firstTimePlayed){
			//setInitialData();
		}
		
		preloadImages();
}

function preloadImages() {
	
	queue = new createjs.LoadQueue(false);
    createjs.Sound.alternateExtensions = ["mp3"];
	queue.installPlugin(createjs.Sound);
	queue.on("complete", handleFileComplete);
    //BACKGROUNDS
	queue.loadFile({id: "bg0", src:"assets/images/bg0.jpg"});
	queue.loadFile({id: "bg1", src:"assets/images/bg1.jpg"});
	queue.loadFile({id: "bgChallenges", src:"assets/images/bg2.jpg"});
    
    //FOREGROUND
	queue.loadFile({id: "fg1", src:"assets/images/obj_roller1.png"});
	queue.loadFile({id: "wave1", src:"assets/images/wave1.png"});
	queue.loadFile({id: "wave2", src:"assets/images/wave2.png"});
	queue.loadFile({id: "wave3", src:"assets/images/wave3.png"});
    
    //TARGETS
	queue.loadFile({id: "target1", src:"assets/images/target_duck.png"});
	queue.loadFile({id: "target2", src:"assets/images/target_fish.png"});
    
    //BUTTONS AND ICONS
	queue.loadFile({id: "btn_ok", src:"assets/images/OkButton.png"});
	queue.loadFile({id: "btn_reload", src:"assets/images/reload.png"});
	queue.loadFile({id: "icon_timer", src:"assets/images/icon_timer.png"});
	queue.loadFile({id: "icon_timer_pt2", src:"assets/images/icon_timer_pt2.png"});
	queue.loadFile({id: "icon_restart", src:"assets/images/icon_restart.png"});
	queue.loadFile({id: "icon_back", src:"assets/images/icon_back.png"});
	queue.loadFile({id: "icon_home", src:"assets/images/icon_home.png"});
	queue.loadFile({id: "icon_challengeLocked", src:"assets/images/icon_challengeLocked.png"});
	queue.loadFile({id: "icon_challenge1", src:"assets/images/icon_challenge1.png"});
	queue.loadFile({id: "icon_challenge2", src:"assets/images/icon_challenge2.png"});
	queue.loadFile({id: "icon_challengeBossLocked", src:"assets/images/icon_challengeBossLocked.png"});
	queue.loadFile({id: "icon_challengeBoss", src:"assets/images/icon_challengeBoss.png"});
    
    //OTHERS
    queue.loadFile({id: "bullet1", src:"assets/images/bullet.png"});
	queue.loadFile({id: "crosshair", src:"assets/images/obj_crosshair1.png"});
	queue.loadFile({id: "crosshairFire", src:"assets/images/obj_crosshair1FIRE.png"});
	queue.loadFile({id: "panel", src:"assets/images/panel.png"});
	queue.loadFile({id: "resultPanel", src:"assets/images/resultPanel.jpg"});
    queue.loadFile({id: "star", src:"assets/images/star.png"});
    
    //SOUNDS
    queue.loadFile({id: "sound_user1", src:"assets/sounds/rifle_shot.wav"});
	queue.loadFile({id: "sound_target1", src:"assets/sounds/groan.mp3"});
	queue.loadFile({id: "sound_result", src:"assets/sounds/clang.mp3"});

}

function handleFileComplete(event) {
	console.log("Images load complete.");
	
	canvas = new createjs.Stage("canvas");
	
    canvas.autoclear = true;
	if( createjs.Touch.isSupported() )
	{
		createjs.Touch.enable( canvas );
	}else{
		canvas.enableMouseOver();
	}
	
	W = window.document.getElementById('canvas').width;
	H = window.document.getElementById('canvas').height;
	
    isChallengeReady = false;
    score = 0;
    
	setup();
    
    
}


function setup(){
	

	//SCENERY background
	bg0 = new createjs.Bitmap(queue.getResult("bg0"));
	canvas.addChild(bg0);
  
    menu_btn_ok = new createjs.Container();
    var btn_okImage = new createjs.Bitmap(queue.getResult("btn_ok"));
	menu_btn_ok.addChild(btn_okImage);
	canvas.addChild(menu_btn_ok);
    
    var rect = new createjs.Shape();
	rect.graphics.beginFill('#ff0').dr(0, 0, 300, 90);
	menu_btn_ok.addChild(rect);
	rect.alpha = 0.01;
    
    menu_btn_ok.regX = 150;
    menu_btn_ok.regY = 45;
    menu_btn_ok.scaleX = menu_btn_ok.scaleY = .5;
    menu_btn_ok.x = W /2;
    menu_btn_ok.y = H /2;
    menu_btn_ok.setBounds(-75, -45, 75, 45);
    menu_btn_ok.hitArea  = rect;
    menu_btn_ok.cursor = 'pointer';
    
    menu_btn_ok.addEventListener('click', function(){
        menu_btn_ok.removeEventListener('click', this);
        canvas.removeChild(menu_btn_ok);
        canvas.removeChild(bg0);
        
        createChallengesScreen();
    });
    
    
    container = new createjs.Container();
	canvas.addChild(container);
    
	
	//create category title
    /*gameTitle = new createjs.Container();
    container.addChild(gameTitle);
    
	var bg_txt = new createjs.Shape();
	bg_txt.graphics.beginFill('#6e7e8e').drawRoundRect(150, 10, 250, 40,10,10,10,10);
	gameTitle.addChild(bg_txt);
	
	var txt = new createjs.Text();
	gameTitle.addChild(txt);
	txt.set({
		text: "What's the quack",
		font: '30px comic1',
		color: '#fff',
		textAlign: 'center'
	});
	txt.x = 275;
	txt.y = 10;*/
	
    
    //createInterface();
	
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick(event) {
	if (!event.paused) {
		if(isChallengeReady){
            updateChallenge();
            updateTimer();
            
            crosshair.x = canvas.mouseX;
            crosshair.y = canvas.mouseY;
        }
        
		canvas.update();
	}
}





