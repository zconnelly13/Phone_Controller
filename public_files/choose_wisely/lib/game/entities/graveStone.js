ig.module(
    'game.entities.graveStone'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityGraveStone = ig.Entity.extend({
        size: {x:64, y:64},
        collides: ig.Entity.COLLIDES.FIXED,
        maxVel: {x:100, y:100},
        friction: {x: 150, y:75},
        gravityFactor: 1,
        animSheet: new ig.AnimationSheet('media/img/gravestone_64_64.png', 64, 64),

        update: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            this.addAnim('default',1,[0]);
            if (ig.game.choices) {
                if (ig.game.choices.spaceSkill == "Move Gravestones") {
                    this.collides = ig.Entity.COLLIDES.ACTIVE;
                }
            }
            this.parent(x,y,settings);
        }

    })
});

