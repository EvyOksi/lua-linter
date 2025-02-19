// Function to update line numbers
function updateLineNumbers() {
  const codeInput = document.getElementById('codeInput');
  const lineNumbers = document.getElementById('line-numbers');
  const lines = codeInput.value.split('\n').length;

  let lineNumbersHTML = '';
  for (let i = 1; i <= lines; i++) {
    lineNumbersHTML += i + '<br>';
  }
  lineNumbers.innerHTML = lineNumbersHTML;
}

// Update line numbers on user input
document.getElementById('codeInput').addEventListener('input', updateLineNumbers);

// Initial call to set line numbers
updateLineNumbers();

// Lint button functionality
document.getElementById('lintButton').addEventListener('click', function () {
  const code = document.getElementById('codeInput').value;
  fetch('/lint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code }),
  })
    .then((response) => response.json())
    .then((data) => {
      const results = document.getElementById('results');
      results.textContent = data.message || 'No issues found!';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
