class Qict {
  constructor(file){
    this.file = file;
    this.clean();
  }
  readFile(){
    const fs = require('fs');
    this.contents = fs.readFileSync(this.file, 'utf8').trim();
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
      for (let j = 0; j < this.legalValues[i].length; ++j) {
        this.parameterPositions[k++] = i;
      }
    }
    for (let i = 0; i < this.allPairsDisplay.length; ++i){
      ++this.unusedCounts[this.allPairsDisplay[i][0]];
      ++this.unusedCounts[this.allPairsDisplay[i][1]];
    }
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
}

module.exports = Qict;
