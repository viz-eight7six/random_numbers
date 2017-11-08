# Random Number Generator

## How to Run
  1. Pull this repo
  2. run npm install
  3. run node test.js

## Features
  Generates random numbers (1 - 5) based on the following ratios
  *  1: 50%
  *  2: 25%
  *  3: 15%
  *  4: 5%
  *  5: 5%

  Prints statistics of last 100 numbers(or less)

  Writer class uses a heap to sort all queued data to ensure we have every
  item is sorted in chronological order

## Test
  Our test creates a pseudo-multithreading by running asynchronously and
  using intervals. We run five different random number generators and when
  each time a number is generated we enqueue the data into one writer.
  At the end of our tests, we list our sorted queue and all the five
  generators statistics, and write our queue to data.txt.
