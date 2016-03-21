const Cylon = require('cylon');
const EventEmitter = require('events');
const util = require('util');

Cylon.robot({
  name: 'servoBot',

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411' } // /dev/cu.usbmodem1411 /dev/cu.usbmodem1451
  },

  devices: {
    servo3: { driver: 'servo', pin: 3 },
    servo13: { driver: 'servo', pin: 13 },
    sensor: { driver: 'ir-range-sensor', pin: 0, model: 'gp2y0a41sk0f' }
  },

  work: function(my) {

    my.servo3.angle(90);
    my.servo13.angle(45);

    my.emitter = new MyEmitter();
    my.emitter.on('pitch0', function(pitch) {
      my.servo13.angle(my.servo13.safeAngle(( (180/Math.PI) * pitch )));
    });

    my.emitter.on('yaw0', function(yaw) {
      my.servo3.angle(my.servo3.safeAngle(( (180/Math.PI) * yaw )));
    });

    Cylon.devices = my;
    console.log("Servo Motors are active");

    every((1).seconds(), function(){
      var range = my.sensor.range();
      console.log('Range ===>', range);
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

    my.leapmotion.on('frame', function (frame) {

      if (frame.hands.length > 0 && Cylon.devices) {

        Cylon.devices.emitter.emit('pitch0', frame.hands[0].pitch());
        Cylon.devices.emitter.emit('yaw0',  (Math.PI/2 - frame.hands[0].yaw() ));

      }
    });


  }

}).start();

function MyEmitter() {
  EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);