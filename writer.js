//we use a heap to ensure everytime something is queued into the writer
//that is is sorted chronologically
var Heap = require('heap');
var fs = require('fs');

class Writer {

  constructor(){
    //min heap so first items come first, we compare by date
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
  //push to queue
  enqueue(arr){
    this.state.queue.push(arr);
  }
  //when we decide to write we remove teh first item in the queue and write
  //to file a string with the date and the number generated
  writeFirst(){
    let first = this.state.queue.pop();
    let appendString = `${first.date}: number generated was ${first.num}`;
    fs.appendFile('data.txt', `\n${appendString}`, function (err) {
      if (err) throw err;
    });
  }

  writeAll(){
    //add a space to separate data everytime we call writeAll
    fs.appendFile('data.txt', ``, function (err) {
      if (err) throw err;
    });
    while(!this.state.queue.empty()){
      this.writeFirst();
    }
    console.log('All Data Saved!');
  }

}

module.exports = Writer;


// test script
// let arr1 = {date:'11/7/2017, 5:22:44 PM', num:1};
// let arr2 = {date:'11/7/2017, 5:22:24 PM', num:2};
//
// let writer1 = new Writer();
// writer1.enqueue(arr1);
// writer1.enqueue(arr2);
//
// writer1.writeFirst();
