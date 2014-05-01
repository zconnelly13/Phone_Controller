ig.module(
    'game.entities.crate'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityCrate = ig.Entity.extend({
        size: {x:64, y:60},
        collides: ig.Entity.COLLIDES.FIXED,
        gravityFactor: 1,
        animSheet: new ig.AnimationSheet('media/img/crate_64_60.png', 64, 60),

        update: function() {
            this.parent();
        },

        smash: function() {
            this.kill();
        },

        init: function(x,y,settings) {
            this.addAnim('default',1,[0]);
            this.parent(x,y,settings);
        }

    })
});

