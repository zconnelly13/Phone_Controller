var queryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
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
var player = queryString.player;
primus.write(data);

function deviceOrientationHandler(e) {
    var x = e.alpha;
    var y = e.beta;
    var z = e.gamma;
    var average = (x+y+z)/3;
    primus.write({'motion':z, 'player':player});
}

//window.addEventListener('devicemotion',deviceMotionHandler,false);
window.addEventListener('deviceorientation',deviceOrientationHandler,false);
