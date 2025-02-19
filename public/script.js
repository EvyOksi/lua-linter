document.getElementById('lintButton').addEventListener('click', function () {
  const code = document.getElementById('codeInput').value;

  fetch('/api/lint', {
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
