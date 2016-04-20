
function openGame(){
    console.log('opening game...');
    //gameTitle.alpha = 0;
    clearGameScreen();
    
    setupScenery();
    createInterface();
    
    canvas.addEventListener("stagemousedown", shoot, false, 0 , true);
}

function setupScenery(){
    
    switch(challengeSelected){
        case 0:
            setupChallenge1();
            break;
        case 1:
            setupChallenge2();
            break;
        default:
            
    }
}

function shoot(e)
{
	if(bullets.length > 0){
		createjs.Sound.play("sound_user1");	
		crosshairFIRE.x = canvas.mouseX;
		crosshairFIRE.y = canvas.mouseY;
        crosshairFIRE.alpha = 1;
		TweenLite.to(crosshairFIRE, 0.1,{alpha: 0});
		TweenLite.to(crosshair, 0.1,{scaleX: 1.5, scaleY: 1.5});
		TweenLite.to(crosshair, 0.1,{overwrite: false, delay: 0.1, scaleX: 1, scaleY: 1});
        
        removeBullet();
		
		//Check if target hit
		for (var i=0; i<targets.length; i++) 
		{
			var target = targets[i][0];
			var pt = target.globalToLocal(canvas.mouseX, canvas.mouseY);
			
			if (target.hitTest(pt.x, pt.y)) {
                //console.log('hit', target);
				targetHit(target); 
				//score += 5; 
				//score_target += 1;
			}
		}
		//updateTextfields();
	}
}

function targetHit(target)
{
	switch(challengeSelected){
		case 0:
            if(!target[2]){
                target[2] = true;
                hitAnimationChallenge1(target);
            }
			break;
		case 1:
			if(!target[2]){
                target[2] = true;
                hitAnimationChallenge2(target);
            }
			break;
        default:
	}
}



function clearGameScreen(){
    while(container.numChildren > 0){
        container.removeChildAt(0);
    }
    if(interfaceContainer){
        while(interfaceContainer.numChildren > 0){
            interfaceContainer.removeChildAt(0);
        }
    }
    
    nbrOfTargetsHit = 0;
    onScreenTargets = 0;
}

function setBackground(){
    //SCENERY background
	bg = new createjs.Bitmap(queue.getResult("bg1"));
	container.addChild(bg);
}

function updateChallenge(){
    switch(challengeSelected){
		case 0:
            updateChallenge1();
			break;
		case 1:
			updateChallenge2();
			break;
        default:
            console.log('ERROR switch [Game]', id);
	}
}
