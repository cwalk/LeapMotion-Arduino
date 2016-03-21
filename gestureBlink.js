"use strict";

var Cylon = require("cylon");

var fade = 1;
var brightness = 0;

Cylon.robot({

  connections: {
      leapmotion: { adaptor: "leapmotion" },
      arduino: { adaptor: "firmata", port: "/dev/cu.usbmodem1411" } // /dev/cu.usbmodem1411 /dev/cu.usbmodem1451
  },

    devices: {
      led11: { driver: "led", pin: 11, connection: "arduino" },
      led10: { driver: "led", pin: 10, connection: "arduino" },
      led9: { driver: "led", pin: 9, connection: "arduino" },
      led8: { driver: "led", pin: 8, connection: "arduino" },
      leapmotion: { driver: 'leapmotion' }
    },

  work: function(my) {
    my.leapmotion.on('frame', function(frame) {
      // if (frame.hands.length > 0) {
      var gest = frame.data.gestures;
      gest.forEach(function (gesture) {
        switch(gesture.type) {
          case "circle":
              //console.log("Circle Gesture");
              switch (gesture.state){
                case "start":
                    console.log("Turning led11 On for Circle start");
                    brightness = 0;
                    my.led11.turnOn();
                    break;
                case "update":
                    if (brightness === 0) { fade = 1;} else if (brightness === 255) { fade = -1; }
                    console.log("Turning led11 brightness from: " + my.led11.currentBrightness());
                    brightness += fade;
                    my.led11.brightness(brightness);
                    console.log("to: " + my.led11.currentBrightness());
                    if (brightness === 0) { fade = 1;} else if (brightness === 255) { fade = -1; }
                    break;
                case "stop":
                    console.log("Turning led11 Off for Circle stop");
                    my.led11.turnOff();
                    my.led11.brightness(0);
                    break;
              }
              break;
          case "keyTap":
              console.log('Toggling led10 for keyTap Gesture');
              my.led10.toggle();
              break;
          case "screenTap":
              console.log('Toggling led9 for screenTap Gesture');
              my.led9.toggle();
              break;
          case "swipe":
              switch (gesture.state){
                case "start":
                    console.log("Turning led8 On for Swipe start");
                    my.led8.turnOn();
                    break;
                case "stop":
                    console.log("Turning led8 Off for Swipe stop");
                    my.led8.turnOff();
                    break;
              }
              break;
        }
      });
    });
  }
    
}).start();