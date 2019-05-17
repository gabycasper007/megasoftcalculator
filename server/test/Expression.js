const expect = require("chai").expect;
const Expression = require("../Expression");

describe("Expression", function() {
  describe("arrayRemoveByIndex", function() {
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
          expression
            .arrayRemoveByIndex(testCase.arr, ...testCase.indexes)
            .join("")
        ).to.equal(testCase.result.join(""));
      }
    });
  });

  describe("removeUsedNumbersAndOperators", function() {
    it("should calculate one instance", function() {
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
        let obj = {
          numbers: testCase.numbers,
          operators: testCase.operators
        };

        obj = expression.removeUsedNumbersAndOperators(
          testCase,
          testCase.index,
          testCase.calculated
        );

        expect(obj.numbers.join("")).to.equal(testCase.result.numbers.join(""));
        expect(obj.operators.join("")).to.equal(
          testCase.result.operators.join("")
        );
      }
    });
  });

  describe("getOperators", function() {
    it("should retrieve only operators", function() {
      let expression = new Expression("");
      expect(expression.getOperators("1/3+24+5*-8/3").join(" ")).to.equal(
        "/ + + * /"
      );

      expect(expression.getOperators("1/3-24+5*-8/3").join(" ")).to.equal(
        "/ - + * /"
      );
    });
  });

  it("should calculate basic operations", function() {
    let testCases = [
      { given: "1.52/.8*0.6-12.5+95", result: 83.64 },
      { given: "12-1.52/.8+95*0.2", result: 29.1 },
      { given: "12-1.52*.8+95/0.2", result: 485.784 },
      { given: "1/3+4+5*-8/3", result: -9 },
      { given: "-1/3+4+5*-8/3", result: -9.6666666667 },
      { given: "   2 + 4 * 8 + 4 / 3 - 7 * 2 - 8  ", result: 13.3333333333 }
    ];

    checkTestCases(testCases);
  });

  it("should calculate complex operations", function() {
    let testCases = [
      { given: "4!*√(4", result: 48 },
      { given: "5+1.2+4!*√(4", result: 54.2 }
    ];

    checkTestCases(testCases);
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

    checkTestCases(testCases);
  });

  it("should calculate square root", function() {
    let testCases = [
      { given: "√(5", result: 2.2360679775 },
      { given: "√(48)", result: 6.9282032303 },
      { given: "√(145)", result: 12.0415945788 },
      { given: "sqrt(785.5)", result: 28.0267729145 },
      { given: "√(144", result: 12 },
      { given: "-√(9)", result: -3 },
      { given: "-√(12)", result: -3.4641016151 },
      { given: "√8", result: 2.8284271247 }
    ];

    checkTestCases(testCases);
  });

  it("should calculate cubic root", function() {
    let testCases = [
      { given: "∛(84", result: 4.3795191399 },
      { given: "∛(12)", result: 2.2894284851 },
      { given: "∛(-483)", result: -7.8460133651 },
      { given: "cbrt(327.3)", result: 6.8915249864 },
      { given: "-∛(27)", result: -3 },
      { given: "-∛(12)", result: -2.2894284851 },
      { given: "∛8", result: 2 },
      { given: "∛-8", result: -2 }
    ];

    checkTestCases(testCases);
  });

  it("should calculate logs", function() {
    let testCases = [
      { given: "log(84", result: 1.9242792861 },
      { given: "log(12)", result: 1.079181246 },
      { given: "log(327.3)", result: 2.5149460053 },
      { given: "-log(27)", result: -1.4313637642 },
      { given: "-log(12", result: -1.079181246 },
      { given: "log8", result: 0.903089987 }
    ];

    checkTestCases(testCases);
  });

  it("should calculate factorials", function() {
    let testCases = [
      { given: "-4!", result: -24 },
      { given: "7!", result: 5040 },
      { given: "10!", result: 3628800 },
      { given: "100!", result: 9.3326215444 },
      { given: "170!", result: 7.2574156153 },
      { given: "171!", result: Infinity },
      { given: "2!", result: 2 },
      { given: "1!", result: 1 },
      { given: "0!", result: 1 },
      { given: "0!!", result: 1 },
      { given: "3!!", result: 3 },
      { given: "4!!", result: 8 },
      { given: "10!!", result: 3840 },
      { given: "50!!", result: 5.2046984264 },
      { given: "30!!", result: 42849873690624000 },
      { given: "0!!!", result: 1 },
      { given: "3!!!", result: 3 },
      { given: "5!!!", result: 10 },
      { given: "10!!!", result: 280 },
      { given: "3.4!", result: 10.1309057522 },
      { given: "-5.9!", result: -597.3851550984 },
      { given: "-0.4!", result: -0.8767180971 }
    ];
    checkTestCases(testCases);
  });

  it("should calculate power", function() {
    let testCases = [
      { given: "2^4", result: 16 },
      { given: "0^8", result: 0 },
      { given: "-3^3", result: -27 },
      { given: "3^2^4", result: 43046721 },
      { given: "14^4", result: 38416 },
      { given: "5^12", result: 244140625 },
      { given: "1.2^6", result: 2.985984 },
      { given: "2.1^-2", result: 0.2267573696 },
      { given: "(-45)^2", result: 2025 }
    ];

    checkTestCases(testCases);
  });
});

function checkTestCases(testCases) {
  for (let testCase of testCases) {
    let expression = new Expression(testCase.given);
    expect(expression.calculate()).to.equal(testCase.result);
  }
}
