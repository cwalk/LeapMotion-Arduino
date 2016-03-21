const Prompt = require('prompt');
const Cylon = require('cylon');
const util = require('util');
const EventEmitter = require('events')

// Getting input stuff
Prompt.start();




// Cylon Stuff
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

        my.servo3.angle(90);
        my.servo13.angle(45);

        my.emitter = new MyEmitter();
        my.emitter.on('pitch', function(pitch) {
            console.log('  Moving servo 13 to', pitch);
            my.servo13.angle(my.servo13.safeAngle(( (180/Math.PI) * pitch )));
        });

        my.emitter.on('yaw', function(yaw) {
            console.log('  Moving servo 3 to', yaw);
            my.servo3.angle(my.servo3.safeAngle(( (180/Math.PI) * yaw )));
        });

        my.emitter.on('newPosition', (x,y,z) => {
            my.emitter.emit('pitch', pitch(x, y, z));
            my.emitter.emit('yaw', yaw(x, y));
        });

        Cylon.devices = my;
        console.log("Servo Motors are active");

        Prompt.get(['x', 'y', 'z'], function (err, result) {
            if(err) {return onErr(err); }

            console.log('Command-line input received:');
            console.log('  X:', x);
            console.log('  Y:', y);
            console.log('  Z:', z);

            Cylon.robots.servoBot.emitter.emit('newPosition', x, y, z);
        });

    }
}).start();

function yaw(x, y) {
    return Math.atan(y/x);
}

function pitch(x, y, z) {
    return Math.atan((Math.sqrt(x*x + y*y) / z));
}

function MyEmitter() {
    EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);