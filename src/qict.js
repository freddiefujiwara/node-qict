class Qict {
  constructor(file){
    this.file = file;
    this.clean();
  }
  readFile(){
    const fs = require('fs');
    this.contents = fs.readFileSync(this.file, 'utf8').trim();
  }
  extractParameters(){
    this.clean();
    this.contents.split(/\r\n/).forEach((line) => {
      const pair = line.split(/:/);
      if(pair.length > 1){
        let values = new Array();
        pair[1].split(/,/).forEach((value) => {
          this.parameterValues.push(value.trim());
          values.push(value.trim());
          this.numberParameterValues++;
        });
        this.legalValues.push(values)
      }
      this.parameters.push(pair[0]);
      this.numberParameters ++;
    });
    for (let i = 0; i <= this.legalValues.length - 2; ++i){
      for (let j = i + 1; j <= this.legalValues.length - 1; ++j){
        this.numberPairs += (this.legalValues[i].length * this.legalValues[j].length);
      }
    }
  }
  clean(){
    this.parameters = new Array();
    this.parameterValues = new Array();
    this.legalValues = new Array();
    this.numberParameters = 0;
    this.numberParameterValues = 0;
    this.numberPairs = 0;
  }
}

module.exports = Qict;
