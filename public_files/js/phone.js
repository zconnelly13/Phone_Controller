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

alert(queryString.ip);

var data = {'ip':queryString.ip};
primus.write(data);

window.addEventListener('devicemotion',deviceMotionHandler,false);
window.addEventListener('deviceorientation',deviceOrientationHandler,false);
