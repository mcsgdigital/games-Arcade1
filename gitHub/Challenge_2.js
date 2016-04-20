
function getChallenge2(){
    //setup game data for this level then create panel 
    //then start challenge
    objectives = 'Shoot '+ nbrOfTargets[challengeSelected] +' fishes to win';
    console.log(objectives);
}

function setupChallenge2(){
    document.querySelector("body").style.cursor = "none";
    //console.log('scenery added.');
    setBackground();
    
    foreground = new createjs.Container();
    container.addChildAt(foreground, container.getChildIndex(bg) +1);
    var fg3 = new createjs.Bitmap(queue.getResult("wave3"));
	foreground.addChild(fg3);
    fg3.x = 0;
    fg3.y = 0;
    TweenMax.to(fg3, 7,{x: -100, yoyo:true, repeat:-1});
    var fg2 = new createjs.Bitmap(queue.getResult("wave1"));
	foreground.addChild(fg2);
    fg2.x = -25;
    fg2.y = 25;
    TweenMax.to(fg2, 5,{x: 75, yoyo:true, repeat:-1});
    var fg1 = new createjs.Bitmap(queue.getResult("wave2"));
	foreground.addChild(fg1);
    fg1.x = -60;
    fg1.y = 50;
    TweenMax.to(fg1, 3,{x: -150, yoyo:true, repeat:-1});
    foreground.x = -50;
    foreground.y = H *2;
    //console.log(container.getNumChildren());
    
    targets = [];
    
    for(var i=0; i < 3;i++){
        var target1 = new createjs.Container();
        var target1Image = new createjs.Bitmap(queue.getResult("target2"));
        target1.addChild(target1Image);
        container.addChildAt(target1, container.getChildIndex(foreground));
        target1.alpha = 0;
        target1.regX = 64;
        target1.regY = 40;
        target1.x = 175 +(i * 100);
        target1.y = 450;
        target1.scaleY = .1;
        target1.setBounds(-30, -110, 30, 110);
        var rect = new createjs.Shape();
        rect.graphics.beginFill('#fff').drawRoundRect(0, 0, 60, 60,5,5,5,5);
        rect.alpha = 0;
        target1.addChild(rect);
        target1.id = i;
        
        var speed = -5;
        var isHit = false;
        onScreenTargets++;
        
        targets.push([target1, speed, isHit]);
    }
    
    showScenery2();
}

function showScenery2(){
    TweenLite.to(foreground, .5, {y: H *0.6, ease: Back.easeOut, onComplete: showTargets2});
}

function showTargets2(){
    for(var i=0; i < targets.length;i++){
        TweenLite.to(targets[i][0], .5, {alpha: 1, scaleY: 1, ease: Back.easeOut, onComplete: animateChallenge2, onCompleteParams: [i]});
    }
}

function animateChallenge2(args){
    if(args == targets.length -1){
        isChallengeReady = true;
        crosshair.alpha = 1;
        btn_reload.alpha = 1;
        challengeTime = 500;// [1/100]
        fillBullets();
        
        tweensArray = [];
        
        for(var i=0; i < targets.length;i++){
            var fish = targets[i][0];
            var del = Math.random() * 1;
            var tween = TweenMax.to(fish, 7,{delay: i, bezier:{type:"thru", values:[{x:200 + (i *100), y:50 +(Math.random() *100)}, {x: (i *100), y:450}], autoRotate:["x","y","rotation", 180, false]}, ease:Power3.easeOut});
            //var tween = TweenMax.to(fish, 1,{delay: del, y: 450, bezierThrough: [100, 100], ease: Power3.easeOut, onComplete: reverseTween, onCompleteParams: ["{self}"]});
            tweensArray.push(tween);
        }
    }
}

function updateChallenge2(){
    
}

function hitAnimationChallenge2(target){
    nbrOfTargetsHit++;
    onScreenTargets--;
    updateTargetsScore();
    
    TweenLite.to(target, 0.25,{scaleY: 0, ease: Back.easeIn.config(3)});
    
    window.setTimeout(function(){
        playTargetSoundChallenge2();
    }, 200);
    
    window.setTimeout(function(){
        target[2] = false;
        
        if(nbrOfTargetsHit +onScreenTargets < nbrOfTargets[challengeSelected]){
            reviveTarget2(target);
        }
        
    }, 1000);
    
    if(nbrOfTargetsHit == nbrOfTargets[challengeSelected]){
        endChallenge2();
    }
}

function reviveTarget2(target){
    onScreenTargets++;
    target.x = 175 +(target.id * 100);
    target.y = 450;
    
    tweensArray[target.id].restart();
    
    console.log('target: ' ,tweensArray[target.id]);
}

function playTargetSoundChallenge2(){
	createjs.Sound.play("sound_target1");
}

function endChallenge2(){
    window.setTimeout(createPanelResult, 1000);
    document.querySelector("body").style.cursor = "default";
    crosshair.alpha = 0;
    canvas.removeEventListener("stagemousedown", shoot);
    window.removeEventListener("keydown", checkKey);

    isChallengeReady = false;//end of game
}



