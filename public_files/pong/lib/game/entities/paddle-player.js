ig.module(
	'game.entities.paddle-player'
)
.requires(
	'game.entities.paddle'
)
.defines(function(){

EntityPaddlePlayer = EntityPaddle.extend({
	
	animSheet: new ig.AnimationSheet( 'media/paddle-blue.png', 64, 128 ),
	
	update: function() {
		
        var orientation = Math.abs(ig.game.player2Motion);
        if (orientation < 45) {
            this.vel.y = -100;
        } else {
            this.vel.y = 100;
        }
		
		this.parent();
	}
});

});
