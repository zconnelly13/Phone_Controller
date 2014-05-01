ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.player',
    'game.entities.pet',
    'game.entities.star',
    'game.entities.hiddenStar',
    'game.entities.portal',

    'game.levels.0',
    'game.levels.1',
    'game.levels.2',
    'game.levels.3c1',
    'game.levels.3c2',
    'game.levels.3c3',
    'game.levels.3',
    'game.levels.4c',
    'game.levels.4',
    'game.levels.5c',
    'game.levels.5'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
    gravity: 400,
    followY: false,
    buttonBeingPressed: false,
    currentLevel: null,
    currentLevelNumber: 0,
    stars: 0,
    starsCheckPoint: 0,
    starIds: [],
    totalStars: 52,

    flow: [
        ['level',Level1],
        ['choice',["You only get one pet.","pet","Doge","Kitteh","Mouse"]],
        ['level',Level2],
        ['choice',["You only get one type of jump","jump","Wall Jump","Double Jump","Strong Jump"]],
        ['choiceDependentLevel',{choice:"jump",
                                 Wall_Jump:Level3c1,
                                 Double_Jump:Level3c2,
                                 Strong_Jump:Level3c3}],
        ['level',Level3],
        ['choice',["You only get one type of advanced vision","vision","See Hidden Platforms","See Hidden Paths","See Hidden Stars"]],
        ['level',Level4c],
        ['level',Level4],
        ['choice',["You only get one special skill","spaceSkill","Open Treasure Chests","Smash Crates","Move Gravestones"]],
        ['level',Level5c],
        ['level',Level5],
        ['YouWin!']
    ],

    flowPosition: -1,
    /*
    choices: {
        pet: "Grumpy Cat",
        jump: "Wall Jump",
        vision: "See Hidden Platforms",
        spaceSkill: "Smash Crates"
    },
    */
    choices: {},

	init: function() {
        // qwerty
        ig.input.bind(ig.KEY.A,  'left');
        ig.input.bind(ig.KEY.D,'right');
        ig.input.bind(ig.KEY.W,'up');
        ig.input.bind(ig.KEY.S,'down');

        // dvorak
        ig.input.bind(ig.KEY.A,  'left');
        ig.input.bind(ig.KEY.E,'right');
        ig.input.bind(ig.KEY.COMMA,'up');
        ig.input.bind(ig.KEY.O,'down');

        // arrow keys
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

        //skills
        ig.input.bind(ig.KEY.SPACE,'spaceSkill');
        ig.input.bind(ig.KEY.SHIFT,'shiftSkill');

        this.nextLevel();
        //this.loadLevel(Level0);
	},

    starId: 0,
    getStarId: function() {
        this.starId++;
        return this.starId;
    },

    loadLevel: function(level) {
        if (level !== this.currentLevel) {
            this.currentLevelNumber++;
        }
        this.saveStarId = this.starId;
        this.currentLevel = level;
        this.setLevelNumber();
        this.setStars();
        this.parent(level);
    },

    setLevelNumber: function() {
        var levelSpan = document.getElementById("levelNumber");
        levelSpan.innerHTML = this.currentLevelNumber;
    },

    reloadLevel: function(level) {
        var starsCollected = this.stars - this.starsCheckPoint;
        for (var i=0;i<starsCollected;i++) {
            this.starIds.pop();
        }
        this.stars = this.starsCheckPoint;
        this.starId = this.saveStarId;
        this.loadLevel(this.currentLevel);
    },

    choose: function(title,type,choice1,choice2,choice3) {
        document.getElementById('title').innerHTML = title;
        document.getElementById('leftButton').innerHTML = choice1;
        document.getElementById('leftButton').setAttribute("choiceType",type);
        document.getElementById('middleButton').innerHTML = choice2;
        document.getElementById('middleButton').setAttribute("choiceType",type);
        document.getElementById('rightButton').innerHTML = choice3;
        document.getElementById('rightButton').setAttribute("choiceType",type);
        document.getElementById('choiceDiv').style.display = 'block';
    },

    setChoice: function(choiceDiv) {
        this.choices[choiceDiv.getAttribute("choiceType")] = choiceDiv.innerHTML;
        if (ga !== undefined) {
            ga('send','event','choice',choiceDiv.getAttribute("choiceType"), choiceDiv.innerHTML);
        }
        document.getElementById('choiceDiv').style.display = 'none';
        this.nextLevel();
        ig.system.startRunLoop.call(ig.system);
    },
	
	update: function() {
		this.parent();
	},
	
	draw: function() {
		this.parent();
	},

    getPlayer: function() {
        var player = ig.game.getEntitiesByType('EntityPlayer')[0];
        return player;
    },

    nextLevel: function() {
        if (ga !== undefined) {
            ga('send','event','nextLevel',this.flowPosition+1,this.stars);
        }
        this.flowPosition++;
        this.buttonBeingPressed = false;
        this.starsCheckPoint = this.stars;
        var flow = this.flow[this.flowPosition];
        var type = flow[0];
        var args = flow[1];
        if (type == "level") {
            this.loadLevel(args);
        } else if (type == "choice") {
            ig.system.stopRunLoop.call(ig.system);
            this.choose(args[0],args[1],args[2],args[3],args[4]);
        } else if (type == "choiceDependentLevel") {
            this.followY = true; // turn this on at level 3
            var level = args[this.choices[args.choice].replace(/ /gi,"_")];
            this.loadLevel(level);
        } else if (type == "YouWin!") {
            var completionPercentage = parseInt(100*(this.stars / this.totalStars));
            document.getElementById('completionPercent').innerHTML = completionPercentage;
            var completionTierText = "Bronze";
            var completionDivColor = "#be8665";
            if (completionPercentage >= 75) {
                completionTierText = "Silver";
                completionDivColor = "#cacaca";
            }
            if (completionPercentage >= 90) {
                completionTierText = "Gold";
                completionDivColor = "#f9d84b";
            }
            document.getElementById('completionTier').innerHTML = completionTierText;
            document.getElementById('completion').style.backgroundColor = completionDivColor;
            document.getElementById('youWin').style.display = "block";
            ig.system.stopRunLoop.call(ig.system);
        }
    },

    collectStar: function(id) {
        this.stars++;
        this.starIds.push(id);
        this.setStars();
    },

    setStars: function() {
        var starsDiv = document.getElementById('numberOfStars');
        starsDiv.innerHTML = this.stars;
    },

    playAgain: function() {
        this.followY = false;
        this.buttonBeingPressed = false;
        this.currentLevelNumber = 0;
        this.flowPosition = -1;
        this.choices = {};
        this.starId = 0;
        document.getElementById('youWin').style.display = 'none';
        this.nextLevel();
        ig.system.startRunLoop.call(ig.system);
    },

    collectedStar: function(id) {
        var starIds = this.starIds;
        for (var i=0;i<starIds.length;i++) {
            var starId = starIds[i];
            if (id == starId) {
                return true;
            }
        }
        return false;
    }
});

ig.main( '#canvas', MyGame, 60, 1280, 640, 1 );

});
