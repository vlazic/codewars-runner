const anagramDifference = require('./work');
const Test = require("@codewars/test-compat");

const { assert } = require('chai');

describe("Sample tests", () => {
  const testCases = [
  // w1     w2   expected
    ["",    "",    0],
    ["a",   "",    1],
    ["",    "a",   1],
    ["ab",  "a",   1],
    ["ab",  "cd",  4],
    ["aab", "a",   2],
    ["a",   "aab", 2],
    ["codewars", "hackerrank", 10]
  ];
  for(const [w1, w2, expected] of testCases)
    it(`w1 = "${w1}", w2 = "${w2}"`, () => assert.strictEqual(anagramDifference(w1, w2), expected));
});