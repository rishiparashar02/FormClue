const backendURL = "https://formclue-backend.onrender.com/suggest";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processQuestions() {
  const questionContainers = document.querySelectorAll(".Qr7Oae");

  for (let container of questionContainers) {
    const labelEl = container.querySelector(".M7eMe");
    if (!labelEl) continue;

    const questionText = labelEl.textContent.trim();
    if (!questionText || container.querySelector(".ai-suggestion")) continue;

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: questionText })
      });

      const data = await res.json();
      const suggestion = data?.suggestion || "No suggestion available.";

      const suggestionDiv = document.createElement("div");
      suggestionDiv.className = "ai-suggestion";
      suggestionDiv.style = `
        margin-top: 8px;
        font-style: italic;
        font-size: 0.9em;
        color: #2e7d32;
        background-color: #e8f5e9;
        padding: 6px 10px;
        border-left: 4px solid #81c784;
        border-radius: 4px;
      `;
      suggestionDiv.textContent = `💡 AI Suggestion: ${suggestion}`;

      const labelContainer = labelEl.closest(".m2") || labelEl.parentElement;
      labelContainer?.parentNode?.insertBefore(suggestionDiv, labelContainer.nextSibling);
    } catch (err) {
      console.error("Failed to fetch AI suggestion:", err);
    }
  }
}

(async () => {
  await sleep(2000);
  processQuestions();
})();
