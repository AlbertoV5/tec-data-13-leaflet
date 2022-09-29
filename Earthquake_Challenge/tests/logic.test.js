const {default: TestRunner} = require('jest-runner');
const createMap = require('../static/logic');
test('returns a map object with the given id', () => {
    expect(createMap('testid').id).toBe('testid');
})