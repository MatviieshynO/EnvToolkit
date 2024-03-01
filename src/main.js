const fs = require("node:fs");
const path = require("node:path");

// Asynchronous function to check if a file exists at the given file path
async function checkFileExists(filePath) {
    try {
        // Attempt to access the file using fs.promises.access() with F_OK flag
        // This checks if the file exists and is visible to the calling process
        await fs.promises.access(filePath, fs.constants.F_OK); // undefined or error

        // If the access attempt is successful, return true indicating the file exists
        return true;
    } catch (error) {
        // If an error occurs (e.g., file does not exist or permissions issue), return false
        return false;
    }
}
