'use strict';

// Callback-last function to Promise-returning

const promisify = fn => (...args) => new Promise(
  (resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }
);

// Usage

const twiceCallback = (x, callback) => {
  callback(null, x * 2);
};
const twicePromise = promisify(twiceCallback);

const halfCallback = (x, callback) => {
  callback(null, x / 2);
};
const halfPromise = promisify(halfCallback);

twiceCallback(100, (e, value) => {
  halfCallback(value, (e, result) => {
    console.dir({ callbackLast: result });
  });
});

twicePromise(100)
  .then(value => halfPromise(value))
  .then(result => {
    console.dir({ promisified: result });
  });
