Phone Controller
================

Use your phone to control browser-based html5 games!

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
