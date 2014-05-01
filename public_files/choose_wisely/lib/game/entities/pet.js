ig.module(
    'game.entities.pet'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityPet = ig.Entity.extend({
        size: {x:32, y:29},
        maxVel: { x: 500, y: 1000 },
        collides: ig.Entity.COLLIDES.PASSIVE,
        zIndex: 2,

        speed: 250,
        jumpStrength: 300,
        doubleJump: false,

        animSheet: new ig.AnimationSheet('media/img/kitteh_32_29.png', 32, 29),
        
        update: function() {
            this.moveTowardsPlayer();
            this.parent();
        },

        getEdgeX: function() {
            var edgeX = this.pos.x + (this.currentAnim.flip.x ? -4 : this.size.x+4);
            return edgeX;
        },

        getEdgeY: function() {
            var edgeY = this.pos.y + this.size.y+4;
            return edgeY;
        },

        draw: function() {
            this.parent();
        },

        moveTowardsPlayer: function() {
            var player = ig.game.getPlayer();
            var target = player.pos.x;
            if (player.standing) {
                if (player.currentAnim.flip.x) {
                    target = target+45;
                } else {
                    target = target - 35;
                }
            }
            var distance = this.pos.x-target;
            if (Math.abs(distance) <= 7) {
                this.vel.x = 0;
                this.pos.x = target;
                this.currentAnim.flip.x = player.currentAnim.flip.x;
            } else {
                this.vel.x = (-1)*(this.speed)*(distance/Math.abs(distance));
                if (this.vel.x >= 0) {
                    this.currentAnim.flip.x = false;
                } else {
                    this.currentAnim.flip.x = true;
                }
            }
            var nearEdge = this.isNearEdge();
            if (this.standing && nearEdge) {
                if (player.standing) {
                    this.vel.x = 0;
                    this.currentAnim.flip.x = player.currentAnim.flip.x;
                    return;
                }
            }
        },

        isNearEdge: function() {
            var thereIsNotATileThere = !ig.game.collisionMap.getTile(this.getEdgeX(),this.getEdgeY()); 
            return thereIsNotATileThere;
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
            if (ig.game.choices) {
                if (ig.game.choices.pet == "Doge") {
                    this.animSheet = new ig.AnimationSheet('media/img/doge_32_29.png', 32, 29);
                } else if (ig.game.choices.pet == "Mouse") {
                    this.animSheet = new ig.AnimationSheet('media/img/mouse_32_29.png', 32, 29);
                }
            }
            this.addAnim('default',1,[0]);
        },

    })
});

