export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided." });
    }

    try {
        // Call an external Lua linter (or use a library if available)
        // This is a placeholder: you'll need an actual Lua linting service
        const lintResults = fakeLuaLinter(code); 

        res.status(200).json({ message: lintResults });
    } catch (error) {
        res.status(500).json({ error: "Linting failed." });
    }
}

// Placeholder Lua Linter (Replace with actual implementation)
function fakeLuaLinter(code) {
    if (code.includes("error")) {
        return "Syntax Error: Unexpected token 'error'";
    }
    return "No issues found!";
}
