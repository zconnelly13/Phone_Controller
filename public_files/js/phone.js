function deviceMotionHandler(event) {
    var rotation = event.rotationRate;
    var alpha = Math.round(rotation.alpha*10);
    var beta  = Math.round(rotation.beta*10);
    var gamma = Math.round(rotation.gamma*10);
    var data = 'Alpha: ' + alpha + '<br />Beta: ' + beta + '<br />Gamma: ' + gamma;
    document.getElementById('output').innerHTML = data
}

function deviceOrientationHandler(event) {
    var alpha = Math.round(event.alpha*10);
    var beta  = Math.round(event.beta*10);
    var gamma = Math.round(event.gamma*10);
    var data = 'Alpha: ' + alpha + '<br />Beta: ' + beta + '<br />Gamma: ' + gamma;
    document.getElementById('currentOrientation').innerHTML = data
    primus.write(data);
}

var primus =  Primus.connect('http://www.jazzberrygames.com:1310/', {
        reconnect: {
            maxDelay: 150000,
            minDelay: 500,
            retries: 10
        }
    }
);

window.addEventListener('devicemotion',deviceMotionHandler,false);
window.addEventListener('deviceorientation',deviceOrientationHandler,false);
