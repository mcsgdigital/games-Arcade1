
function getChallenge1(){
    //setup game data for this level then create panel 
    //then start challenge
    objectives = 'Shoot '+ nbrOfTargets[challengeSelected] +' ducks to win';
    console.log(objectives);
}

function setupChallenge1(){
    document.querySelector("body").style.cursor = "none";
    //console.log('scenery added.');
    setBackground();
    
    foreground = new createjs.Container();
    container.addChildAt(foreground, container.getChildIndex(bg) +1);
    var fg1 = new createjs.Bitmap(queue.getResult("fg1"));
	foreground.addChild(fg1);
    foreground.y = 500;
    //console.log(container.getNumChildren());
    
    targets = [];
    
    for(var i=0; i < 3;i++){
        var target1 = new createjs.Container();
        var target1Image = new createjs.Bitmap(queue.getResult("target1"));
        target1.addChild(target1Image);
        container.addChildAt(target1, container.getChildIndex(foreground));
        target1.alpha = 0;
        target1.regX = 30;
        target1.regY = 110;
        target1.x = 175 +(i * 100);
        target1.y = 200;
        target1.scaleY = .1;
        target1.setBounds(-30, -110, 30, 110);
        var rect = new createjs.Shape();
        rect.graphics.beginFill('#fff').drawRoundRect(0, 0, 60, 60,5,5,5,5);
        rect.alpha = 0;
        target1.addChild(rect);
        
        var speed = -5;
        var isHit = false;
        onScreenTargets++;
        
        targets.push([target1, speed, isHit]);
    }
    
    showScenery();
}

function showScenery(){
    TweenLite.to(foreground, .5, {y: 0, ease: Back.easeOut, onComplete: showTargets});
}

function showTargets(){
    for(var i=0; i < targets.length;i++){
        TweenLite.to(targets[i][0], .5, {alpha: 1, scaleY: 1, ease: Back.easeOut, onComplete: animateChallenge1, onCompleteParams: [i]});
    }
}

function animateChallenge1(args){
    if(args == targets.length -1){
        isChallengeReady = true;
        crosshair.alpha = 1;
        btn_reload.alpha = 1;
        challengeTime = 300;// [1/100]
        fillBullets();
    }
}

function updateChallenge1(){
    for(var i=0; i < targets.length;i++){
        targets[i][0].x += targets[i][1];
        if(targets[i][0].x < 150 || targets[i][0].x > 400){
            targets[i][0].scaleX *= -1;
            targets[i][1] = -targets[i][1];
        }
    }
}

function hitAnimationChallenge1(target){
    nbrOfTargetsHit++;
    onScreenTargets--;
    updateTargetsScore();
    
    TweenLite.to(target, 0.25,{scaleY: 0, ease: Back.easeIn.config(3)});
    
    window.setTimeout(function(){
        playTargetSoundChallenge1();
    }, 200);
    
    window.setTimeout(function(){
        target[2] = false;
        
        if(nbrOfTargetsHit +onScreenTargets < nbrOfTargets[challengeSelected]){
            reviveTarget(target);
        }
        
    }, 2000);
    
    if(nbrOfTargetsHit == nbrOfTargets[challengeSelected]){
        endChallenge();
    }
}

function reviveTarget(target){
    onScreenTargets++;
    TweenLite.to(target, 0.5,{scaleY: 1});
}

function playTargetSoundChallenge1(){
	createjs.Sound.play("sound_target1");
}

function endChallenge(){
    window.setTimeout(createPanelResult, 1000);
    document.querySelector("body").style.cursor = "default";
    crosshair.alpha = 0;
    canvas.removeEventListener("stagemousedown", shoot);
    window.removeEventListener("keydown", checkKey);

    isChallengeReady = false;//end of game
}



