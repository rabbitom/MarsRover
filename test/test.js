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

// describe('move', function() {
//     const input = [
//         '5 5',
//         '1 2 N',
//         'LMLMLMLMM',
//         '3 3 E',
//         'MMRMMRMRRM',
//         '4 4 N',
//         'MMM'
//     ];
//     const expected = [
//         '1 3 N',
//         '5 1 E',
//         'RIP'
//     ];
//     var rovers = new MarsRovers();
//     rovers.init(input);
//     var output = rovers.move();
//     should(output.length).equal(expected.length);
//     for(var i = 0; i < output.length; i++)
//         should(output[i]).equal(expected[i]);
// })