var primus = Primus.connect('http://www.jazzberrygames.com:1310/', {
        reconnect: {
            maxDelay: 150000,
            minDelay: 500,
            retries: 10
        }
    }
);

primus.on('data',function message(data) {
    //document.getElementById('currentOrientation').innerHTML = data;
});

function load() {
    document.getElementById('sendmeatext').addEventListener('click',function() {
        var number = document.getElementById('phoneNumber').value;
        number = number.replace(/[^\d]/gi,"");
        var url = "http://www.google.com/";
        var data = {
            'phoneNumber': number,
            'url': url
        };
        primus.write(data);
    });
}
window.addEventListener('load',load,false);
