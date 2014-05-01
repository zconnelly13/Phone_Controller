function deviceMotionHandler(event) {
    var rotation = event.rotationRate;
    var alpha = Math.round(rotation.alpha*10);
    var beta  = Math.round(rotation.beta*10);
    var gamma = Math.round(rotation.gamma*10);
    var data = 'Alpha: ' + alpha + '<br />Beta: ' + beta + '<br />Gamma: ' + gamma;
    document.getElementById('output').innerHTML = data
}

window.addEventListener('devicemotion',deviceMotionHandler,false);
