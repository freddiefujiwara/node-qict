class Qict {
  constructor(file){
    this.poolSize = 20;
    this.clean();
  }
  readFile(file){
    const fs = require('fs');
    this.contents = fs.readFileSync(file, 'utf8').trim();
  }
  initialize(){
    this.clean();
    //readlines
    this.contents.split(/\r\n/).forEach((line) => {
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
        values.push(this.numberParameterValues);
        this.parameterValues.push(value.trim());
        this.numberParameterValues++;
      });
      this.legalValues.push(values)
      this.numberParameters ++;
    });
    for (let i = 0; i < this.numberParameterValues; ++i){
      let row = new Array();
      for (let j = 0; j < this.numberParameterValues; ++j){
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
            this.allPairsDisplay.push(pair);
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
    this.allPairsDisplay.forEach((a) => {
      ++this.unusedCounts[a[0]];
      ++this.unusedCounts[a[1]];
    })
  }
  clean(){
    this.allPairsDisplay = new Array();
    this.parameters = new Array();
    this.parameterValues = new Array();
    this.parameterPositions = new Array();
    this.legalValues = new Array();
    this.unusedCounts = new Array();
    this.unusedPairs = new Array();
    this.unusedPairsSearch = new Array();
    this.numberParameters = 0;
    this.numberParameterValues = 0;
    this.numberPairs = 0;
  }
  best(){
    let bestWeight = 0;
    let indexOfBestPair = 0;
    //console.log("unusedPairs.Count = " + this.unusedPairs.length);
    this.unusedPairs.forEach((curr,i) =>{
      let weight = this.unusedCounts[curr[0]] + this.unusedCounts[curr[1]];
      if(weight > bestWeight){
        bestWeight = weight;
        indexOfBestPair = i;
      }
    });
    return this.unusedPairs[indexOfBestPair];
  }
  ordering(best){
    let ordering = new Array();
    let firstPos = this.parameterPositions[best[0]];
    let secondPos = this.parameterPositions[best[1]];
    for(let i = 0 ; i < this.numberParameters; i++){
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
  testSet(best,ordering){
    let testSet = new Array();
    let firstPos = this.parameterPositions[best[0]];
    let secondPos = this.parameterPositions[best[1]];
    for(let i = 0 ; i < this.numberParamterValues ; i++){
      testSet.push(0);
    }
    testSet[firstPos] = best[0];
    testSet[secondPos] = best[1];
    //console.log("Placed params " + best[0] + " " + best[1] + " at " + firstPos + " and " + secondPos);
    for (let i = 2; i < this.numberParameters; ++i){
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
  candidateSets(){
    let candidateSets = new Array();
    for(let candidate = 0 ; candidate < this.poolSize ; candidate++){
      const best = this.best();
      const ordering = this.ordering(best);
      const testSet = this.testSet(best,ordering);
      candidateSets.push(testSet)
    }
    return candidateSets;
  }
  NumberPairsCaptured(ts){
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
  bestCandidate(candidateSets){
    let indexOfBestCandidate = 0;
    let mostPairsCaptured = 0;
    for (let i = 0; i < candidateSets.length; ++i){
      let pairsCaptured = this.NumberPairsCaptured(candidateSets[i]);
      if (pairsCaptured > mostPairsCaptured){
        mostPairsCaptured = pairsCaptured;
        indexOfBestCandidate = i;
      }
      //console.log(`Candidate ${i} captured ${mostPairsCaptured}`)
    }
    console.log("Candidate number " + indexOfBestCandidate + " is best");
    return candidateSets[indexOfBestCandidate];
  }
  modifyUnused(bestTestSet){
    for (let i = 0; i <= this.numberParameters - 2; ++i){
      for (let j = i + 1; j <= this.numberParameters - 1; ++j){
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
  testSets(){
    let testSets = new Array();
    while(this.unusedPairs.length > 0){
      const candidateSets = this.candidateSets();
      const bestCandidate = this.bestCandidate(candidateSets);
      testSets.push(bestCandidate);
      this.modifyUnused(bestCandidate);
    }
    return testSets;
  }
}
module.exports = Qict;
