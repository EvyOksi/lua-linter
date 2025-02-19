function luaLinter(code) {
    const errors = [];
    const lines = code.split("\n");

    if (!code.trim()) {
        errors.push("Code cannot be empty.");
    }

    lines.forEach((line, index) => {
        if (/[^a-zA-Z0-9_()\s=]/.test(line) && !line.includes("--")) {
            errors.push(`Syntax Error on line ${index + 1}: Unexpected character.`);
        }
        if (line.includes("=") && !line.includes("local") && !line.includes("function")) {
            errors.push(`Warning on line ${index + 1}: Assignment without 'local' or function.`);
        }
        if (line.includes("error")) {
            errors.push(`Syntax Error on line ${index + 1}: Unexpected 'error'.`);
        }
    });

    return errors.length ? errors.join("\n") : "No issues found!";
}

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided." });
    }

    const lintResults = luaLinter(code);

    res.status(200).json({ message: lintResults });
}
