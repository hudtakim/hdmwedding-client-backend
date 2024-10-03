import express, {Express, Request, Response} from "express";
const port = 5001;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello From me, not TS yet asa");
});

app.get("/encrypt-path/:text", (req: Request, res: Response) => {
    const plainText = req.params.text;
    res.json({encrypted: encryptString(plainText)});
});

app.listen(port, () => {
    console.log(`Now listen to port ${port}`);
});

const encryptString = (input :string) => {
    let result = '';

    // Step 1: Convert each character to its char code and manipulate it
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);

        // Step 2: Apply some basic arithmetic operations to obfuscate
        const transformed = (charCode * (i + 1)) % 97; // Arbitrary mod to keep values within range

        // Step 3: Convert the number back to a character in a readable range (a-z)
        const newChar = String.fromCharCode(97 + (transformed % 26)); // Generate a character a-z

        // Add the new character to the result
        result += newChar;
    }

    // Step 4: Generate a consistent 'random' string based on the input itself
    let consistentPart = '';
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        consistentPart += String.fromCharCode(97 + (charCode % 26)); // Generate consistent characters
    }

    // Combine the generated parts (result + consistent part from input)
    result += consistentPart;

    // Step 5: Truncate or pad to ensure the result is exactly 23 characters
    if (result.length > 23) {
        result = result.substring(0, 23);
    } else {
        result = result.padEnd(23, 'x'); // Padding with 'x' to ensure length
    }

    return result;
}