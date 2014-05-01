ig.module(
    'game.entities.hiddenMovingPlatform'
)
.requires(
    'impact.entity',

    'game.entities.movingPlatform'
)
.defines(function() {
    EntityHiddenMovingPlatform = EntityMovingPlatform.extend({
        animSheet: new ig.AnimationSheet('media/img/hidden_platform_256_32.png',256,32),

        update: function() {
            if (ig.game.choices.vision !== "See Hidden Platforms") {
                this.kill();
            }
            this.parent();
        }
    });
});
