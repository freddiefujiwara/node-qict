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
  it(' best() : can bestPair testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.best).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    expect(q.best()).toStrictEqual([
      0,9
    ]);
  });
  it(' ordering() : can ordering testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.ordering).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    const best = q.best();
    const ordering = q.ordering(best);
    expect(ordering.length).toBe(4);
  });
  it(' testSet() : can ordering testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.testSet).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    const best = q.best();
    const ordering = q.ordering(best);
    const testSet = q.testSet(best,ordering);
    expect(testSet).toStrictEqual(
      [0,2,6,9]
    );
  });
  it(' candidateSets() : can ordering testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.candidateSets).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    const candidateSets = q.candidateSets();
    expect(candidateSets).toStrictEqual([
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9],
      [0,2,6,9],[0,2,6,9]
    ])
  });
  it(' bestCandidate() : can ordering testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.bestCandidate).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    const candidateSets = q.candidateSets();
    const bestCandidate = q.bestCandidate(candidateSets);
    expect(bestCandidate).toStrictEqual(
      [0,2,6,9]
    );
  });
  it(' modifyUnused() : can ordering testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.bestCandidate).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    const candidateSets = q.candidateSets();
    const bestCandidate = q.bestCandidate(candidateSets);
    q.modifyUnused(bestCandidate);
    expect(q.unusedPairs).toStrictEqual([
      [0,3],
      [0,4],
      [0,5],
      [1,2],
      [1,3],
      [1,4],
      [1,5],
      [0,7],
      [0,8],
      [1,6],
      [1,7],
      [1,8],
      [0,10],
      [1,9],
      [1,10],
      [2,7],
      [2,8],
      [3,6],
      [3,7],
      [3,8],
      [4,6],
      [4,7],
      [4,8],
      [5,6],
      [5,7],
      [5,8],
      [2,10],
      [3,9],
      [3,10],
      [4,9],
      [4,10],
      [5,9],
      [5,10],
      [6,10],
      [7,9],
      [7,10],
      [8,9],
      [8,10]]);
  });
  it(' testSets() : can ordering testsets which capture all possible pairs', () => {
    const q = new Qict();
    expect(q.testSets).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt');
    q.initialize();
    const testSets = q.testSets();
    console.log(testSets);
    /*
    expect(testSets).toStrictEqual([
      [0,2,6,9],
      [1,2,7,10],
      [0,3,8,10],
      [1,4,8,9],
      [1,5,6,10],
      [0,3,7,9],
      [0,4,6,10],
      [0,5,7,9],
      [0,2,8,9],
      [1,3,6,9],
      [0,4,7,9],
      [0,5,8,9]]);*/
  });

});
