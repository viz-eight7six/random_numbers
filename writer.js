var Heap = require('heap');

class Writer {

  constructor(){
    let minHeap = new Heap(function cmp(a, b) {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
    this.state = {
      queue: minHeap
    };
  }

  enqueue(arr){
    this.state.queue.push(arr);
  }

  writeFirst(){
    let first = this.state.queue.pop();
    console.log(`${first.date}: last number generated was ${first.num}` );
  }
}

module.exports = Writer;


let arr1 = {date:'11/7/2017, 5:22:44 PM', num:1};
let arr2 = {date:'11/7/2017, 5:22:24 PM', num:2};

let writer1 = new Writer();

writer1.enqueue(arr1);
writer1.enqueue(arr2);

writer1.writeFirst();
