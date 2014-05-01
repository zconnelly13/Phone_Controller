ig.module(
    'game.entities.button'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityButton = ig.Entity.extend({
        size: {x:64, y:64},
        collides: ig.Entity.COLLIDES.FIXED,
        gravityFactor: 0,
        timePressed: 900719925474099, // max_int *0.1 +/- some error
        time: 1,
        animSheet: new ig.AnimationSheet('media/img/button_64_64.png', 64, 64),

        collideWith: function(other,axis) {
            if (other instanceof EntityPlayer || other instanceof EntityGraveStone) {
                if (axis == "y") {
                    ig.game.buttonBeingPressed = true;
                    this.beingPressed = true;
                    this.timePressed = this.time;
                }
            }
        },

        update: function() {
            this.time++;
            if (!this.beingPressed) {
                if (this.currentAnim == this.anims.pressed) {
                    this.currentAnim = this.anims.notPressed;
                    this.size = {x: 64, y:32};
                    this.offset.y = 0;
                    this.pos.y -=32;
                }
            } else {
                if (this.currentAnim == this.anims.notPressed) {
                    this.currentAnim = this.anims.pressed;
                    this.size = {x: 64, y:32};
                    this.offset.y = 32;
                    this.pos.y +=32;
                }
            }
            if (this.time - 25 > this.timePressed) {
                ig.game.buttonBeingPressed = false;
                this.beingPressed = false;
                this.timePressed = 900719925474099; // max_int *0.1 +/- some error
            }
            this.parent();
        },

        init: function(x,y,settings) {
            this.addAnim('notPressed',1,[0]);
            this.addAnim('pressed',1,[1]);
            this.parent(x,y,settings);
        }

    })
});

