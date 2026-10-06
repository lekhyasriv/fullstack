const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter filename: ", function (filename) {

    rl.question("Enter content: ", function (content) {

        // Create and write the file
        fs.writeFileSync(filename, content);
        console.log("File created successfully.");

        // Read the file
        let data = fs.readFileSync(filename, "utf8");
        console.log("\nFile contents:");
        console.log(data);

        // Append additional content
        fs.appendFileSync(filename, "\nThis is additional content.");

        // Read final contents
        let finalData = fs.readFileSync(filename, "utf8");

        console.log("\nFinal file contents:");
        console.log(finalData);

        rl.close();
    });
});