ig.module(
    'game.entities.hiddenStar'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityHiddenStar = ig.Entity.extend({
        size: {x:62, y:64},
        collides: ig.Entity.COLLIDES.ACTIVE,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/img/hidden_star_62_64.png', 62, 64),

        collideWith: function(other,axis) {
            if (other instanceof EntityPlayer) {
                other.collectedStar(this.starId);
                this.kill();
            }
        },

        update: function() {
            if (ig.game.choices.vision != "See Hidden Stars") {
                this.kill();
            }
            this.parent();
        },

        init: function(x,y,settings) {
            if (settings.gravity) {
                this.gravityFactor = 1;
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

