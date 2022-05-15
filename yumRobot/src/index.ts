var stdin = process.openStdin();

class RobotPlacement{
  x: number = 0;
  y: number = 0;
  f: string = "";
  isValid: boolean = false;
}


class Robot {
  private xPos: number = 0;
  private yPos: number = 0;
  private fPos: string = "";
  private placed: boolean = false;

  public setPlacedState(state: boolean){
    this.placed = state;
  }

  public getPlacedState(){
    return this.placed;
  }

// Place robot

public placeRobot(plc: RobotPlacement){
  if(this.validateRobotPlacement(plc)){
    this.xPos = plc.x;
    this.yPos = plc.y;
    this.fPos = plc.f;
    this.placed = true;
  }
}

private validateRobotPlacement(plc: RobotPlacement): boolean{
  var isPosValid = false;
  var isDirValid = false;

  // Place robot with 5 x 5 array
  if (plc.x < 6 && plc.x >= 0 && plc.y < 6 && plc.y >= 0){
    isPosValid = true;
  }

  // Check robot directions
  if (plc.f === "NORTH" || plc.f === "SOUTH" || plc.f === "EAST" || plc.f === "WEST"){
    isDirValid = true;
  }
  return isPosValid && isDirValid;
}

  // Check direction and position of the robot before move
  
public moveRobot(){

  if (this.fPos === "NORTH"){
    if (this.yPos < 5 ){
       this.yPos++;
    }
    else console.log("You are at the edge of the table, Change directions to move")
  }
  else if (this.fPos === "SOUTH"){
    if (this.yPos > 0){
      this.yPos--;
    }
    else console.log("You are at the edge of the table, Change directions to move")
  }
  else if (this.fPos === "EAST"){
    if (this.xPos < 5){
      this.xPos++;
    }
    else console.log("You are at the edge of the table, Change directions to move")
  }
  else if (this.fPos === "WEST"){
    if (this.xPos > 0){
      this.xPos--;
    }
    else console.log("You are at the edge of the table, Change directions to move")
  }
}

// Robot facing

public facingLeft(){
  if (this.fPos === "NORTH"){
    this.fPos = "WEST";
  }
  else if (this.fPos === "SOUTH"){
    this.fPos = "EAST";
  }
  else if (this.fPos === "EAST"){
    this.fPos = "NORTH";
  }
  else if (this.fPos === "WEST"){
    this.fPos = "SOUTH";
  }
}

public facingRight(){
  if (this.fPos === "NORTH"){
    this.fPos = "EAST";
  }
  else if (this.fPos === "SOUTH"){
    this.fPos = "WEST";
  }
  else if (this.fPos === "EAST"){
    this.fPos = "SOUTH";
  }
  else if (this.fPos === "WEST"){
    this.fPos = "NORTH";
  }
 }

 public report(){
   console.log("This is your Location:", `${this.xPos}, ${this.yPos}, ${this.fPos}`);
 }

}



// Instantiate robot globally 
var yumRobot: Robot = new Robot()

stdin.addListener("data", function(d){
  var input = d.toString().trim();
  var plc: RobotPlacement = awaitPlacement(input);

  // Place robot
  if(plc.isValid){
    yumRobot.placeRobot(plc);
}

// Commands
if (yumRobot.getPlacedState()){
  if (input === "MOVE"){
    yumRobot.moveRobot();
  }

  if (input === "LEFT"){
    yumRobot.facingLeft();
  }
  if(input === "RIGHT"){
    yumRobot.facingRight();
  }
  if (input === "REPORT"){
    yumRobot.report();
  }
}
});

function awaitPlacement(d: any){
  var array = d.replace("PLACE", "");
  var inArray = array.split(",");
  var plc: RobotPlacement = new RobotPlacement();

  if(inArray.length == 3){
    plc.x = inArray[0];
    plc.y = inArray[1];
    plc.f = inArray[2];
    plc.isValid = true;
  }
  return plc;
}

