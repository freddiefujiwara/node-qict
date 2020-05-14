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
  bestPair(){
    let bestWeight = 0;
    let indexOfBestPair = 0;
    this.unusedPairs.forEach((p,i) =>{
      let weight = this.unusedCounts[p[0]] + this.unusedCounts[p[1]];
      if(weight > bestWeight){
        indexOfBestPair = i;
      }
    });
    return this.unusedPairs[indexOfBestPair];
  }
}

module.exports = Qict;
