const Qict = require('../src/qict');

describe('Qict', () => {
  it(' constructor() : can create new instance', () => {
    const q = new Qict('testData.txt');
    expect(q).not.toBeNull();
    expect(q).toBeInstanceOf(Qict);
    expect(q.poolSize).toBe(20);
  });
  it(' readFile(file) : can read all strings from file', () => {
    const q = new Qict();
    expect(q.readFile).toBeInstanceOf(Function);
    expect(q.readFile('__tests__/testData.txt')).toBeInstanceOf(Qict);
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
    expect(q.initialize()).toBeInstanceOf(Qict);
    expect(q.unusedPairs.length).toBe(44);
    expect(q.numberPairs).toBe(q.unusedPairs.length);
    expect(q.unusedPairsSearch.length).toBe(11);
    expect(q.unusedPairsSearch).toStrictEqual([
      [0,0,1,1,1,1,1,1,1,1,1],
      [0,0,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0]]);
    expect(q.unusedCounts).toStrictEqual([
      9,9,7,7,7,7,8,8,8,9,9
    ])
    const fs = require('fs');
    const filter = eval(fs.readFileSync('__tests__/filter.txt', 'utf8'));
    expect(q.setFilter(filter)).toBeInstanceOf(Qict);
    expect(q.filter).toBeInstanceOf(Function);
    expect(q.initialize()).toBeInstanceOf(Qict);
    expect(q.unusedPairs.length).toBe(43);
    expect(q.numberPairs).toBe(q.unusedPairs.length);
    expect(q.unusedPairsSearch.length).toBe(11);
    expect(q.unusedPairsSearch).toStrictEqual([
      [0,0,1,1,1,1,1,1,1,1,1],
      [0,0,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,1,1,1,1,1],
      [0,0,0,0,0,0,0,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0]]);
    expect(q.unusedCounts).toStrictEqual([
      9,9,7,7,7,6,7,8,8,9,9
    ])
  });
  it(' testSets() : can get testSets', () => {
    const q = new Qict();
    expect(q.testSets).toBeInstanceOf(Function);
    const testSets = q.readFile('__tests__/testData.txt')
      .initialize()
      .testSets();
    expect(testSets.length).toBe(12);
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
  it(' printResult() : can print results', () => {
    const q = new Qict();
    expect(q.printResult).toBeInstanceOf(Function);
  });
  it(' _parseContents() : can parse this.contents', () => {
    const q = new Qict();
    q.readFile('__tests__/testData.txt');
    expect(q._parseContents).toBeInstanceOf(Function);
    q._parseContents();
    expect(q.parameters.length).toBe(4);
    expect(q.parameters).toStrictEqual([
      "Switch","Browser","OS","Membership"
    ]);
    expect(q.parameterValues.length).toBe(11);
    expect(q.parameterValues).toStrictEqual([
      "on","off","Chrome","Firefox","Opera","Safari","Win 10 | Win 8 | Win 7","Mac","Linux","Member","Guest"
    ]);
    expect(q.parameterPositions.length).toBe(11);
    expect(q.parameterPositions).toStrictEqual([
      0,0,
      1,1,1,1,
      2,2,2,
      3,3
    ]);
  });
  it(' _best() : can select bestPair from unusedPairs', () => {
    const q = new Qict();
    expect(q._best).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    expect(q._best()).toStrictEqual([
      0,9
    ]);
  });
  it(' _clean() : can clean all parameters', () => {
    const q = new Qict();
    expect(q.parameters.length).toBe(0);
    expect(q.parameterValues.length).toBe(0);
    expect(q.parameterPositions.length).toBe(0);
    expect(q.legalValues.length).toBe(0);
    expect(q.unusedCounts.length).toBe(0);
    expect(q.unusedPairs.length).toBe(0);
    expect(q.unusedPairsSearch.length).toBe(0);
    expect(q.numberPairs).toBe(0);
    expect(q.filter).toBeUndefined();

    expect(q._clean).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    q._clean();

    expect(q.parameters.length).toBe(0);
    expect(q.parameterValues.length).toBe(0);
    expect(q.parameterPositions.length).toBe(0);
    expect(q.legalValues.length).toBe(0);
    expect(q.unusedCounts.length).toBe(0);
    expect(q.unusedPairs.length).toBe(0);
    expect(q.unusedPairsSearch.length).toBe(0);
    expect(q.numberPairs).toBe(0);
    expect(q.filter).toBeUndefined();
  });
  it(' _ordering(best) : can order parameters propery ', () => {
    const q = new Qict();
    expect(q._ordering).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    const best = q._best();
    const ordering = q._ordering(best);
    expect(ordering.length).toBe(4);
    expect(ordering[0]).toBe(0);
    expect(ordering[1]).toBe(3);
  });
  it(' _testSet(best,ordering) : can select testSet', () => {
    const q = new Qict();
    expect(q._testSet).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    const best = q._best();
    const ordering = q._ordering(best);
    const testSet = q._testSet(best,ordering);
    expect(testSet).toStrictEqual(
      [0,2,6,9]
    );
  });
  it(' _candidateSets() : can select candidateSets', () => {
    const q = new Qict();
    expect(q._candidateSets).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    const candidateSets = q._candidateSets();
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
  it(' _bestCandidate() : can select bestCandidate from candidateSets', () => {
    const q = new Qict();
    expect(q._bestCandidate).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    const candidateSets = q._candidateSets();
    const bestCandidate  = q._bestCandidate(candidateSets);
    expect(bestCandidate).toStrictEqual(
      [0,2,6,9]
    );
  });
  it(' _modifyUnused(bestCandidate) : can eliminate some data from unusedPair and unusedCounts', () => {
    const q = new Qict();
    expect(q._modifyUnused).toBeInstanceOf(Function);
    q.readFile('__tests__/testData.txt').initialize();
    const candidateSets = q._candidateSets();
    const bestCandidate = q._bestCandidate(candidateSets);
    q._modifyUnused(bestCandidate);
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
  it(' _parameterValue(parameterValue) : can recognize alias', () => {
    const q = new Qict();
    expect(q._parameterValue("parameterValue")).toBe("parameterValue");
    expect(q._parameterValue("Win 10 | Win 8 | Win 7")).toMatch(/^Win\s1?[087]$/);
  });
});
