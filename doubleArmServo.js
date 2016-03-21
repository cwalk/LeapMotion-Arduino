const Cylon = require('cylon');
const EventEmitter = require('events');
const util = require('util');

Cylon.robot({
  name: 'servoBot',

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411' } // /dev/cu.usbmodem1411 /dev/cu.usbmodem1451
  },

  devices: {
    servo10: { driver: 'servo', pin: 10 }, //3 to 10
    servo9: { driver: 'servo', pin: 9 }, //13 to 9
    servo6: { driver: 'servo', pin: 6 }, //5 to 6
    servo3: { driver: 'servo', pin: 3 } //6 to 3
  },

  work: function(my) {

    my.servo10.angle(90);
    my.servo9.angle(45);
    my.servo6.angle(90);
    my.servo3.angle(45);

    my.emitter = new MyEmitter();
    my.emitter.on('pitch0', function(pitch) {
      my.servo9.angle(my.servo9.safeAngle(( (180/Math.PI) * pitch )));
    });

    my.emitter.on('yaw0', function(yaw) {
      my.servo10.angle(my.servo10.safeAngle(( (180/Math.PI) * yaw )));
    });

    my.emitter.on('pitch1', function(pitch) {
      my.servo3.angle(my.servo3.safeAngle(( (180/Math.PI) * pitch )));
    });

    my.emitter.on('yaw1', function(yaw) {
      my.servo6.angle(my.servo6.safeAngle(( (180/Math.PI) * yaw )));
    });

    Cylon.devices = my;
    console.log("Servo Motors are active");

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

    my.leapmotion.on('frame', function (frame) {

      if (frame.hands.length > 0 && Cylon.devices) {

        Cylon.devices.emitter.emit('pitch0', frame.hands[0].pitch());
        Cylon.devices.emitter.emit('yaw0',  (Math.PI/2 - frame.hands[0].yaw() ));

      } if (frame.hands.length > 1 && Cylon.devices) {

        Cylon.devices.emitter.emit('pitch1', frame.hands[1].pitch());
        Cylon.devices.emitter.emit('yaw1',  (Math.PI/2 - frame.hands[1].yaw() ));

      }
    });


  }

}).start();

function MyEmitter() {
  EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);