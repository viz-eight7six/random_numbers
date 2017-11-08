

class Generator {

  //initialize with a empty array store
  constructor(){
    this.state = {
      store: []
    };
  }

  //psuedo private get random number using Math.random
  _getRandomNum(){
    let num = Math.random();
    if(num < 0.5){
      return 1;
    }
    else if(num < 0.75){
      return 2;
    }
    else if (num < 0.9){
      return 3;
    }
    else if (num < 0.95){
      return 4;
    }
    else {
      return 5;
    }
  }

  //private store method, if array goes past 100 we shift/dequeue
  _storeResult(num){
    if(this.state.store.length === 100){
      this.state.store.shift();
    }
    this.state.store.push(num);
  }

  //our public method to handle our number generation
  generateNum(cb){
    let num = this._getRandomNum();
    this._storeResult(num);
    if(cb){cb();}
    return num;
  }

  //generates our last number generated and return it as a obj with date and the number
  lastNum(){
    let date = new Date(new Date().getTime()).toLocaleString();
    let last = this.state.store[this.state.store.length - 1];
    return {date:date, num:last};
  }

  //generate our results my doing some simple math we find our last 100 or less
  //and return the results as a string
  generateStats(){
    let countHash = {1:0, 2:0, 3:0, 4:0, 5:0};
    let count = this.state.store.length;
    this.state.store.forEach(num => {
      countHash[num] += 1;
    });
    //we print out our results to 3 sigfigs, when the queue has 100 numbers
    //we should just get whole numbers
    let result =
`Results:
  1: ${(countHash[1]/count*100).toPrecision(3)}%
  2: ${(countHash[2]/count*100).toPrecision(3)}%
  3: ${(countHash[3]/count*100).toPrecision(3)}%
  4: ${(countHash[4]/count*100).toPrecision(3)}%
  5: ${(countHash[5]/count*100).toPrecision(3)}%`;
    return result;
  }
}

module.exports = Generator;

//test script
// let one = new Generator();
// for(var i = 0; i <100 ; i++){
//   one.generateNum();
// }
// console.log(one.generateStats());
// console.log(one.lastNum());
