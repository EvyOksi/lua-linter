document.addEventListener("DOMContentLoaded", function () {
    const editorElement = document.getElementById("luaEditor");
    const resultElement = document.getElementById("lintResults");

    const editor = CodeMirror.fromTextArea(editorElement, {
        mode: "lua",
        lineNumbers: true,
        theme: "default",
        gutters: ["CodeMirror-linenumbers", "lint-gutter"],
    });

    function lintCode() {
        const code = editor.getValue();

        fetch("/api/lint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        })
        .then(response => response.json())
        .then(data => {
            resultElement.textContent = data.message;
            resultElement.style.color = data.message.includes("Error") ? "red" : "green";
        })
        .catch(() => {
            resultElement.textContent = "Error communicating with server.";
            resultElement.style.color = "red";
        });
    }

    editor.on("change", lintCode); // Automatically lint when text changes
});
