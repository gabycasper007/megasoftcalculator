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
          testCase,
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

  describe("getOperators", function() {
    it("should retrieve just operators", function() {
      let expression = new Expression("");
      expect(expression.getOperators("1/3+24+5*-8/3").join(" ")).to.equal(
        "/ + + * /"
      );

      expect(expression.getOperators("1/3-24+5*-8/3").join(" ")).to.equal(
        "/ - + * /"
      );
    });
  });

  it("should calculate correctly", function() {
    let testCases = [
      { given: "1.52/.8*0.6-12.5+95", result: 83.64 },
      { given: "12-1.52/.8+95*0.2", result: 29.1 },
      { given: "12-1.52*.8+95/0.2", result: 485.784 },
      { given: "1/3+4+5*-8/3", result: -9 },
      { given: "-1/3+4+5*-8/3", result: -9.6666666667 },
      { given: "   2 + 4 * 8 + 4 / 3 - 7 * 2 - 8  ", result: 13.3333333333 }
    ];

    for (let testCase of testCases) {
      let expression = new Expression(testCase.given);
      expect(expression.calculate()).to.equal(testCase.result);
    }
  });

  it("should handle parenthesis", function() {
    let testCases = [
      { given: "(6+5)", result: 11 },
      { given: "(2*7", result: 14 },
      { given: "(2*(  11-3", result: 16 },
      { given: "(1/(3+4)+5*(2-10)/3", result: -13.1904761905 },
      { given: "1/(-3+4)+5*-2-10/3", result: -12.3333333333 },
      { given: "1/(-3*(4+5)/(2*(3-8)))", result: 0.3703703704 }
    ];

    for (let testCase of testCases) {
      let expression = new Expression(testCase.given);
      expect(expression.calculate()).to.equal(testCase.result);
    }
  });
});
