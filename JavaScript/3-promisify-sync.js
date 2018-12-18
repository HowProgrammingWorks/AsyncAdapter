'use strict';

// Synchronous function to Promise-returning

const promisifySync = fn => (...args) => {
  try {
    const result = fn(...args);
    if (result instanceof Error) return Promise.reject(result);
    else return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Usage

const twice = x => x * 2;
const twicePromise = promisifySync(twice);

const half = x => x / 2;
const halfPromise = promisifySync(half);

const result = half(twice(100));
console.dir({ sync: result });

twicePromise(100)
  .then(value => halfPromise(value))
  .then(result => {
    console.dir({ promise: result });
  });
