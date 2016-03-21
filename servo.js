var angle = 45;

var Cylon = require('cylon');

Cylon.robot({
  name: 'servoBot',

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411' } // /dev/cu.usbmodem1411 /dev/cu.usbmodem1451
  },

  devices: {
    servo3: { driver: 'servo', pin: 3 },
    servo13: { driver: 'servo', pin: 13 }
  },

  work: function(my) {

    leap.on('frame', function(frame) {
        if (frame.hands.length > 0) {
            console.log("Turning angle for servo3 from: " + servos.servo3.currentAngle() + " to: " + angle);
            servos.servo3.angle(angle);
            console.log("Turning angle for servo13 from: " + servos.servo13.currentAngle() + " to: " + angle);
            servos.servo13.angle(angle);
            //servos.servo3.angle(frame.hands[0].pitch);
          } else {
            console.log("Turning angle for servo3 back from: " + servos.servo3.currentAngle() + " to: " + angle);
            servos.servo3.angle(0);
            console.log("Turning angle for servo13 back from: " + servos.servo13.currentAngle() + " to: " + angle);
            servos.servo13.angle(0);
          }

          angle = angle += 0.5;
          if (angle > 135) {
            angle = 45;
          }
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

servos = Cylon.MCP.robots.servoBot.devices;
leap = Cylon.MCP.robots.leapmotionRobot.devices.leapmotion;