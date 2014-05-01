ig.module(
    'game.entities.portal'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityPortal = ig.Entity.extend({
        size: {x:87, y:48},
        collides: ig.Entity.COLLIDES.FIXED,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/img/portal_87_48.png', 87, 48),

        collideWith: function(other,axis) {
            if (other instanceof EntityPlayer) {
                ig.game.nextLevel();
            }
        },

        update: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            this.addAnim('default',1,[0]);
            this.parent(x,y,settings);
        }

    })
});

