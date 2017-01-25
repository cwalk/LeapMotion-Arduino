## Introduction

Leap Motion projects involving the Arduino

## YouTube

Playlist: https://www.youtube.com/playlist?list=PLgAD2y-6wgwq3oRHAygzXA1gSvBQISCYR

-LEDs: https://www.youtube.com/watch?v=oiOqpjFBkfw

-1 servo: https://www.youtube.com/watch?v=PJ9RhOnxawc

-2 servos: https://www.youtube.com/watch?v=Hj7f2HDJma0

-IR sensor: https://www.youtube.com/watch?v=V7-19bcROe0

## Setup

Make sure you have nodejs and npm installed.

Make sure you have the Leap Motion SDK installed: https://developer.leapmotion.com/get-started

This is all using the V2 Desktop (and was developed on OSX Yosemite).

Install cylonjs, a robotics javascript framework. More info here: https://cylonjs.com

For more info on getting your Arduino environment set up, check out: http://cylonjs.com/documentation/platforms/arduino/

For more info on Leap Motion, check out: http://cylonjs.com/documentation/drivers/leapmotion/

Clone the directory: `git clone https://github.com/cwalk/LeapMotion-Arduino`

Navigate to the directory and do an `npm install` and you should have cylon, cylon-firmata, and cylon-leapmotion.

## Usage

Run the files by using the command `node filename.js`

Each file does something a little different, so feel free to look through the code. They mostly differ in what snesor is being used in conjunction with the Leap Motion

I will include the circuit diagrams below, with a small description about what the file does.

## Blink

`blink.js` turns on a LED connected to pin 13 when the Leap Motion detects your hand is over it

![Blink Circuit Diagram](/blink_bb.png?raw=true "Blink Circuit Diagram")

## Blink2

`Blink2.js` turns on 2 LEDs connected to pins 13 and 9 when the Leap Motion detects your hand is over it

![Blink2 Circuit Diagram](/blink2_bb.png?raw=true "Blink2 Circuit Diagram")

## gestureBlink

`gestureBlink.js` turns on 4 different LEDs, connected to pins 8-11 depending on what gesture is identified by the Leap Motion.

![gestureBlink Circuit Diagram](/gestureBlink_bb.png?raw=true "gestureBlink Circuit Diagram")

## servo

`servo.js` with a servo similar to this one: https://www.adafruit.com/products/1967 connected on pins 3 and 13, this script just rotates the servos at a specfied angle over and over when it detects your hand over the Leap Motion.

Something important to note with all scripts involving the servo motors (`servo.js`, `singleArmServo.js`, and `doubleArmServo.js`) you need to wait until the servos are "ready." After you run the node script, keep your hands outside the view of the Leap Motion. Once the servos are "ready" you will see them twitch slightly, and hear the electricity running through them. Now you can put your hand over the view of the Leap Motion. Use the YouTube videos as reference if you are still confused.

![Servo Circuit Diagram](/servo.png?raw=true "Servo Circuit Diagram")

## singleArmServo

`singleArmServo.js` has the same servo connected to pins 3 and 13, but actually mimics your hands position. Your hand's Pitch and Yaw will be translated as the Pitch and Yaw in the servo mount.

`lookAtPositions.js` is similar to `singleArmServo.js` but you can enter what x,y,z position you want the servo to point to, and it rotates to that position. You don't use the Leap Motion in this program.

Diagram is same as `servo.js`

## doubleArmServo

`doubleArmServo.js` is the same as `singleArmServo.js` but this uses 2 servo mounts, and actually mimics both of your hands as interpretted through the Leap Motion. If only 1 hand is present, only 1 servo will move (no matter which hand you use, the same servo will move if only 1 hand is present). If you put both hands over the leap motion, each servo mount will mimic a hand. 

I recommend putting the servo mounts parallel horizontally in front of you and the Leap Motion, so it's very easy to see how they mimic your hands. First figure out which servo moves when only 1 hand is present. Then put that on the left side, and the other servo on the right side. Then, run the script, and when the servos are ready, put your left hand into the view of the Leap Motion, the left servo should mimic it. **Now** put your right hand in the view of the Leap Motion, and the right servo should mimic your right hand. Use the YouTube videos as reference.

![Double Servo Circuit Diagram](/doubleArmServo_bb.png?raw=true "Double Servo Circuit Diagram")

## irProximitySensor and sonarFinder

`irProximitySensor.js` and `sonarFinder.js` use an infrared proximity and maxbotix sonar sensor respectively, to calculate the distance from an object, while mounted on a servo arm, which can be controlled by the Leap Motion.

![IR Proximity Circuit Diagram](/irProximitySensor_bb.png?raw=true "IR Proximity Circuit Diagram")

![Sonar Circuit Diagram](/sonarFinder_bb.png?raw=true "Sonar Circuit Diagram")
