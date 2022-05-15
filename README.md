# Yum-Robot :) Follow the below guidelines to run the project

## Installation
Follow the below to get started

```bash
git clone {{repo}}
```

```bash
$ npm i --save -dev @types/node
```

## Running the simulation in the terminal
 Open the repo folder in your terminal 

```bash 
cd yumRobot folder
```

```bash 
$ npm run devYum
```

### Find commands to test the functionality in commands.txt file 

## Rules
* Inputs should all be in uppercase 
* Lowercase inputs or camelcase will be ignored

## Key Notes
* PLACE: Will position the starting point of the robot
* FACING: Direction the robot is facing, NORTH,SOUTH,WEST or EAST
* LEFT / RIGHT: will move the robot 90 degrees left or right from the current position

### Example
```bash
        - PLACE 0,1,NORTH
        - LEFT
        - REPORT
```