ig.module(
	'game.entities.paddle-cpu'
)
.requires(
	'game.entities.paddle',
	'game.entities.puck'
)
.defines(function(){

EntityPaddleCpu = EntityPaddle.extend({
	
	update: function() {
		
		var puck = ig.game.getEntitiesByType( EntityPuck )[0];
		
        var orientation = Math.abs(ig.game.player1Motion);
        if (orientation < 45) {
            this.vel.y = -100;
        } else {
            this.vel.y = 100;
        }
		
		this.parent();
	}
});

});
