ig.module(
    'game.entities.treasureChest'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityTreasureChest = ig.Entity.extend({
        size: {x:76, y:64},
        collides: ig.Entity.COLLIDES.FIXED,
        gravityFactor: 1,
        animSheet: new ig.AnimationSheet('media/img/treasure_chest_76_64.png', 76, 64),

        update: function() {
            this.parent();
        },

        open: function() {
            ig.game.collectStar(this.starId);
            this.kill();
        },

        init: function(x,y,settings) {
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

