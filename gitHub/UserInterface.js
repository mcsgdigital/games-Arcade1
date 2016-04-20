

function createInterface(){
    interfaceContainer = new createjs.Container();
    canvas.addChild(interfaceContainer);
    
    bullets = [];
    
    createTextCounters();
    
    
    
    
    //reload
    btn_reload = new createjs.Bitmap(queue.getResult("btn_reload"));
	container.addChild(btn_reload);
    btn_reload.alpha = 0;
    btn_reload.regX = 35;
    btn_reload.regY = 35;
    btn_reload.x = W * 0.9;
    btn_reload.y = H * 0.8;
    
    //SCENERY FOREGROUND
    crosshair = new createjs.Container();
    var crosshairImage = new createjs.Bitmap(queue.getResult("crosshair"));
	crosshair.addChild(crosshairImage);
	container.addChild(crosshair);
    crosshair.regX = 25;
    crosshair.regY = 25;
    crosshair.alpha = 0;
    
    crosshairFIRE = new createjs.Bitmap(queue.getResult("crosshairFire"));
	container.addChild(crosshairFIRE);
    crosshairFIRE.regX = 25;
    crosshairFIRE.regY = 25;
    crosshairFIRE.alpha = 0;
    
    
    //window.onkeypress = checkKey;
    window.addEventListener("keydown", checkKey);
        
}

function createTextCounters(){
    //targets hit against total targets
    txtScore = new createjs.Text();
	interfaceContainer.addChild(txtScore);
	txtScore.set({
		text: nbrOfTargetsHit +'/'+ nbrOfTargets[challengeSelected],
		font: '34px comic1',
		color: '#ff0',
		textAlign: 'right'
	});
	txtScore.x = W * 0.95;
	txtScore.y = 10;
    //txtScore.alpha = 0;
    
    //timer icon
    var iconTimer = new createjs.Bitmap(queue.getResult("icon_timer"));
	interfaceContainer.addChild(iconTimer);
    //iconTimer.alpha = 0;
    iconTimer.regX = 75;
    iconTimer.regY = 25;
    iconTimer.x = W /2;
    iconTimer.y = 30;
    
    //timer counter for current challenge
    txtTimer = new createjs.Text();
	interfaceContainer.addChild(txtTimer);
	txtTimer.set({
		text: challengeTime,
		font: '34px comic1',
		color: '#00f',
		textAlign: 'center'
	});
	txtTimer.x = W /2 +20;
	txtTimer.y = 10;
	//txtTimer.alpha = 0;
    
    //timer icon light
    var iconTimer_pt2 = new createjs.Bitmap(queue.getResult("icon_timer_pt2"));
	interfaceContainer.addChild(iconTimer_pt2);
    iconTimer_pt2.regX = iconTimer.regX;
    iconTimer_pt2.regY = iconTimer.regY;
    iconTimer_pt2.x = iconTimer.x;
    iconTimer_pt2.y = iconTimer.y;
}


function checkKey(e){
    e = e || window.event;
    
    //console.log(e.which);
    
    if(e.which == 32){
        fillBullets();
    }
}

function closePanel(){
    TweenLite.to(panel, .5, {x: -500, ease: Back.easeIn});
}

function fillBullets(){
    while(bullets.length > 0){
        container.removeChild(bullets[bullets.length -1]);
        bullets.pop();
    }
    
    for(var i=0; i < 5;i++){
        var bullet1 = new createjs.Bitmap(queue.getResult("bullet1"));
        container.addChildAt(bullet1,container.numChildren -1);
        bullet1.regX= 10;
        bullet1.regY= 30;
        bullet1.x = 25 +(i * 25);
        bullet1.y = H - 75;
        bullet1.scaleX = bullet1.scaleY = 0;
        //bullet1.alpha = 0;
        TweenLite.to(bullet1, .5, {delay: i/10, scaleX: 1, scaleY: 1, ease: Back.easeOut});
        bullets.push(bullet1);
    }
}

function removeBullet(){
    if(bullets.length > 0){
        container.removeChild(bullets[bullets.length -1]);
        bullets.pop();
    }
}

function createPanelObjective(){
    //PANEL
    panel = new createjs.Container();
    container.addChild(panel);
    panel.x = W/2;
    panel.y = H/2;
    
    panelImage = new createjs.Bitmap(queue.getResult("panel"));
	panel.addChild(panelImage);
    panelImage.regX = 150;
    panelImage.regY = 75;
    
    
    var txtObjTitle = new createjs.Text();
	panel.addChild(txtObjTitle);
	txtObjTitle.set({
		text: 'Objective',
		font: '22px comic1',
		color: '#ff0',
		textAlign: 'center'
	});
	txtObjTitle.x = 0;
	txtObjTitle.y = -60;
    
    var bg_txt = new createjs.Shape();
	bg_txt.graphics.beginFill('#000000').drawRoundRect(-125, -35, 250, 40,10,10,10,10);
	panel.addChild(bg_txt);
    
    var txtObjective = new createjs.Text();
	panel.addChild(txtObjective);
	txtObjective.set({
		text: objectives,
		font: '18px comic1',
		color: '#fff',
		textAlign: 'center'
	});
	txtObjective.x = 0;
	txtObjective.y = -30;
    
    
    btn_ok = new createjs.Container();
    var btn_okImage = new createjs.Bitmap(queue.getResult("btn_ok"));
	btn_ok.addChild(btn_okImage);
	panel.addChild(btn_ok);
    
    var rect = new createjs.Shape();
	rect.graphics.beginFill('#ff0').dr(0, 0, 300, 90);
	btn_ok.addChild(rect);
	rect.alpha = 0.01;
    
    btn_ok.regX = 150;
    btn_ok.regY = 45;
    btn_ok.scaleX = btn_ok.scaleY = .5;
    btn_ok.x = 0;
    btn_ok.y = 30;
    btn_ok.setBounds(-75, -45, 75, 45);
    btn_ok.hitArea  = rect;
    btn_ok.cursor = 'pointer';
    
    btn_ok.addEventListener('click', function(){
        closePanel();
        openGame();
    });
}

