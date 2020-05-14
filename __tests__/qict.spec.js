const Qict = require('../src/qict');

describe('Qict', () => {
  it(' constructor() : can create new instance', () => {
    const q = new Qict('testData.txt');
    expect(q).not.toBeNull();
    expect(q).toBeInstanceOf(Qict);
    expect(q.poolSize).toBe(20);
  });
  it(' clean() : can clean all parameters', () => {
    const q = new Qict();
    expect(q.allPairsDisplay.length).toBe(0);
    expect(q.parameters.length).toBe(0);
    expect(q.parameterValues.length).toBe(0);
    expect(q.parameterPositions.length).toBe(0);
    expect(q.legalValues.length).toBe(0);
    expect(q.unusedCounts.length).toBe(0);
    expect(q.unusedPairs.length).toBe(0);
    expect(q.unusedPairsSearch.length).toBe(0);
    expect(q.numberParameters).toBe(0);
    expect(q.numberParameterValues).toBe(0);
    expect(q.numberPairs).toBe(0);

    expect(q.clean).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    q.clean();

    expect(q.allPairsDisplay.length).toBe(0);
    expect(q.parameters.length).toBe(0);
    expect(q.parameterValues.length).toBe(0);
    expect(q.parameterPositions.length).toBe(0);
    expect(q.legalValues.length).toBe(0);
    expect(q.unusedCounts.length).toBe(0);
    expect(q.unusedPairs.length).toBe(0);
    expect(q.unusedPairsSearch.length).toBe(0);
    expect(q.numberParameters).toBe(0);
    expect(q.numberParameterValues).toBe(0);
    expect(q.numberPairs).toBe(0);
  });
  it(' readFile() : can read all strings from file', () => {
    const q = new Qict();
    expect(q.readFile).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    expect(q.contents).not.toBe("");
    // no such file or directory
    const t = () => {
      let qi = new Qict();
      qi.readFile('__tests__/testData.csv');
    };
    expect(t).toThrow(/no such file or directory/);
  });
  it(' initialize() : can initialize from this.contents', () => {
    const q = new Qict();
    q.readFile('__tests__/testData.txt');
    expect(q.initialize).toBeInstanceOf(Function);
    q.initialize();
    expect(q.allPairsDisplay.length).toBe(44);
    expect(q.parameters.length).toBe(4);
    expect(q.parameterValues.length).toBe(11);
    expect(q.parameterPositions.length).toBe(11);
    expect(q.legalValues.length).toBe(4);
    expect(q.legalValues[0].length).toBe(2);
    expect(q.legalValues[1].length).toBe(4);
    expect(q.legalValues[2].length).toBe(3);
    expect(q.legalValues[3].length).toBe(2);
    expect(q.unusedPairs.length).toBe(44);
    expect(q.unusedPairsSearch.length).toBe(11);
    expect(q.numberParameters).toBe(4);
    expect(q.numberParameterValues).toBe(11);
    expect(q.numberPairs).toBe(44);

    const u = q.unusedPairsSearch.map((v) => {
      return v.join(",");
    })
    expect(u).toStrictEqual(
    ["0,0,1,1,1,1,1,1,1,1,1",
     "0,0,1,1,1,1,1,1,1,1,1",
     "0,0,0,0,0,0,1,1,1,1,1",
     "0,0,0,0,0,0,1,1,1,1,1",
     "0,0,0,0,0,0,1,1,1,1,1",
     "0,0,0,0,0,0,1,1,1,1,1",
     "0,0,0,0,0,0,0,0,0,1,1",
     "0,0,0,0,0,0,0,0,0,1,1",
     "0,0,0,0,0,0,0,0,0,1,1",
     "0,0,0,0,0,0,0,0,0,0,0",
     "0,0,0,0,0,0,0,0,0,0,0"]);
    expect(q.unusedCounts).toStrictEqual([9,9,7,7,7,7,8,8,8,9,9])
  });
  it(' bestPair() : can bestPair testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.bestPair).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    expect(q.bestPair()).toStrictEqual([
      8,10
    ]);
  });
});
