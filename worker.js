// Create a new file, e.g., "computation.worker.js"
// computation.worker.js
// This file will run your heavy computation in a Web Worker

// Perform your heavy computation
function performComputation(data) {
  // Your heavy computation logic goes here
  // ...
  return result;
}

// Listen for messages from the main thread
self.onmessage = (event) => {
  const { data } = event;

  // Perform the heavy computation
  const result = performComputation(data);

  // Send the computed result back to the main thread
  self.postMessage(result);
};
