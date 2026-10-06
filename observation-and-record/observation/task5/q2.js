// Import the File System module
// It is used to create, write, read, and append files
const fs = require("fs");

// Import the Readline module
// It is used to take input from the user through the terminal
const readline = require("readline");


// Create a readline interface for taking user input
const rl = readline.createInterface({
    input: process.stdin,     // Take input from keyboard
    output: process.stdout   // Display output in terminal
});


// Ask the user to enter a filename
rl.question("Enter filename: ", function (filename) {

    // Ask the user to enter the initial content of the file
    rl.question("Enter initial content: ", function (content) {

        // Create the file and write the initial content into it
        fs.writeFile(filename, content, function (err) {

            // Check if there was an error while creating/writing the file
            if (err) {
                console.log("Error while creating file:", err);

                // Close the readline interface
                rl.close();

                // Stop the current function
                return;
            }

            // Message displayed when the file is successfully created
            console.log("File created and content written successfully.");


            // Read the contents of the newly created file
            // "utf8" converts the file data into readable text
            fs.readFile(filename, "utf8", function (err, data) {

                // Check for errors while reading the file
                if (err) {
                    console.log("Error while reading file:", err);
                    rl.close();
                    return;
                }

                // Display the initial contents of the file
                console.log("\nInitial file contents:");
                console.log(data);


                // Ask the user for additional content
                rl.question("\nEnter additional content: ", function (additionalContent) {

                    // Append the new content to the existing file
                    fs.appendFile(
                        filename,

                        // Add a new line before the additional content
                        "\n" + additionalContent,

                        function (err) {

                            // Check if there was an error while appending
                            if (err) {
                                console.log("Error while appending:", err);
                                rl.close();
                                return;
                            }

                            // Display success message
                            console.log("Content appended successfully.");


                            // Read the file again to display the final contents
                            fs.readFile(filename, "utf8", function (err, finalData) {

                                // Check for error while reading the final file
                                if (err) {
                                    console.log("Error while reading final file:", err);
                                } else {

                                    // Display the final contents after appending
                                    console.log("\nFinal file contents:");
                                    console.log(finalData);
                                }

                                // Close the readline interface
                                rl.close();
                            });
                        }
                    );
                });
            });
        });
    });
});