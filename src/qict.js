/**
 * @classdesc This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT
 */
class Qict {
  /**
   * set this.poolSize 20 and clean
   * and clean
   * @constructor
   */
  constructor(file){
    this.poolSize = 20;
    this._clean();
  }
  /**
   * store content from file
   * @param {string} file Target File
   * @returns {Qict} this This object
   * @desc
   * When you want to output the pairwise of the folloing Parameters and Parameter Values
   *
   * The format of the input file should be as follows.
   *
   * |Parameter |Parameter Values             |
   * |:--------:|:---------------------------:|
   * |Switch    |        on,off               |
   * |Browser   | Chrome, Firefox, Opera, Lynx|
   * |OS        | Windows, Mac, Linux         |
   * |Membership| Member, Guest               |
   *
   * ```shell
   * $ cat   __tests__/testData.txt
   * Switch: on, off
   * Browser: Chrome, Firefox, Opera, Lynx
   * OS: Windows, Mac, Linux
   * Membership: Member, Guest
   * ```
   *
   * The delimiter between Parameters and Parameter Values should be ":"
   *
   * and also Parameter Values is ","
   *
   * Logic is super simple. From argument "file" to this.contents
   * - Step1: Use readFileSync to read the whole contents from "file"
   * - Step2: Make it a string.
   * - Step3: Do trim().
   * - Step4: Fill all string in this.contents
   *
   * That's all
   */
  readFile(file){
    const fs = require('fs');
    this.contents = fs.readFileSync(file, 'utf8').trim();
    return this;
  }
  /**
   * initialize all parameters
   * @public
   * @returns {Qict} this This object
   * @desc
   * This method can be divided into a first half and a second half.
   * #### 1st Half
   * 1st half recognizes contents to arameters and parameterValues
   * - Step1: Read line by line from this.contents
   * - Step2: Create a pair by splitting a line with a ":"
   * - Step3: Push pair[0]  to this.parameters
   * - Step4: Create an array by splitting the pair with ","
   * - Step5: Push all values to this.parameterValues
   *
   * As the result this.parameters and this.parameterValues are the following
   *
   * ```JavaScript
   * this.parameters = ["Switch","Browser","OS","Membership"];
   * this.parameterValues = ["on","off","Chrome","Firefox","Opera","Lynx","Windows","Mac","Linux","Member","Guest"];
   * ```
   *
   * #### 2nd Half
   */
  initialize(){
    this._clean();
    //readlines
    let numberParameterValues = 0;
    this.contents.split(/\r\n|\n|\r/).forEach((line) => {
      //create pairs parameters: values
      const pair = line.split(/:/);
      //should be more than 2
      if(pair.length < 2){
        return;
      }
      this.parameters.push(pair[0]);

      //values analysis
      let values = new Array();
      pair[1].split(/,/).forEach((value) => {
        values.push(numberParameterValues);
        this.parameterValues.push(value.trim());
        numberParameterValues++;
      });
      this.legalValues.push(values)
    });
    for (let i = 0; i < this.parameterValues.length; ++i){
      let row = new Array();
      for (let j = 0; j < this.parameterValues.length; ++j){
        row.push(0);
      }
      this.unusedPairsSearch.push(row);
      this.unusedCounts.push(0);
    }
    for (let i = 0; i <= this.legalValues.length - 2; ++i){
      for (let j = i + 1; j <= this.legalValues.length - 1; ++j){
        this.numberPairs += (this.legalValues[i].length * this.legalValues[j].length);
        for (let x = 0; x < this.legalValues[i].length; ++x) {
          for (let y = 0; y < this.legalValues[j].length; ++y) {
            let pair = new Array();
            pair.push(this.legalValues[i][x]);
            pair.push(this.legalValues[j][y]);
            this.unusedPairs.push(pair);
            this.unusedPairsSearch[this.legalValues[i][x]][this.legalValues[j][y]] = 1;
          }
        }
      }
    }
    let k = 0;
    for (let i = 0; i < this.legalValues.length; ++i) {
      this.legalValues[i].forEach(()=>{
        this.parameterPositions[k++] = i;
      })
    }
    this.unusedPairs.forEach((a) => {
      ++this.unusedCounts[a[0]];
      ++this.unusedCounts[a[1]];
    })
    return this;
  }
  /**
   * compute test sets
   * @returns {Array} testSets Generated test sets
   * @public
   */
  testSets(){
    let testSets = new Array();
    while(this.unusedPairs.length > 0){
      const candidateSets = this._candidateSets();
      const bestCandidate = this._bestCandidate(candidateSets);
      testSets.push(bestCandidate);
      this._modifyUnused(bestCandidate);
    }
    return testSets;
  }
  /**
   * print test sets to console
   * @param {Array} testSets Generated test sets
   * @public
   */
  printResult(testSets){
    console.log(`- There are ${this.parameters.length} parameters`);
    console.log(`- There are ${this.parameterValues.length} parameter values`);
    console.log(`- Parameter values:`);
    console.log(`  ${this.parameterValues.join(" ")}`)
    console.log(`- Legal values internal representation:`);
    this.legalValues.forEach((v,i) => {
      console.log(`  * Parameter${i}: ${v.join(' ')}`);
    })
    let num_results = testSets.length;
    console.log(`- There are ${this.numberPairs} pairs`);
    console.log("Result test sets: \n");
    for (let i = 0; i < num_results; ++i){
      let line = `${i}\t`.padStart(4);
      let curr = testSets[i];
      for (let j = 0; j < this.parameters.length; ++j){
        line += `${this.parameterValues[curr[j]]}\t`.padStart(8);
      }
      console.log(line);
    }
    console.log("\nEnd");
  }
  /**
   * PRIVATE:clean up all parameters
   * @private
   */
  _clean(){
    this.parameters = new Array();
    this.parameterValues = new Array();
    this.parameterPositions = new Array();
    this.legalValues = new Array();
    this.unusedCounts = new Array();
    this.unusedPairs = new Array();
    this.unusedPairsSearch = new Array();
    this.numberPairs = 0;
  }
  /**
   * PRIVATE:select best parameter pair
   * @returns {Array} best Best pair
   */
  _best(){
    let bestWeight = 0;
    let indexOfBestPair = 0;
    //console.log("unusedPairs.length = " + this.unusedPairs.length);
    this.unusedPairs.forEach((curr,i) =>{
      let weight = this.unusedCounts[curr[0]] + this.unusedCounts[curr[1]];
      if(weight > bestWeight){
        bestWeight = weight;
        indexOfBestPair = i;
      }
    });
    return this.unusedPairs[indexOfBestPair];
  }
  /**
   * PRIVATE:order parameters
   * @param {Array} best pair
   * @returns {Array} ordering shuffled orders
   */
  _ordering(best){
    let ordering = new Array();
    let firstPos = this.parameterPositions[best[0]];
    let secondPos = this.parameterPositions[best[1]];
    for(let i = 0 ; i < this.parameters.length; i++){
      ordering.push(i);
    }
    ordering[0] = firstPos;
    ordering[firstPos] = 0;
    let t = ordering[1];
    ordering[1] = secondPos;
    ordering[secondPos] = t;
    // Knuth ordering. start at i=2 because want first two slots left alone
    for (let i = 2; i < ordering.length; i++){
      let j = Math.floor(Math.random() * (ordering.length - i) + i);
      let temp = ordering[j];
      ordering[j] = ordering[i];
      ordering[i] = temp;
    }
    return ordering;
  }
  /**
   * PRIVATE:select one test set
   * @param {Array} best
   * @returns {Array} testSet one test set
   */
  _testSet(best,ordering){
    let testSet = new Array();
    let firstPos = this.parameterPositions[best[0]];
    let secondPos = this.parameterPositions[best[1]];
    for(let i = 0 ; i < this.numberParamterValues ; i++){
      testSet.push(0);
    }
    testSet[firstPos] = best[0];
    testSet[secondPos] = best[1];
    //console.log("Placed params " + best[0] + " " + best[1] + " at " + firstPos + " and " + secondPos);
    for (let i = 2; i < this.parameters.length; ++i){
      let currPos = ordering[i];
      let possibleValues = this.legalValues[currPos];
      let currentCount = 0;
      let highestCount = 0;
      let bestJ = 0;
      for (let j = 0; j < possibleValues.length; ++j){
        currentCount = 0;
        for (let p = 0; p < i; ++p){
          let candidatePair =  [possibleValues[j], testSet[ordering[p]] ]
          //console.log(candidatePair);
          if (this.unusedPairsSearch[candidatePair[0]][candidatePair[1]] == 1 ||
            this.unusedPairsSearch[candidatePair[1]][candidatePair[0]] == 1){
            //console.log("Found " + candidatePair[0] + "," + candidatePair[1] + " in this.unusedPairs");
            ++currentCount;
          } else {
            //console.log("Did NOT find " + candidatePair[0] + "," + candidatePair[1] + " in this.unusedPairs");
          }
        }
        if (currentCount > highestCount){
          highestCount = currentCount;
          bestJ = j;
        }
      }
      //console.log("The best value is " + possibleValues[bestJ] + " with count = " + highestCount);
      testSet[currPos] = possibleValues[bestJ];
    }
    return testSet;
  }
  /**
   * PRIVATE:select candidate test sets
   * @param {Array} testSet one test set
   * @returns {Array} candidateSets test sets for candidate
   */
  _candidateSets(){
    let candidateSets = new Array();
    for(let candidate = 0 ; candidate < this.poolSize ; candidate++){
      const best = this._best();
      const ordering = this._ordering(best);
      const testSet = this._testSet(best,ordering);
      candidateSets.push(testSet)
    }
    return candidateSets;
  }
  /**
   * PRIVATE:sum unused count for ts
   * @param {Array} ts Test Sets
   * @returns {number} ans
   */
  _NumberPairsCaptured(ts){
    let ans = 0;
    for (let i = 0; i <= ts.length - 2; ++i){
      for (let j = i + 1; j <= ts.length - 1; ++j){
        if (this.unusedPairsSearch[ts[i]][ts[j]] == 1){
          ++ans;
        }
      }
    }
    return ans;
  }
  /**
   * PRIVATE:select best candidate from candidateSets
   * @param {Array} candidateSets
   * @returns {Array} bestCandidate best candidate from candidateSets
   */
  _bestCandidate(candidateSets){
    let indexOfBestCandidate = 0;
    let mostPairsCaptured = 0;
    for (let i = 0; i < candidateSets.length; ++i){
      let pairsCaptured = this._NumberPairsCaptured(candidateSets[i]);
      if (pairsCaptured > mostPairsCaptured){
        mostPairsCaptured = pairsCaptured;
        indexOfBestCandidate = i;
      }
      //console.log(`Candidate ${i} captured ${mostPairsCaptured}`)
    }
    //console.log("Candidate number " + indexOfBestCandidate + " is best");
    //console.log(candidateSets[indexOfBestCandidate]);
    return candidateSets[indexOfBestCandidate];
  }
  /**
   * PRIVATE:remove the best from unusedParis and decrease unusedCOunts
   * @param {Array} best Best test set
   */
  _modifyUnused(bestTestSet){
    for (let i = 0; i <= this.parameters.length - 2; ++i){
      for (let j = i + 1; j <= this.parameters.length - 1; ++j){
        let v1 = bestTestSet[i];
        let v2 = bestTestSet[j];
        //console.log("Decrementing the unused counts for " + v1 + " and " + v2);
        --this.unusedCounts[v1];
        --this.unusedCounts[v2];
        //console.log("Setting unusedPairsSearch at " + v1 + " , " + v2 + " to 0");
        this.unusedPairsSearch[v1][v2] = 0;
        for (let p = 0; p < this.unusedPairs.length; ++p){
          let curr = this.unusedPairs[p];
          if (curr[0] == v1 && curr[1] == v2){
            this.unusedPairs.splice(p,1);
          }
        }
      }
    }
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Qict;
} else {
  window.Qict = Qict;
}
