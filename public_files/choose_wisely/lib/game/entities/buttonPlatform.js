ig.module(
    'game.entities.buttonPlatform'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityButtonPlatform = ig.Entity.extend({
        size: {x:256, y:32},
        collides: ig.Entity.COLLIDES.FIXED,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/img/platform_256_32.png', 256, 32),

        direction: 'right',
        distance: 128,
        startingOffset: 0,
        speed: 75,

        update: function() {
            var xy = this.getXy();
            this.vel[xy] = 0;
            if (ig.game.buttonBeingPressed && this.getDistanceFromStart() <= this.distance) {
                this.vel[xy] = this.getSpeed();
            } else if (!ig.game.buttonBeingPressed && this.getDistanceFromStart() > 0) {
                this.vel[xy] = -this.getSpeed();
            }
            this.parent();
        },

        getSpeed: function() {
            if (this.direction == 'left' || this.direction == 'up') {
                return -this.speed;
            } else {
                return this.speed;
            }
        },

        getXy: function() {
            var xy = null;
            if (this.direction == 'left' || this.direction == 'right') {
                xy = 'x';
            } else {
                xy = 'y';
            }
            return xy;
        },

        getDistanceFromStart: function() {
            if (this.direction == 'left' || this.direction == 'up') {
                var distanceFromStart = (this.startingPoint.x-this.pos.x) + (this.startingPoint.y - this.pos.y);
            } else {
                var distanceFromStart = (this.pos.x-this.startingPoint.x) + (this.pos.y-this.startingPoint.y);
            }
            return distanceFromStart;
        },

        init: function(x,y,settings) {
            this.addAnim('default',1,[0]);
            this.parent(x,y,settings);
            this.startingPoint = {x:x,y:y};
        }

    })
});

