const sum = require('./work');
const Test = require("@codewars/test-compat");

describe("Tests", () => {
  it("test", () => {
Test.assertEquals(sum(1), 1);
Test.assertEquals(sum(2), 2);
Test.assertEquals(sum(3), 3);
Test.assertEquals(sum(4), 5);

Test.assertEquals(sum(5), 7);

Test.assertEquals(sum(10), 42);
  });
});
