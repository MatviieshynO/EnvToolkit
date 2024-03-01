const fs = require("node:fs/promises");
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

// Asynchronous function to read the content of a file
async function readFile(filePath) {
    try {
        // Use the 'fs' module's 'readFile' function to read the content of the file
        // 'await' is used to wait for the asynchronous operation to complete
        const content = await fs.readFile(filePath, "utf8");

        // If successful, return the content of the file
        return content;
    } catch (error) {
        // If an error occurs during file reading, log an error message to the console
        console.error(`Error reading file: ${error.message}`);

        // Re-throw the error to propagate it further up the call stack
        throw error;
    }
}

// Asynchronous function to create a file with specified content at the given file path
async function createFile(filePath, content) {
    try {
        // Using fs.writeFile to write content to the file at the specified path
        await fs.writeFile(filePath, content, "utf8");

        // Logging a success message to the console if the file creation is successful
        console.log(`File created: ${filePath}`);
    } catch (error) {
        // Handling errors: logging an error message to the console and rethrowing the error
        console.error(`Error creating file: ${error.message}`);
        throw error;
    }
}
