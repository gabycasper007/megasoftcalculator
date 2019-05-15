const expect = require("chai").expect;
const Expression = require("../Expression").default;

describe("Expression", function() {
  describe("arrayRemove", function() {
    it("should remove", function() {
      let testCases = [
        {
          arr: [2, 4, 8, 4, 3, 7, 2, 8],
          indexes: [1, 6],
          result: [2, 8, 4, 3, 7, 8]
        },
        {
          arr: [5, 7, 9],
          indexes: [2],
          result: [5, 7]
        },
        {
          arr: [12, 90, 1, 6],
          indexes: [0, 3],
          result: [90, 1]
        }
      ];

      for (let testCase of testCases) {
        let expression = new Expression("");
        expect(
          expression.arrayRemove(testCase.arr, ...testCase.indexes).join("")
        ).to.equal(testCase.result.join(""));
      }
    });
  });

  describe("completeOperation", function() {
    it("calculate one instance", function() {
      let testCases = [
        {
          numbers: [2, 4, 8, 4, 3, 7, 2, 8],
          operators: ["+", "*", "+", "/", "-", "*", "-"],
          calculated: 32,
          index: 1,
          result: {
            numbers: [2, 32, 4, 3, 7, 2, 8],
            operators: ["+", "+", "/", "-", "*", "-"]
          }
        }
      ];

      for (let testCase of testCases) {
        let expression = new Expression("");

        expression.setNumbers(testCase.numbers);
        expression.setOperators(testCase.operators);
        expression = expression.completeOperation(
          testCase.index,
          testCase.calculated
        );

        expect(expression.numbers.join("")).to.equal(
          testCase.result.numbers.join("")
        );
        expect(expression.operators.join("")).to.equal(
          testCase.result.operators.join("")
        );
      }
    });
  });

  it("should calculate correctly", function() {
    let testCases = [
      { given: "1.52/.8*0.6-12+95", result: 84.14 },
      { given: "12-1.52/.8+95*0.2", result: 29.1 },
      { given: "12-1.52*.8+95/0.2", result: 485.784 },
      { given: "   2 + 4 * 8 + 4 / 3 - 7 * 2 - 8  ", result: 13.3333333333 }
    ];

    for (let testCase of testCases) {
      let expression = new Expression(testCase.given);
      expect(expression.calculate()).to.equal(testCase.result);
    }
  });
});
