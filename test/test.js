const mars = require('../index.js');
const should = require('should');

const Rover = mars.Rover;
const MarsRovers = mars.MarsRovers;

describe('rover-moveforward', function() {
    var r = new Rover();
    r.x = 2;
    r.y = 2;
    it('move north', function() {
        r.direction = 'N';
        var newPos = r.moveForward();
        should(newPos.x).equal(2);
        should(newPos.y).equal(3);
    });
    it('move south', function() {
        r.direction = 'S';
        var newPos = r.moveForward();
        should(newPos.x).equal(2);
        should(newPos.y).equal(1);
    });
    it('move west', function() {
        r.direction = 'W';
        var newPos = r.moveForward();
        should(newPos.x).equal(1);
        should(newPos.y).equal(2);
    });
    it('move east', function() {
        r.direction = 'E';
        var newPos = r.moveForward();
        should(newPos.x).equal(3);
        should(newPos.y).equal(2);
    });
});

describe('check-before-move', function() {
    var r = new Rover();
    r.x = 2;
    r.y = 2;
    r.direction = 'N';
    r.willRip = function() { return false };
    it('can not move', function() {
        r.canMoveTo = function(pos) {
            return false;
        };
        r.exec('M');
        should(r.x).equal(2);
        should(r.y).equal(2);
    });
    it('can move', function() {
        r.canMoveTo = function(pos) {
            return true;
        };
        r.exec('M');
        should(r.x).equal(2);
        should(r.y).equal(3);
    })
})

describe('check-after-move', function() {
    var r;
    beforeEach(function() {
        r = new Rover();
        r.x = 2;
        r.y = 2;
        r.direction = 'N';
        r.canMoveTo = function(pos) {
            return true;
        };
    });
    it('will rip', function() {
        r.willRip = function() { return true };
        r.exec('M');
        should(r.x).equal(2);
        should(r.y).equal(2);
        should(r.rip).equal(true);
    });
    it('will not rip', function() {
        r.willRip = function() { return false };
        r.exec('M');
        should(r.x).equal(2);
        should(r.y).equal(3);
        should(r.rip).equal(false);
    });
});

describe('task-will-rip', function() {
    var task = new MarsRovers();
    task.size.x = 5;
    task.size.y = 5;
    it('will rip', function() {
        should(task.willRip({ x: 5, y: 6 })).true();
    });
    it('will not rip', function() {
        should(task.willRip({ x: 5, y: 5 })).false();
    });
});

describe('can-move-to', function() {
    var task = new MarsRovers();
    task.blackholes = [{ x: 2, y: 2 }];
    it('can not move', function() {
        should(task.canMoveTo({ x: 2, y: 2 })).false();
    });
    it('can move', function() {
        should(task.canMoveTo({ x: 2, y: 1 })).true();
    });
});

describe('move', function() {
    const input = [
        '5 5',
        '1 2 N',
        'LMLMLMLMM',
        '3 3 E',
        'MMRMMLMRRM',
        '4 1 S',
        'MLMLMRMRM'
    ];
    const expected = [
        '1 3 N',
        '5 1 E RIP',
        '5 0 S'
    ];
    var task = new MarsRovers();
    task.init(input);
    var output = task.move();
    should(output.length).equal(expected.length);
    for (var i = 0; i < output.length; i++)
        should(output[i]).equal(expected[i]);
})