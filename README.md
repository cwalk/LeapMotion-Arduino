## Introduction

Leap Motion projects involving the Arduino

## Setup

Make sure you have nodejs and npm installed.

Make sure you have the Leap Motion SDK installed: https://developer.leapmotion.com/get-started

This is all using the V2 Desktop (and was developed on OSX Yosemite).

Install cylonjs, a robotics javascript framework. More info here: https://cylonjs.com

For more info on getting your Arduino environment set up, check out: http://cylonjs.com/documentation/platforms/arduino/

Clone the directory: `git clone https://github.com/cwalk/LeapMotion-Arduino/`

Navigate to the directory and do an `npm install` and you should have cylon, cylon-firmata, and cylon-leapmotion.

## Usage

Run the files by using the command `node filename.js`

Each file does something a little different, so feel free to look through the code. They mostly differ in what snesor is being used in conjunction with the Leap Motion

I will include the circuit diagrams below, with a small description about what the file does.

## Blink

`blink.js` turns on a LED connected to pin 13 when the Leap Motion detects your hand is over it

## Blink2

`Blink2.js` turns on 2 LEDs connected to pins 13 and 9 when the Leap Motion detects your hand is over it

## gestureBlink

`gestureBlink.js` turns on 4 different LEDs, connected to pins 8-11 depending on what gesture is identified by the Leap Motion.

## servo

`servo.js` with a servo similar to this one: https://www.adafruit.com/products/1967 connected on pins 3 and 13, this script just rotates the servos at a specfied angle over and over when it detects your hand over the Leap Motion.

## singleArmServo

`singleArmServo.js` 

## YouTube

YouTube: 
