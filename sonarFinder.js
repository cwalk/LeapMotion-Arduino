var frameCount = 0;             // Tracks number of frames leap receives

var Cylon = require('cylon');

Cylon.robot({
  name: 'sonarBot',

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411' } // /dev/cu.usbmodem1411 /dev/cu.usbmodem1451
  },

  devices: {
    maxbotix: { driver: 'maxbotix', pin: 1 }
  },

  work: function(my) {

    leap.on('frame', function(frame) {
        if (frame.hands.length > 0) {
            my.maxbotix.range(function(err, data) {
              console.log(err || "range: " + data);
            });
        } 
        frameCount++;
        if(frameCount % 20 != 0) return;
    });

  }
}).start();

Cylon.robot({
  name: 'leapmotionRobot',

  connections: {
    leapmotion: { adaptor: "leapmotion" }
  },

  devices: {
    leapmotion: { driver: "leapmotion" }
  },

  work: function(my) {
  }
}).start();

leap = Cylon.MCP.robots.leapmotionRobot.devices.leapmotion;

/*"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/cu.usbmodem1411" }
  },

  devices: {
    maxbotix: { driver: "maxbotix", pin: 1 }
  },

  work: function(my) {
    every((1).seconds(), function() {
      my.maxbotix.range(function(err, data) {
        console.log(err || "range: " + data);
      });
    });
  }
}).start();*/