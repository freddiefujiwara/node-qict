const Qict = require('../src/qict');

describe('Qict', () => {
  it('can create new instance', () => {
    const q = new Qict('testData.txt');
    expect(q).not.toBeNull();
    expect(q).toBeInstanceOf(Qict);
  });
  it('can clean all parameters', () => {
    const q = new Qict('__tests__/testData.txt');
    expect(q.parameters.length).toBe(0);
    expect(q.parameterValues.length).toBe(0);
    expect(q.parameterPositions.length).toBe(0);
    expect(q.legalValues.length).toBe(0);
    expect(q.unusedPairs.length).toBe(0);
    expect(q.numberParameters).toBe(0);
    expect(q.numberParameterValues).toBe(0);
    expect(q.numberPairs).toBe(0);

    expect(q.clean).toBeInstanceOf(Function);
    q.readFile();
    q.extractParameters();
    q.clean();

    expect(q.parameters.length).toBe(0);
    expect(q.parameterValues.length).toBe(0);
    expect(q.parameterPositions.length).toBe(0);
    expect(q.legalValues.length).toBe(0);
    expect(q.unusedPairs.length).toBe(0);
    expect(q.numberParameters).toBe(0);
    expect(q.numberParameterValues).toBe(0);
    expect(q.numberPairs).toBe(0);
  });
  it('can read all strings from file', () => {
    const q = new Qict('__tests__/testData.txt');
    expect(q.readFile).toBeInstanceOf(Function);
    q.readFile();
    expect(q.contents).not.toBe("");
    // no such file or directory
    const t = () => {
      let qi = new Qict('__tests__/testData.csv');
      qi.readFile();
    };
    expect(t).toThrow(/no such file or directory/);
  });
  it('can extract parameters from this.contents', () => {
    const q = new Qict('__tests__/testData.txt');
    q.readFile();
    expect(q.extractParameters).toBeInstanceOf(Function);
    q.extractParameters();
    expect(q.parameters.length).toBe(4);
    expect(q.parameterValues.length).toBe(11);
    expect(q.parameterPositions.length).toBe(11);
    expect(q.legalValues.length).toBe(4);
    expect(q.legalValues[0].length).toBe(2);
    expect(q.legalValues[1].length).toBe(4);
    expect(q.legalValues[2].length).toBe(3);
    expect(q.legalValues[3].length).toBe(2);
    expect(q.unusedPairs.length).toBe(44);
    expect(q.numberParameters).toBe(4);
    expect(q.numberParameterValues).toBe(11);
    expect(q.numberPairs).toBe(44);
  });
});
