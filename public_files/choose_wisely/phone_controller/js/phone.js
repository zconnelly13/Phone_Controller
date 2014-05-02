var state = {
    jump: false,
    direction: false
};

function sendState(x, width) {
    primus.write(state);
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

var queryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

var primus =  Primus.connect('http://www.jazzberrygames.com:1310/', {
        reconnect: {
            maxDelay: 150000,
            minDelay: 500,
            retries: 10
        }
    }
);

var data = {'ip':queryString.ip};
primus.write(data);
