/**
 * @classdesc
 * This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT
 * Overall flow is the following
 *
 * - readFile(file)
 * - initialize()
 * - testSets()
 *  - while(this.unusedPairs.length > 0)
 *    - candidateSets = _candidateSets()
 *    - bestCandidate = _bestCandidate(candidateSets)
 *    - _modifyUnused(bestCandidate)
 * - printResult(testSets)
 *
 */
class Qict {
  /**
   * @constructor
   * @desc
   * set this.poolSize = 20;
   * set this.filter = undefined;
   */
  constructor(){
    this.poolSize = 20;
    this.filter = undefined;
    this._clean();
  }
  /**
   * set this.filter
   * @params {function} filter
   * @returns {Qict} this This object
   *
   */
  setFilter(filter){
    this.filter = filter;
    return this;
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
   *
   *
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
   * SEE:_parseConents()
   *
   * #### 2nd Half
   * 2nd half calculates combinations
   *
   * All possible combinations of Parameter Values are listed below
   *
   * |unusedPairs|on|off|Chrome|Firefox|Opera|Lynx|Windows|Mac|Linux|Member|Guest|
   * |-----------|--|---|------|-------|-----|----|-------|---|-----|------|-----|
   * |on         |0 |  0|     1|      1|    1|   1|      1|  1|    1|     1|    1|
   * |off        |0 |  0|     1|      1|    1|   1|      1|  1|    1|     1|    1|
   * |Chrome     |0 |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Firefox    |0 |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Opera      |0 |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Lynx       |0 |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Windows    |0 |  0|     0|      0|    0|   0|      0|  0|    0|     1|    1|
   * |Mac        |0 |  0|     0|      0|    0|   0|      0|  0|    0|     1|    1|
   * |Linux      |0 |  0|     0|      0|    0|   0|      0|  0|    0|     1|    1|
   * |Member     |0 |  0|     0|      0|    0|   0|      0|  0|    0|     0|    0|
   * |Guest      |0 |  0|     0|      0|    0|   0|      0|  0|    0|     0|    0|
   *
   * So as you can calculate easily. the number of times each Parameter Values appears is as follows
   *
   * |       |unusedCounts|
   * |-------|------------|
   * |on     |9           |
   * |off    |9           |
   * |Chrome |7           |
   * |Firefox|7           |
   * |Opera  |7           |
   * |Lynx   |7           |
   * |Windows|8           |
   * |Mac    |8           |
   * |Linux  |8           |
   * |Member |9           |
   * |Guest  |9           |
   *
   * calculate invalidParametersSearch if filter exists
   *
   * For example filter.txt is the following
   *
   * The filter implies the combination Windows x Safari and Linux x Safari are invalid
   *
   * ```JavaScript
   *    (parameter1,parameterValue1,parameter2,parameterValue2) => {
   *      if(("OS" === parameter2 && parameterValue2.match(/^[WL]/) &&
   *            "Browser" === parameter1 && "Safari" === parameterValue1) ||
   *          ("OS" === parameter1 && parameterValue1.match(/^[WL]/) &&
   *           "Browser" === parameter2 && "Safari" === parameterValue2)){
   *        return true;
   *      }
   *      return false;
   *    }
   * ```
   *
   * so this.invalidPairs should be the following matrix
   *
   * |invalidPairs|on|off|Chrome|Firefox|Opera|Safari|Windows|Mac|Linux|Member|Guest|
   * |------------|--|---|------|-------|-----|------|-------|---|-----|------|-----|
   * |on          |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |off         |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |Chrome      |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |Firefox     |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |Opera       |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |Safari      |0 |  0|     0|      0|    0|     0|      1|  0|    1|     0|    0|
   * |Windows     |0 |  0|     0|      0|    0|     1|      0|  0|    0|     0|    0|
   * |Mac         |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |Linux       |0 |  0|     0|      0|    0|     1|      0|  0|    0|     0|    0|
   * |Member      |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   * |Guest       |0 |  0|     0|      0|    0|     0|      0|  0|    0|     0|    0|
   *
   *
   */
  initialize(){
    this._clean();
    this._parseContents();
    // initialize this.unusedParisSearch and this.unusedCounts
    for (let x = 0; x < this.parameterValues.length; ++x){
      let row = new Array();
      let irow = new Array();
      for (let y = 0; y < this.parameterValues.length; ++y){
        row.push(0);
        irow.push(0);
      }
      this.unusedPairsSearch.push(row);
      this.invalidPairsSearch.push(irow);
      this.unusedCounts.push(0);
    }
    // calculate this.unusedPairs,this.unusedParisSearch and this.unusedCounts
    for (let i = 0; i <= this.legalValues.length - 2; ++i){
      for (let j = i + 1; j <= this.legalValues.length - 1; ++j){
        for (let x = 0; x < this.legalValues[i].length; ++x) {
          this.legalValues[j].forEach((v,y) => {
            ++this.unusedCounts[this.legalValues[i][x]];
            ++this.unusedCounts[this.legalValues[j][y]];

            //calculate invalidParametersSearch if filter exists
            if(typeof this.filter === "function" &&
              this.filter(this.parameters[i],this.parameterValues[this.legalValues[i][x]],
                this.parameters[j],this.parameterValues[this.legalValues[j][y]])){
              this.invalidPairsSearch[this.legalValues[i][x]][this.legalValues[j][y]] = 1;
              this.invalidPairsSearch[this.legalValues[j][y]][this.legalValues[i][x]] = 1;
              return;
            }

            this.unusedPairs.push([this.legalValues[i][x], this.legalValues[j][y]]);
            this.unusedPairsSearch[this.legalValues[i][x]][this.legalValues[j][y]] = 1;
          });
        }
      }
    }
    this.numberPairs = this.unusedPairs.length;
    return this;
  }
  /**
   * compute test sets
   * @returns {Array} testSets Generated test sets
   * @public
   * @desc
   * this is all combination of _candidateSets,_bestCan and _modifyUnused
   *
   * while unusedPairs > 0
   *
   * - Step1: compute candidateSets
   * - Step2: select bestCandidate
   * - Step3: push Step2) to testSets
   * - Step4: modify unusedPairs and unusedCounts
   *
   *
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
        line += `${this._parameterValue(this.parameterValues[curr[j]])}\t`.padStart(8);
      }
      console.log(line);
    }
    console.log("\nEnd");
  }
  /**
   * PRIVATE:clean up all parameters
   */
  _clean(){
    this.parameters = new Array();
    this.parameterValues = new Array();
    this.parameterPositions = new Array();
    this.legalValues = new Array();
    this.unusedCounts = new Array();
    this.unusedPairs = new Array();
    this.unusedPairsSearch = new Array();
    this.invalidPairsSearch = new Array();
    this.numberPairs = 0;
  }
  /**
   * PRIVATE:parse contents
   * @desc
   * it recognizes contents to parameters,parameterValues,legalValues and parameterPositions
   *
   * so everything in this.legalValues has been replaced with numbers for ease of use.
   *
   * - Step1: Read line by line from this.contents
   * - Step2: Create a pair by splitting a line with a ":"
   * - Step3: Push pair[0]  to this.parameters
   * - Step4: Create an array by splitting the pair with ","
   * - Step5: Push all values to this.parameterValues
   * - Step6: Create legalValues
   * - Step7: Calculate parameterPositions
   *
   * As the result this.parameters,this.parameterValues,this.legalValues and this.parameterPositions are the following
   *
   * ```JavaScript
   * this.parameters = ["Switch","Browser","OS","Membership"];
   * this.parameterValues = ["on","off","Chrome","Firefox","Opera","Lynx","Windows","Mac","Linux","Member","Guest"];
   * this.legalValues = [
   *  [0,1],
   *  [2,3,4,5],
   *  [6,7,8],
   *  [9,10]
   * ];
   * this.parameterPositions = [
   *  0,0,
   *  1,1,1,1,
   *  2,2,2,
   *  3,3
   * ];
   * ```
   *
   */
  _parseContents(){
    let numberParameterValues = 0;
    let p = 0;
    this.contents.split(/\r\n|\n|\r/).forEach((line) => {
      //simple validation of lines
      const pair = line.split(/:/);
      //pair should be 2
      if(pair.length < 2){
        return;
      }
      //parameterValues should be more than 1
      const parameterValues = pair[1].split(/,/);
      if(parameterValues < 1){
        return;
      }

      //parameter.ok
      this.parameters.push(pair[0].trim());
      //values analysis
      let values = new Array();
      parameterValues.forEach((value) => {
        values.push(numberParameterValues);
        this.parameterValues.push(value.trim());
        this.parameterPositions[numberParameterValues] = p;
        numberParameterValues++;
      });
      this.legalValues.push(values)
      p++;
    });
  }
  /**
   * PRIVATE:select best parameter pair
   * @returns {Array} best Best pair
   * @desc
   * compute the best pair of parametersValues
   *
   * This is an algorithm that sum the unusedCount of two Parameter Values.
   *
   * and the largest pair is selected.
   *
   * ```JavaScript
   *  let weight = this.unusedCounts[pair[0]] + this.unusedCounts[pair[1]];
   * ```
   *
   */
  _best(){
    let bestWeight = 0;
    let indexOfBestPair = 0;
    //console.log("unusedPairs.length = " + this.unusedPairs.length);
    this.unusedPairs.forEach((pair,i) =>{
      let weight = this.unusedCounts[pair[0]] + this.unusedCounts[pair[1]];
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
   * @desc
   * Suppose that 0 and 9 of ParameterValues, that is, "on" and "Member", are selected.
   *
   * Look at this.ParameterPositions
   *
   * ```JavaScript
   * this.parameterPositions = [
   *  "0",0,
   *  1,1,1,1,
   *  2,2,2,
   *  "3",3
   * ];
   * ```
   *
   * order should be [0,3,3rd,4th]
   *
   * The 1st and the 2nd will be 0,3.
   *
   * The 3rd and 4th of the second half will be chosen at random.
   *
   */
  _ordering(best){
    let ordering = new Array();
    const firstPos = this.parameterPositions[best[0]];
    const secondPos = this.parameterPositions[best[1]];
    for(let i = 0 ; i < this.parameters.length; i++){
      ordering.push(i);
    }
    ordering[0] = firstPos;
    ordering[firstPos] = 0;
    const t = ordering[1];
    ordering[1] = secondPos;
    ordering[secondPos] = t;
    // Knuth ordering. start at i=2 because want first two slots left alone
    for (let i = 2; i < ordering.length; i++){
      const j = Math.floor(Math.random() * (ordering.length - i) + i);
      const temp = ordering[j];
      ordering[j] = ordering[i];
      ordering[i] = temp;
    }
    return ordering;
  }
  /**
   * PRIVATE:select one test set
   * @param {Array} best
   * @returns {Array} testSet one test set
   * @desc
   * The parameter value of the parameter  which selected by _best() is already determined.
   *
   * This means that the test set that is now being selected is the following.
   *
   * |          |Selected Value|
   * |----------|--------------|
   * |Switch    |            on|
   * |Browser   |             ?|
   * |OS        |             ?|
   * |Membership|        Member|
   *
   * How can we select another parameter values from other parameters?
   *
   * The algorithm is as follows.
   *
   * for all for all unspecified parameter values.
   *
   * - Step 1: Create pair of candidates, [Parameter Value, already determined parameter value]
   *    - So the first candidate should be ["Chrome", "on"]
   * - Step2: Check unsusedCount for ["Chrome" ,"on"] or ["on" and "Chrome"] by using the unused matrix shown in the 2nd half of initialize()
   * - Step3: As a result of Step2, the highest scored parameter value will be selected.
   *
   * |unusedPairs|on   |off|Chrome|Firefox|Opera|Lynx|Windows|Mac|Linux|Member|Guest|
   * |-----------|-----|---|------|-------|-----|----|-------|---|-----|------|-----|
   * |on         |0    |  0| **1**|      1|    1|   1|      1|  1|    1|     1|    1|
   * |off        |0    |  0|     1|      1|    1|   1|      1|  1|    1|     1|    1|
   * |Chrome     |**0**|  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Firefox    |0    |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Opera      |0    |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Lynx       |0    |  0|     0|      0|    0|   0|      1|  1|    1|     1|    1|
   * |Windows    |0    |  0|     0|      0|    0|   0|      0|  0|    0|     1|    1|
   * |Mac        |0    |  0|     0|      0|    0|   0|      0|  0|    0|     1|    1|
   * |Linux      |0    |  0|     0|      0|    0|   0|      0|  0|    0|     1|    1|
   * |Member     |0    |  0|     0|      0|    0|   0|      0|  0|    0|     0|    0|
   * |Guest      |0    |  0|     0|      0|    0|   0|      0|  0|    0|     0|    0|
   *
   */
  _testSet(best,ordering){
    // initialize testSet
    let testSet = new Array();
    for(let i = 0 ; i < this.parameters.length ; i++){
      testSet.push(0);
    }
    // already determined by _best()
    testSet[this.parameterPositions[best[0]]] = best[0];
    testSet[this.parameterPositions[best[1]]] = best[1];
    //console.log(testSet);
    //console.log("Placed params " + best[0] + " " + best[1] + " at " + this.parameterPositions[best[0]] + " and " + this.parameterPositions[best[1]]);
    for (let i = 2; i < ordering.length; ++i){
      const possibleValues = this.legalValues[ordering[i]];
      let highestCount = 0;
      let bestJ = 0;
      if(typeof this.filter !== "function"){ // no filter
        possibleValues.forEach((possibleValue,j) => {
          let currentCount = 0;
          for (let p = 0; p < i; ++p){
            let candidatePair =  [possibleValue, testSet[ordering[p]]];
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
        })
        //console.log("The best value is " + possibleValues[bestJ] + " with count = " + highestCount);
        testSet[ordering[i]] = possibleValues[bestJ];
      }else{
        //random value -> less threats to choose a invalid combinaison than picking the best pair
        testSet[ordering[i]] = possibleValues[Math.floor(Math.random() * possibleValues.length)];
      }
    }
    return testSet;
  }
  /**
   * PRIVATE:select candidate test sets
   * @param {Array} testSet one test set
   * @returns {Array} candidateSets test sets for candidate
   * @desc
   * Create candidateSets from testSet created by _testSet() for size of this.pool
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
   * @param {Array} ts Test Ses
   * @returns {number} pairsCaptured
   * @desc
   * Count all unused combinations(nC2) in the testSet.
   */
  _NumberPairsCaptured(ts){
    let pairsCaptured = 0;
    for (let i = 0; i <= ts.length - 2; ++i){
      for (let j = i + 1; j <= ts.length - 1; ++j){
        if (this.unusedPairsSearch[ts[i]][ts[j]] == 1){
          ++pairsCaptured;
        }
      }
    }
    return pairsCaptured;
  }
  /**
   * PRIVATE:search invalid pairs
   * @param {Array} ts Test Set
   * @returns {bool} found
   * @desc
   * check all invalid combinations(nC2) in the testSet.
   */
  _InvalidPairsCaptured(ts){
    for (let i = 0; i <= ts.length - 2; ++i){
      for (let j = i + 1; j <= ts.length - 1; ++j){
        if (this.invalidPairsSearch[ts[i]][ts[j]] == 1 ||
          this.invalidPairsSearch[ts[j]][ts[i]] == 1){
          //console.log(`${this.parameterValues[ts[i]]}:${this.parameterValues[ts[j]]}`)
          return true;
        }
      }
    }
    return false;
  }
  /**
   * PRIVATE:select best candidate from candidateSets
   * @param {Array} candidateSets
   * @returns {Array} bestCandidate best candidate from candidateSets
   * @desc
   * Count all unused combinations in the testSet by using _NumberPairsCaptured()
   *
   * The candidate with the highest total will be chosen.
   */
  _bestCandidate(candidateSets){
    let indexOfBestCandidate = 0;
    let mostPairsCaptured = 0;
    candidateSets.forEach((candidateSet,i) => {
      if(this._InvalidPairsCaptured(candidateSet)){
        return;
      }
      const pairsCaptured = this._NumberPairsCaptured(candidateSet);
      if (pairsCaptured > mostPairsCaptured){
        mostPairsCaptured = pairsCaptured;
        indexOfBestCandidate = i;
      }
      //console.log(`Candidate ${candidateSet} captured ${mostPairsCaptured}`)
    });
    //console.log("Candidate number " + indexOfBestCandidate + " is best");
    //console.log(candidateSets[indexOfBestCandidate]);
    return candidateSets[indexOfBestCandidate];
  }
  /**
   * PRIVATE:remove the best from unusedParis and decrease unusedCOunts
   * @param {Array} bestCandidate Best test set
   * @desc
   *
   * For example.
   * ["on", "Chrome", "Windows", "Member" ]
   * If so, I'd like to see the entire combination of
   *
   * - ["on", "Chrome"]
   * - ["on", "Windows"]
   * - ["on", "Member"]
   * - ["Chrome", "Windows"]
   * - ["Chrome", "Member"]
   * - ["Windows", "Member"]
   *
   *   The unusedCount is decremented
   *
   *   The relevant part of unusedPairsSearch is set to 0
   *
   *   Finally the relevant pair of unusedPairs will be removed.
   */
  _modifyUnused(bestTestSet){
    for (let i = 0; i <= this.parameters.length - 2; ++i){
      for (let j = i + 1; j <= this.parameters.length - 1; ++j){
        const v1 = bestTestSet[i];
        const v2 = bestTestSet[j];
        //console.log("Decrementing the unused counts for " + v1 + " and " + v2);
        --this.unusedCounts[v1];
        --this.unusedCounts[v2];
        //console.log("Setting unusedPairsSearch at " + v1 + " , " + v2 + " to 0");
        this.unusedPairsSearch[v1][v2] = 0;
        for (let p = 0; p < this.unusedPairs.length; ++p){
          const curr = this.unusedPairs[p];
          if (curr[0] == v1 && curr[1] == v2){
            this.unusedPairs.splice(p,1);
          }
        }
      }
    }
  }
  /**
   * PRIVATE:return parameter value
   * @param {string} parameterValue a parameter value
   * @returns {string} parameterValue selected parameter value
   * @desc
   * For example.
   *
   * - 1) alias -> select each randomly
   *  - Win 10 | Win 8 | Win 7 ->
   * - 2) no alias -> return parameterValue
   *  - Win 10
   */
  _parameterValue(parameterValue){
    const aliases = parameterValue.split("|");
    return aliases.length > 1 ?
      aliases[Math.floor(Math.random() * aliases.length)].trim() :
      parameterValue;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Qict;
} else {
  window.Qict = Qict;
}
