const fs = require("node:fs/promises");
const path = require("node:path");
const LINE =
    /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

// Asynchronous function to check if a file exists at the given file path
async function checkFileExists(filePath) {
    try {
        // Attempt to access the file using fs.promises.access() with F_OK flag
        // This checks if the file exists and is visible to the calling process
        const exist = await fs.access(filePath, fs.constants.F_OK); // undefined or error
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

// This function parses the content of a string 'src' representing key-value pairs,
// extracting each pair and returning them as an object.
function parseToObj(filePath) {
    const obj = {};

    // Convert buffer to string
    let lines = filePath.toString();

    // Normalize line breaks
    lines = lines.replace(/\r\n?/gm, "\n");

    let match;

    // Iterate through each line and extract key-value pairs using regex
    while ((match = LINE.exec(lines)) != null) {
        const key = match[1];

        // Get the value, default to an empty string if not defined
        let value = match[2] || "";

        // Trim leading and trailing whitespace from the value
        value = value.trim();

        // Check if the value may be quoted
        const maybeQuote = value[0];

        // Remove surrounding quotes from the value
        value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

        // If the value is quoted, replace special characters
        if (maybeQuote === '"') {
            value = value.replace(/\\n/g, "\n");
            value = value.replace(/\\r/g, "\r");
        }

        // Store the key-value pair in the object
        obj[key] = value;
    }

    // Return the object with parsed data
    return obj;
}
console.log(process.env);
