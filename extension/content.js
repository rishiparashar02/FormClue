const BACKEND_URL = "http://localhost:5000/suggest";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processQuestions() {
  const questionContainers = document.querySelectorAll(".Qr7Oae");

  for (let container of questionContainers) {
    const labelEl = container.querySelector(".M7eMe");
    if (!labelEl) continue;

    const questionText = labelEl.textContent.trim();
    if (!questionText || container.querySelector(".ai-suggestion")) continue;
  }
}

(async () => {
  await sleep(2000);
  processQuestions();
})();
