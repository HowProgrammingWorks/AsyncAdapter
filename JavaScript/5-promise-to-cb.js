'use strict';

// Convert Promise to callback-last

const promiseToCallbackLast = promise => callback => {
  promise.then(value => {
    callback(null, value);
  }).catch(reason => {
    callback(reason);
  });
};

// Usage

const promise = Promise.resolve('value');
const fnCallbackLast = promiseToCallbackLast(promise);

fnCallbackLast((e, result) => {
  console.dir({ callbackLast: result });
});
