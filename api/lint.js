function luaLinter(code) {
    const errors = [];
    
    if (!code.trim()) {
        errors.push("Code cannot be empty.");
    }
    if (code.includes("error")) {
        errors.push("Syntax Error: Unexpected token 'error'.");
    }
    if (!code.includes("function") && !code.includes("=")) {
        errors.push("Warning: No function or assignment detected.");
    }

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
