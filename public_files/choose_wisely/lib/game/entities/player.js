ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityPlayer = ig.Entity.extend({
        size: {x: 44, y:63},
        maxVel: { x: 500, y: 1000 },
        collides: ig.Entity.COLLIDES.PASSIVE,
        name: "Player",

        speed: 200,
        jumpStrength: 250,
        health: 3,
        stars: 0,
        time: 1,
        zIndex: 1,


        jumpAbility: null,
        strongJumpStrength: 400,
        wallJumpStrength: 250,
        jumping: false,
        wallJumpingLeft: false,
        wallJumpingRight: false,
        doubleJump: false,

        animSheet: new ig.AnimationSheet('media/img/player_44_63.png',44,63),

        init: function(x, y, settings) {
            this.parent(x,y,settings);
            if (ig.game.choices) {
                this.jumpAbility = ig.game.choices.jump;
            }
            this.setAnimations();
        },

        setAnimations: function() {
            this.addAnim('default',1,[0]);
        },

        handleMovementTrace: function(res) {
            if (res.collision.x) {
                if (!this.wallJumpingLeft && !this.wallJumpingRight) {
                    this.setWallJump();
                } else if(res.pos.x < this.pos.x) {
                    if (this.wallJumpingRight && this.currentAnim.flip.x) {
                        this.setWallJump();
                    }
                } else {
                    if (this.wallJumpingLeft && !this.currentAnim.flip.x) {
                        this.setWallJump();
                    } 
                }
            }
            this.parent(res);
        },

        setWallJump: function() {
            if (!this.standing) {
                this.wallJump = true;
            }
        },

        checkDeath: function() {
            var maxY = ig.game.collisionMap.pxHeight;
            if (this.pos.y > maxY) {
                this.handleCameraMovement = function(){};
                if (!this.deathTimeout) {
                    this.deathTimeout = setTimeout(function() {ig.game.reloadLevel();},500);
                }
            }
        },

        spaceSkill: function() {
            if (ig.game.choices.spaceSkill == "Open Treasure Chests") {
                this.pickLock();
            } else if (ig.game.choices.spaceSkill == "Smash Crates") {
                this.smashCrate();
            }
        },

        smashCrate: function() {
            var crates = ig.game.getEntitiesByType(EntityCrate);
            for(var i=0;i<crates.length;i++) {
                var crate = crates[i];
                var offset = 0;
                var flip = this.currentAnim.flip.x;
                if (!flip && crate.pos.x >= this.pos.x) {
                    if (Math.abs(crate.pos.x - this.pos.x) < 64) {
                        if (Math.abs(crate.pos.y - this.pos.y) < 32) {
                            crate.smash();
                        }
                    }
                } else {
                    if (flip && crate.pos.x < this.pos.x) {
                        if (Math.abs(this.pos.x - crate.pos.x) < 64 + crate.size.x) {
                            if (Math.abs(crate.pos.y - this.pos.y) < 32) {
                                crate.smash();
                            }
                        }
                    }
                }
            }
        },

        pickLock: function() {
            var treasureChests = ig.game.getEntitiesByType(EntityTreasureChest);
            for(var i=0;i<treasureChests.length;i++) {
                var treasureChest = treasureChests[i];
                var offset = 0;
                var flip = this.currentAnim.flip.x;
                if (!flip && treasureChest.pos.x >= this.pos.x) {
                    if (Math.abs(treasureChest.pos.x - this.pos.x) < 64) {
                        if (Math.abs(treasureChest.pos.y - this.pos.y) < 20) {
                            treasureChest.open();
                        }
                    }
                } else {
                    if (flip && treasureChest.pos.x < this.pos.x) {
                        if (Math.abs(this.pos.x - treasureChest.pos.x) < 64 + treasureChest.size.x) {
                            if (Math.abs(treasureChest.pos.y - this.pos.y) < 20) {
                                treasureChest.open();
                            }
                        }
                    }
                }
            }
        },

        update: function() {
            this.time++;
            this.checkDeath();
            if (this.jumping && this.standing) {
                this.jumping = false;
            }
            if ((this.wallJumpingLeft || this.wallJumpingRight || this.wallJump) && this.standing) {
                this.wallJumpingLeft = false;
                this.wallJumpingRight= false;
                this.wallJump = false;
            }
            if (ig.input.state('left')) {
                this.setMoveLeft();
            } else if (ig.input.state('right')) {
                this.setMoveRight();
            } else if (!ig.ua.mobile) {
                this.setStop();
            }
            if (ig.input.pressed('up')) {
                this.jump();
            }
            this.spaceSkill();
            this.handleLeftBound();
            this.parent();
            this.handleCameraMovement();
        },

        handleCameraMovement: function() {
            if (this.pos.x > ig.system.width / 2) {
                ig.game.screen.x = this.pos.x - ig.system.width / 2;
            }
            if (this.pos.y < ig.system.height / 2 || ig.game.followY) {
                ig.game.screen.y = this.pos.y - ig.system.height / 2;
            }
        },

        handleLeftBound: function() {
            if (this.pos.x < 0) {
                this.pos.x = 0;
            }
        },

        setMoveLeft: function() {
            this.vel.x = (-1)*this.speed;
            this.currentAnim.flip.x = true;
        },

        setMoveRight: function() {
            this.vel.x = this.speed;
            this.currentAnim.flip.x = false;
        },

        setStop: function() {
            this.vel.x = 0;
        }, 

        jump: function() {
            if (this.jumpAbility == "Strong Jump") {
                var jumpStrength = this.strongJumpStrength;
            } else {
                var jumpStrength = this.jumpStrength;
            }
            if (this.standing) {
                this.jumping = true;
                this.vel.y += (-1)*jumpStrength;
                var pet = ig.game.getEntitiesByType(EntityPet)[0];
                if (pet !== undefined) {
                    if (pet.standing) {
                        pet.vel.y += (-1)*jumpStrength;
                    } else {
                        pet.vel.y = (-1)*jumpStrength;
                    }
                }
                if (this.jumpAbility == "Double Jump") {
                    this.doubleJump = true;
                }
            } else if (this.doubleJump) {
                var strength = (Math.abs(this.vel.y)-this.jumpStrength);
                this.vel.y += strength;
                ig.game.getEntitiesByType(EntityPet)[0].vel.y += strength;
                this.doubleJump = false;
            } else if (this.wallJump && this.jumpAbility == "Wall Jump") {
                var wallJump = false;
                if (!this.wallJumpingLeft && !this.wallJumpingRight) {
                    var wallJump = true;
                } 
                if (this.wallJumpingRight && this.currentAnim.flip.x) {
                    var wallJump = true;
                }
                if (this.wallJumpingLeft && !this.currentAnim.flip.x) {
                    var wallJump = true;
                } 
                if (wallJump) {
                    var jumpStrength = (-this.vel.y-this.wallJumpStrength);
                    this.vel.y += jumpStrength;
                    ig.game.getEntitiesByType(EntityPet)[0].vel.y += jumpStrength;
                    if (this.currentAnim.flip.x) {
                        this.wallJumpingLeft = true;
                        this.wallJumpingRight = false;
                    } else {
                        this.wallJumpingLeft = false;
                        this.wallJumpingRight = true;
                    }
                    this.wallJump = false;
                }
            }
        },

        collectedStar: function(id) {
            ig.game.collectStar(id);
        }


    });
});
