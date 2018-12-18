'use strict';

// Promise-returning function callback-last / error-first

const callbackify = fn => (...args) => {
  const callback = args.pop();
  fn(...args)
    .then(value => {
      callback(null, value);
    })
    .catch(reason => {
      callback(reason);
    });
};

// Usage

const twicePromise = x => Promise.resolve(x * 2);
const twiceCallback = callbackify(twicePromise);

const halfPromise = x => Promise.resolve(x / 2);
const halfCallback = callbackify(halfPromise);

twicePromise(100)
  .then(value => halfPromise(value))
  .then(result => {
    console.dir({ promise: result });
  });

twiceCallback(100, (e, value) => {
  halfCallback(value, (e, result) => {
    console.dir({ callbackLast: result });
  });
});
