function Rover() {
    //size of the plateau
    this.xMax = 0;
    this.yMax = 0;
    //current position and direction
    this.x = 0;
    this.y = 0;
    this.direction = 'N';
    //moving commands
    this.commands = '';
    //status
    this.rip = false;
}

Rover.prototype.move = function() {
    for (var command of this.commands) {
        this.exec(command);
        if (this.rip)
            break;
    }
    return this.rip ? 'RIP' : `${this.x} ${this.y} ${this.direction}`;
}

//execute one command
Rover.prototype.exec = function(command) {
    if (command == 'M')
        this.moveForward();
    else
        this.turn(command);
}

Rover.prototype.turn = function(turnDirection) {
    var directions = ['N', 'E', 'S', 'W'];
    var index = directions.indexOf(this.direction);
    if (turnDirection == 'L') {
        index -= 1;
        if (index < 0)
            index += 4;
    } else if (turnDirection == 'R') {
        index += 1;
        if (index >= 4)
            index -= 4;
    }
    this.direction = directions[index];
}

Rover.prototype.moveForward = function() {
    switch (this.direction) {
        case 'N':
            this.y += 1;
            break;
        case 'E':
            this.x += 1;
            break;
        case 'S':
            this.y -= 1;
            break;
        case 'W':
            this.x -= 1;
            break;
    }
    this.rip = (this.y < 0) || (this.y > this.yMax) || (this.x < 0) || (this.x > this.xMax);
}

function MarsRovers() {
    //size of the plateau
    this.size = { x: 0, y: 0 };
    //rovers
    this.rovers = [];
}

MarsRovers.prototype.init = function(input) {
    if (!(input instanceof Array))
        throw 'unexpected input, should be an array';
    if (input.length == 0)
        throw 'unexpected input, empty array';
    var size = input[0];
    if (typeof(size) != 'string')
        throw 'unexpected input, first line should be a string of two integers';
    var sizeMatch = size.match(/^(\d)\s+(\d)$/);
    if (sizeMatch == null)
        throw 'unexpected input, first line should be a string of two integers';
    var x = parseInt(sizeMatch[1]),
        y = parseInt(sizeMatch[2]);
    if ((x <= 0) || (y <= 0))
        throw 'unexpected input, plateau size should be positive';
    this.size.x = x;
    this.size.y = y;
    for (var i = 1; i + 1 < input.length; i += 2) {
        var position = input[i];
        var positionMatch = position.match(/^(\d)\s+(\d)\s+([N|E|S|W])$/);
        if (positionMatch == null) {
            console.error('invalid position: ' + position);
            continue;
        }
        var commands = input[i + 1];
        var commandsMatch = commands.match(/^[LMR]+$/);
        if (commandsMatch == null) {
            console.error('invalid commands: ' + commands);
            continue;
        }
        var rover = new Rover();
        rover.xMax = x;
        rover.yMax = y;
        rover.x = parseInt(positionMatch[1]);
        rover.y = parseInt(positionMatch[2]);
        rover.direction = positionMatch[3];
        rover.commands = commands;
        this.rovers.push(rover);
    }
}

MarsRovers.prototype.move = function() {
    var result = [];
    for (var rover of this.rovers) {
        try {
            var roverResult = rover.move();
            if (roverResult)
                result.push(roverResult);
        } catch (error) {
            console.error(error);
        }
    }
    return result;
}

module.exports = MarsRovers;