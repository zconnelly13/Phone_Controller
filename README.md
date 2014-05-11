Phone Controller
================

Use your phone to control browser-based html5 games!

###Pong Demo
To play a 2-player pong demo go to [http://www.jazzberrygames.com:2313/pong/index.html](http://www.jazzberrygames.com:2313/pong/index.html)

Use your favorite QR Code scanner to connect player 1 and player 2 and have at it.

Your phone's device orientation controls the paddle :)

This could use quite a bit of polish but it's an interesting proof of concept.

###Technical Stuff
####High Level Overview
We are going to attempt to use [CocoonJS](https://www.ludei.com/cocoonjs/) to write for mobile. We like cocoonJS because it's javascript, cross platform, and meant for games. The popular alternative to CocoonJS is Phonegap, but we don't like Phonegap because it's kind of clunky and terrible and the scaling is weird. Plus the development cycle requires time-consuming compilations between testing.

Anyway.

We're also going to try to use [Primus](https://github.com/primus/primus) for real-time communication with a NodeJS backend.

The proof of concept will be when we can access accelerometer data on both android and ios and display it in the browser with reasonable latency. Under a 300ms delay would be best.

For this we should just use the phones browser if possible. Packaging with cocoonjs is optional.

The mvp will be when we can control a simple game like Choose Wisely from the phone with low enough latency that its playable.

The end goal is to use this to make a new genre of game or to create some sort of social atmosphere.

####Proof of Concept
The first thing to do is to build a webpage that simply displays accelerometer data. How to do this is outlined in [this blog post](http://www.html5rocks.com/en/tutorials/device/orientation/)

After that we should use [Primus](https://github.com/primus/primus) for real time communication. So we should be able to communicate this same information to another screen (we're not going to worry about being able to do this on more than one device)

Once we can do this with reasonable latency, we should have our proof of concept!

*Add the Event Listener*
```
window.addEventListener('devicemotion', deviceMotionHandler, false);
```

*Somewhere to display the information*
```
<div id='output'></div>
```

*Access the Rotation Data and Display it*
```
event.rotationRate.alpha // Direction
event.rotationRate.beta // Front/Back
event.rotationRate.gamma // Left/Right
```

After this we have set up a browser-side "client" that simply reads the data. And this is our proof of concept.

####Minimum Viable Product

Now that we have shown that this is feasable, the next step is to apply this to a game. The game of choice will be "Choose Wisely" because it has simple controls and will require a small amount of modification to work with the phone as the controller.

The first thing that needs to be done is Choose Wisely needs to be imported into the static folder of this project.

Then controls need to be implemented on the phone (this is not communication via Primus but simply the controls). The right thumb should be used for movement and the left for jumping. The screen is divided vertically into four quarters. If there is a touch in the first two quarters (the left half of the screen) this is jumping. If there is a touch in the 3rd quarter the character should move left and the 4th quarter the character should move right.
![Phone Controls](http://i.imgur.com/sqfir2Q.png)

Next the Choose Wisely game needs to connect to the Primus server, thus providing it's IP. The Primus server should store a mapping of the browser's IP to the spark. Choose wisely should then display a link (this will eventually be a QR code cuz we fancy) that goes to the node server with a get request that is the ip address of the browser (this can be hashed later).

Now the phone will go to a url that looks like "/phone.html?ip=76.128.91.10". The phone will then connect to the Primus server and send along the ip. Primus can now have an "on('data')" function that looks up the spark associated with that IP address and spark.write's the data to the browser.

Finally the browser needs to appropriately handle the commands it receives.

###Applying This to a Single Player Game

Now that we've prooved it's feasable, we need to explore wether or not it's enjoyable to play on the phone. We're going to take a classic game (like tetris or pong or something) and see if it's fun to play with the phone connected to the computer. 

There were also some weird problems with the ip address being similar, but we're not going to worry about that right now.

We need to be able to send a text to the phone or scan a QR code to access the game. We'll also need a controller layout for the phone.

For texting it seems we can use [Twilio](https://www.twilio.com/user/account/developer-tools/api-explorer/message-create) at least for now, as they are integrated nicely with Node.js. [Tropo](https://www.tropo.com/pricing/) and [Zeep](http://www.zeepmobile.com/) would also be worth a look.

For the QR code [this stack overflow question](http://stackoverflow.com/questions/4542632/qr-code-generation-library-in-javascript) contains a rudimentary library (but that's all we really need). [But this looks much better](http://davidshimjs.github.io/qrcodejs/).
