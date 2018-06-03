const MarsRovers = require('../index.js');
const should = require('should');

describe('move', function() {
    const input = [
        '5 5',
        '1 2 N',
        'LMLMLMLMM',
        '3 3 E',
        'MMRMMRMRRM',
        '4 4 N',
        'MMM'
    ];
    const expected = [
        '1 3 N',
        '5 1 E',
        'RIP'
    ];
    var rovers = new MarsRovers();
    rovers.init(input);
    var output = rovers.move();
    should(output.length).equal(expected.length);
    for(var i = 0; i < output.length; i++)
        should(output[i]).equal(expected[i]);
})