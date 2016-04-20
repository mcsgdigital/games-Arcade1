function createChallengesScreen(){
	

	//SCENERY background
	bgChallenges = new createjs.Bitmap(queue.getResult("bgChallenges"));
	canvas.addChildAt(bgChallenges, 0);
    
    challenges = [];
    
    for(var i=0; i < challengesArray.length;i++){
        
        var challenge = new createjs.Container();
        var challengeImage;
        switch(challengesArray[i]){
            case 0://locked
                challengeImage = new createjs.Bitmap(queue.getResult("icon_challengeLocked"));
                break;
            case 1:
                challengeImage = new createjs.Bitmap(queue.getResult("icon_challenge1"));
                break;
            case 2:
                challengeImage = new createjs.Bitmap(queue.getResult("icon_challenge2"));
                break;
            case 100://locked BOSS
                challengeImage = new createjs.Bitmap(queue.getResult("icon_challengeBossLocked"));
                break;
            case 101://unlocked BOSS
                challengeImage = new createjs.Bitmap(queue.getResult("icon_challengeBoss"));
                break;
            default:
                console.log('ERROR createChallengesScreen');
        }
        
        challenge.addChild(challengeImage);
        container.addChild(challenge);
        challenge.regX = 31;
        challenge.regY = 31;
        challenge.x = 70 +((i -(Math.floor(i /5) *5)) *100);
        challenge.y = 100 +(Math.floor(i / 5) *75);
        challenge.setBounds(-31, -31, 31, 31);
        var rect = new createjs.Shape();
        rect.graphics.beginFill('#fff').drawRect(0, 0, 62, 62);
        rect.alpha = 0;
        challenge.addChild(rect);
        challenge.id = i;
        challenge.cursor = 'pointer';
        challenge.addEventListener('click', selectChallenge);
        
        challenges.push(challenge);
    }
    
    createChallengesNav();
}

function selectChallenge(e, id = 0){
    if(e){
        challengeSelected = e.currentTarget.id;
    }else{
        challengeSelected = id;
    }
    
    console.log('challenge selected: ', challengeSelected);
    
    canvas.removeAllEventListeners('click');
    canvas.removeChild(bgChallenges);
    while(container.numChildren > 0){
        container.removeChildAt(0);
    }

    switch(challengeSelected){
        case 0:
            getChallenge1();
            break;
        case 1:
            getChallenge2();
            break;
        case 2:
            
            break;
        default:
            
    }
    
    setBackground();
    createPanelObjective();
}


