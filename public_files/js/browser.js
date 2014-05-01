var primus = Primus.connect('http://www.jazzberrygames.com:1310/', {
        reconnect: {
            maxDelay: 150000,
            minDelay: 500,
            retries: 10
        }
    }
);

primus.on('data',function message(data) {
    document.getElementById('currentOrientation').innerHTML = data;
});
