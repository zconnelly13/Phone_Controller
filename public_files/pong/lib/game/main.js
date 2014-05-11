ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.puck',
	'game.entities.paddle-cpu',
	'game.entities.paddle-player',
	
	'game.levels.main'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {
        ig.game.systemMessage = "Connect 2 Devices";
        ig.game.player1Motion = 0;
        ig.game.player2Motion = 0;
        ig.game.player1Connected = false;
        ig.game.player2Connected = false;
        ig.game.started = false;
        this.initPrimus();
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
	},

    initPrimus: function() {
        this.primus = Primus.connect('http://www.jazzberrygames.com:1310/', {
                reconnect: {
                    maxDelay: 150000,
                    minDelay: 500,
                    retries: 10,
                }
            }
        );
        this.primus.on('data',function message(data) {
            if (data.ip) {
                qrCode.makeCode("http://www.jazzberrygames.com:1313/pong/phone.html?ip="+data.ip+"&player=1");
                qrCode2.makeCode("http://www.jazzberrygames.com:1313/pong/phone.html?ip="+data.ip+"&player=2");
            }
            if (data.motion) {
                if (data.player == 1) {
                    ig.game.player1Connected = true;
                    document.getElementById('connect').style.display = 'none';
                    ig.game.player1Motion = data.motion;
                } else if (data.player == 2) {
                    ig.game.player2Connected = true;
                    ig.game.player2Motion = data.motion;
                    document.getElementById('connect2').style.display = 'none';
                }
                if (ig.game.player1Connected && ig.game.player2Connected && !ig.game.started) {
                    ig.game.loadLevel(LevelMain);
                    ig.game.started = true;
                }
            }
            //console.log(ig.game.player1Motion + "," + ig.game.player2Motion);
        });
    },
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		this.parent();
	}
});


ig.main( '#canvas', MyGame, 60, 768, 480, 1 );

});