function createPanelResult(){
    //Darken background
    var bg_result = new createjs.Shape();
	bg_result.graphics.beginFill('#000000').drawRect(0, 0, W, H);
	container.addChild(bg_result);
    bg_result.alpha = .75;
    
    //Result PANEL
    panelResult = new createjs.Container();
    container.addChild(panelResult);
    panelResult.regX = 140;
    panelResult.regY = 87;
    panelResult.x = W/2;
    panelResult.y = -H;
    panelResult.rotation = 90;
    //panelResult.y = H/2;
    
    var panelResultImage = new createjs.Bitmap(queue.getResult("resultPanel"));
	panelResult.addChild(panelResultImage);
    
    var txtResultTitle = new createjs.Text();
	panelResult.addChild(txtResultTitle);
	txtResultTitle.set({
		text: 'Congratulations',
		font: '18px comic1',
		color: '#000',
		textAlign: 'center'
	});
	txtResultTitle.x = 140;
	txtResultTitle.y = 10;
    
    createjs.Sound.play("sound_result");
    TweenLite.to(panelResult, 1, {y: H/2, rotation: 0, ease: Bounce.easeOut});
    
    
    createStar();
    createPanelNav();
    
    console.log('Displaying result.');
}

function createStar(){
    var starResult = Math.ceil((nbrOfTargetsHit / nbrOfTargets[challengeSelected]) * 3);
    //console.log('stars: ', starResult, (nbrOfTargetsHit / nbrOfTargets[challengeSelected]));
    for(var i = 0;i < starResult;i++){
        var star = new createjs.Bitmap(queue.getResult("star"));
	    panelResult.addChild(star);
        star.x = 67 + (i * 53);
        star.y = 68;
    }
}

function createPanelNav(){
    var icon_restart = new createjs.Bitmap(queue.getResult("icon_restart"));
	panelResult.addChild(icon_restart);
    icon_restart.regX = 25;
    icon_restart.regY = 25;
    icon_restart.x = 140;
    icon_restart.y = 145;
    icon_restart.cursor = 'pointer';
    
    icon_restart.addEventListener('click', function(){
        console.log('Restarting level...');
        clearGameScreen();
        
        openGame();
    });
    
    var icon_next = new createjs.Bitmap(queue.getResult("icon_back"));
	panelResult.addChild(icon_next);
    icon_next.regX = 25;
    icon_next.regY = 25;
    icon_next.scaleX = -1;
    icon_next.x = 210;
    icon_next.y = 145;
    icon_next.cursor = 'pointer';
    
    icon_next.addEventListener('click', function(){
        console.log('Take next challenge...');
        selectChallenge(null, challengeSelected +1);
    });
    
    var icon_home = new createjs.Bitmap(queue.getResult("icon_home"));
	panelResult.addChild(icon_home);
    icon_home.regX = 25;
    icon_home.regY = 25;
    icon_home.x = 70;
    icon_home.y = 145;
    icon_home.cursor = 'pointer';
    
    icon_home.addEventListener('click', function(){
        console.log('Navigate to Challenges screen...');
        clearGameScreen();
        createChallengesScreen();
    });
}

function createChallengesNav(){
    var icon_back = new createjs.Bitmap(queue.getResult("icon_back"));
	container.addChild(icon_back);
    icon_back.regX = 25;
    icon_back.regY = 25;
    icon_back.x = 50;
    icon_back.y = 40;
    icon_back.cursor = 'pointer';
    
    icon_back.addEventListener('click', function(){
        console.log('Navigate to Home screen...');
        clearGameScreen();
        canvas.removeChild(container);
        setup();
    });
}

//UPDATEs ------------------------------------------------------------------
function updateTargetsScore(){
    txtScore.text = nbrOfTargetsHit +'/'+ nbrOfTargets[challengeSelected];
}

function updateTimer(){
    if(challengeTime > 0){
        challengeTime--;
        txtTimer.text = translateTimer(challengeTime);
    } else if(challengeTime == 0){
        endChallenge();
    }
}

function translateTimer(count){
    var seconds = Math.floor(count /100);
    var milliseconds = count - (seconds * 100);
    var timeString;
    
    if(milliseconds < 10){
        milliseconds = "0"+ milliseconds;
    }
    timeString = seconds +":"+ milliseconds;
    
    return timeString;
}


