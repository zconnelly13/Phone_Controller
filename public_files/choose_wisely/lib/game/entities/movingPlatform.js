ig.module(
    'game.entities.movingPlatform'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityMovingPlatform = ig.Entity.extend({
        size: {x:256, y:32},
        collides: ig.Entity.COLLIDES.FIXED,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/img/platform_256_32.png', 256, 32),

        direction: 'right',
        distance: 128,
        startingOffset: 0,
        speed: 75,
        time: 1,
        switchTime: -30,

        update: function() {
            this.time++;
            var xy = this.getXy();
            if (this.getDistanceFromStart() > this.distance || this.getDistanceFromStart() < 0) {
                if (this.time - this.switchTime > 30) {
                    this.vel[xy] = -this.vel[xy];
                    this.switchTime = this.time;
                }
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
            this.vel[this.getXy()] = this.getSpeed();
        }

    })
});

