var Writer = require("./writer.js");
var Generator = require("./generator.js");

let writer1 = new Writer();
let gen1 = new Generator();
let gen2 = new Generator();
let gen3 = new Generator();
let gen4 = new Generator();
let gen5 = new Generator();

//for statistical purposes we generate 100 random numbers in each generator first
for(var i = 0; i <100 ; i++){
  gen1.generateNum();
  gen2.generateNum();
  gen3.generateNum();
  gen4.generateNum();
  gen5.generateNum();
}

console.log("Running Tests for 11 seconds, please wait");

//we simulate multithreading with asynchronous functions since node is single
//threaded and this is a simple problem we create five intervals that run each
//generator separately but using a single writer queue
let intOne = setInterval(() => {
            gen1.generateNum(() => {
              writer1.enqueue(gen1.lastNum());
            });
          }, 1000);
let intTwo = setInterval(() => {
            gen2.generateNum(() => {
              writer1.enqueue(gen2.lastNum());
            });
          }, 1500);
let intThree = setInterval(() => {
            gen3.generateNum(() => {
              writer1.enqueue(gen3.lastNum());
            });
          }, 2000);
let intFour = setInterval(() => {
            gen4.generateNum(() => {
              writer1.enqueue(gen4.lastNum());
            });
          }, 4000);
let intFive = setInterval(() => {
            gen5.generateNum(() => {
              writer1.enqueue(gen5.lastNum());
            });
          }, 5000);

//at the end of 11 seconds we generate the whole queue and also print out the statistics
//of each generator

setTimeout(() => {
  clearInterval( intOne );
  clearInterval( intTwo );
  clearInterval( intThree );
  clearInterval( intFour );
  clearInterval( intFive );
  console.log(writer1.state.queue);
  console.log('generator1 stats:\n', gen1.generateStats());
  console.log('generator2 stats:\n', gen2.generateStats());
  console.log('generator3 stats:\n', gen3.generateStats());
  console.log('generator4 stats:\n', gen4.generateStats());
  console.log('generator5 stats:\n', gen5.generateStats());
}, 11000);
