class Rover {
    constructor() {
        //current position and direction
        this.x = 0;
        this.y = 0;
        this.direction = 'N';
        //moving commands
        this.commands = '';
        //status
        this.rip = false;
        //check functions
        this.task;
    }
    move() {
            for (var command of this.commands) {
                this.exec(command);
                if (this.rip)
                    break;
            }
            var pos = `${this.x} ${this.y} ${this.direction}`;
            return this.rip ? (pos + ' RIP') : pos;
        }
        //execute one command
    exec(command) {
        if (command == 'M') {
            var newPos = this.moveForward();
            if (this.task.canMoveTo(newPos)) {
                if (this.task.willRip(newPos)) {
                    this.rip = true;
                } else {
                    this.x = newPos.x;
                    this.y = newPos.y;
                }
            }
        } else
            this.turn(command);
    }
    turn(turnDirection) {
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
    moveForward() {
        var newPos = { x: this.x, y: this.y };
        switch (this.direction) {
            case 'N':
                newPos.y += 1;
                break;
            case 'E':
                newPos.x += 1;
                break;
            case 'S':
                newPos.y -= 1;
                break;
            case 'W':
                newPos.x -= 1;
                break;
        }
        return newPos;
    }
}

class MarsTask {
    constructor() {
        //size of the plateau
        this.size = { x: 0, y: 0 };
        //rovers
        this.rovers = [];
        //beacons
        this.blackholes = [];
    }
    canMoveTo(pos) {
        for (var hole of this.blackholes) {
            if ((pos.x === hole.x) && (pos.y === hole.y))
                return false;
        }
        return true;
    }
    willRip(pos) {
        var rip = (pos.y < 0) || (pos.y > this.size.y) || (pos.x < 0) || (pos.x > this.size.x);
        if (rip)
            this.blackholes.push(pos);
        return rip;
    }
    init(input) {
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
            rover.x = parseInt(positionMatch[1]);
            rover.y = parseInt(positionMatch[2]);
            rover.direction = positionMatch[3];
            rover.commands = commands;
            rover.task = this;
            this.rovers.push(rover);
        }
    }
    move() {
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
}

export { Rover, MarsTask }