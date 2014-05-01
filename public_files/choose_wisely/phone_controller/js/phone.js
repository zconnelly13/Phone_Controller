var state = {
    jump: false,
    direction: false
};

function sendState(x, width) {
    document.getElementById('output').innerHTML = JSON.stringify(state) + x + ',' + width;
}

function jump() {
    state.jump = true;    
}

function noJump() {
    state.jump = false;
}

function noMove() {
    state.direction = false;
}

function left() {
    state.direction = "left";
}

function right() {
    state.direction = "right";
}


function touchStartHandler(event) {
    event.preventDefault();
    for (var i=0;i<event.touches.length;i++) {
        var touch = event.touches[i];
        var x = touch.screenX;
        var width = screen.width;
        if (x < width/2) {
            jump();
        } else if (x >= width/2 && x <= 3*width/4) {
            left();
        } else {
            right();
        }
    }
    sendState(x,width);
}

function touchEndHandler(event) {
    event.preventDefault();
    var touch = event.changedTouches[0];
    var x = touch.screenX;
    var width = screen.width;
    if (x < width/2) {
        noJump();
    } else {
        noMove();
    }
    sendState(x,width);
}

window.addEventListener('touchstart',touchStartHandler,false);
window.addEventListener('touchmove',touchStartHandler,false);
window.addEventListener('touchend',touchEndHandler,false);

/*
var primus =  Primus.connect('http://www.jazzberrygames.com:1310/', {
        reconnect: {
            maxDelay: 150000,
            minDelay: 500,
            retries: 10
        }
    }
);
*/
//window.addEventListener('deviceorientation',deviceOrientationHandler,false);
