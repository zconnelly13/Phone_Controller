ig.module(
    'game.entities.star'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityStar = ig.Entity.extend({
        size: {x:64, y:64},
        collides: ig.Entity.COLLIDES.ACTIVE,
        gravityFactor: 0,

        collideWith: function(other,axis) {
            if (other instanceof EntityPlayer) {
                other.collectedStar(this.starId);
                this.kill();
            }
        },

        update: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            if (settings.gravity) {
                this.gravityFactor = 1;
            }
            var randomNumber = Math.random();
            if (randomNumber < 0.33) {
                this.animSheet = new ig.AnimationSheet('media/img/star1_39_64.png', 39, 64);
            } else if (randomNumber < 0.67) {
                this.animSheet = new ig.AnimationSheet('media/img/star2_62_64.png', 62, 64);
            } else {
                this.animSheet = new ig.AnimationSheet('media/img/star3_44_64.png', 44, 64);
            }
            if (ig.game.getStarId !== undefined) {
                this.starId = ig.game.getStarId();
                if (ig.game.collectedStar(this.starId)) {
                    this.kill();
                }
            }
            this.addAnim('default',1,[0]);
            this.parent(x,y,settings);
        }

    })
});

