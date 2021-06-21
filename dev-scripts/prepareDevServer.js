/* eslint-disable no-console */
const fs = require("fs");

const logFilePath = "./dev-scripts/webpack-dev-server.log";
const errorLogFilePath = "./dev-scripts/webpack-dev-server-error.log";

console.log("Preparing webpack development server.");

// Delete the old webpack-dev-server.log if it is present
try {
  fs.unlinkSync(logFilePath);
} catch (error) {
  // Existing webpack-dev-server log file may not exist
}

// Delete the old webpack-dev-server-error.log if it is present
try {
  fs.unlinkSync(errorLogFilePath);
} catch (error) {
  // Existing webpack-dev-server-error log file may not exist
}
