export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    // Simulating linting process - replace with actual Lua linter logic
    const lintResults = await lintLuaCode(code);

    // Send linting results back to the frontend
    res.status(200).json({ message: lintResults });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Simulate a Lua linter response for now
async function lintLuaCode(code) {
  // For demonstration, check if 'error' is present in the code.
  // Replace this with a call to a real Lua linter API.
  if (code.includes('error')) {
    return 'Syntax error detected in the code!';
  }
  return 'No issues found!';
}
