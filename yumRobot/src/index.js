"use strict";
var stdin = process.openStdin();
class RobotPlacement {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.f = "";
        this.isValid = false;
    }
}
class Robot {
    constructor() {
        this.xPos = 0;
        this.yPos = 0;
        this.fPos = "";
        this.placed = false;
    }
    setPlacedState(state) {
        this.placed = state;
    }
    getPlacedState() {
        return this.placed;
    }
    // Place robot
    placeRobot(plc) {
        if (this.validateRobotPlacement(plc)) {
            this.xPos = plc.x;
            this.yPos = plc.y;
            this.fPos = plc.f;
            this.placed = true;
        }
    }
    validateRobotPlacement(plc) {
        var isPosValid = false;
        var isDirValid = false;
        // Place robot with 5 x 5 array
        if (plc.x <= 5 && plc.x >= 0 && plc.y <= 5 && plc.y >= 0) {
            isPosValid = true;
        }
        // Check robot directions
        if (plc.f === "NORTH" || plc.f === "SOUTH" || plc.f === "EAST" || plc.f === "WEST") {
            isDirValid = true;
        }
        return isPosValid && isDirValid;
    }
    // Check direction and position of the robot before move
    moveRobot() {
        if (this.fPos === "NORTH") {
            if (this.yPos <= 5) {
                this.yPos++;
            }
        }
        else if (this.fPos === "SOUTH") {
            if (this.yPos >= 0) {
                this.yPos--;
            }
        }
        else if (this.fPos === "EAST") {
            if (this.xPos <= 5) {
                this.xPos++;
            }
        }
        else if (this.fPos === "WEST") {
            if (this.xPos >= 0) {
                this.xPos--;
            }
        }
    }
    // Robot facing
    facingLeft() {
        if (this.fPos === "NORTH") {
            this.fPos = "WEST";
        }
        else if (this.fPos === "SOUTH") {
            this.fPos = "EAST";
        }
        else if (this.fPos === "EAST") {
            this.fPos = "NORTH";
        }
        else if (this.fPos === "WEST") {
            this.fPos = "SOUTH";
        }
    }
    facingRight() {
        if (this.fPos === "NORTH") {
            this.fPos = "EAST";
        }
        else if (this.fPos === "SOUTH") {
            this.fPos = "WEST";
        }
        else if (this.fPos === "EAST") {
            this.fPos = "SOUTH";
        }
        else if (this.fPos === "WEST") {
            this.fPos = "NORTH";
        }
    }
    report() {
        console.log(`${this.xPos}, ${this.yPos}, ${this.fPos}`);
    }
}
// Instantiate robot globally 
var yumRobot = new Robot();
stdin.addListener("data", function (d) {
    var input = d.toString().trim();
    var plc = awaitPlacement(input);
    // Place robot
    if (plc.isValid) {
        yumRobot.placeRobot(plc);
    }
    // Commands
    if (yumRobot.getPlacedState()) {
        if (input === "MOVE") {
            yumRobot.moveRobot();
        }
        if (input === "LEFT") {
            yumRobot.facingLeft();
        }
        if (input === "RIGHT") {
            yumRobot.facingRight();
        }
        if (input === "REPORT") {
            yumRobot.report();
        }
    }
});
function awaitPlacement(d) {
    var array = d.replace("PLACE", "");
    var inArray = array.split(",");
    var plc = new RobotPlacement();
    if (inArray.length == 3) {
        plc.x = inArray[0];
        plc.y = inArray[1];
        plc.f = inArray[2];
        plc.isValid = true;
    }
    return plc;
}
