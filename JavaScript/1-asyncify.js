'use strict';

// Synchronous function to callback-last

const asyncify =
  (fn) =>
  (...args) => {
    const callback = args.pop();
    setTimeout(() => {
      try {
        const result = fn(...args);
        if (result instanceof Error) callback(result);
        else callback(null, result);
      } catch (error) {
        callback(error);
      }
    }, 0);
  };

// Usage

const twice = (x) => x * 2;
const twiceAsync = asyncify(twice);

const half = (x) => x / 2;
const halfAsync = asyncify(half);

const result = half(twice(100));
console.dir({ sync: result });

twiceAsync(100, (e, value) => {
  halfAsync(value, (e, result) => {
    console.dir({ asyncified: result });
  });
});
