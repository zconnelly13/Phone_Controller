ig.module(
    'game.entities.hiddenPath'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityHiddenPath = ig.Entity.extend({
        size: {x:64, y:64},
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        animSheet : new ig.AnimationSheet('media/img/hidden_tile_64_64.png', 64, 64),
        zIndex: 10,

        update: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            this.addAnim('default',1,[1]);
            this.addAnim('hidden',1,[0]);
            if (ig.game.choices) {
                if (ig.game.choices.vision !== "See Hidden Paths") {
                    this.currentAnim = this.anims.hidden;
                    this.collides = ig.Entity.COLLIDES.FIXED;
                }
            }
            this.parent(x,y,settings);
        }

    })
});

