const beginButton = document.querySelector("#begin-investigation");
const loadingMessage = document.querySelector("#loading-message");
const title = document.querySelector("#title");

const fullTitle = title.getAttribute("aria-label");
const lastSpace = fullTitle.lastIndexOf(" ");
const titleLines = [fullTitle.slice(0, lastSpace), fullTitle.slice(lastSpace + 1)];
const letterCount = [...fullTitle].filter((character) => character !== " ").length;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  title.replaceChildren();

  let letterIndex = 0;

  for (const lineText of titleLines) {
    const line = document.createElement("span");
    line.className = "title-line";

    for (const character of lineText) {
      if (character === " ") {
        line.append(" ");
        continue;
      }

      const letter = document.createElement("span");
      letter.className = "title-letter";
      letter.textContent = character;
      line.append(letter);
      window.setTimeout(() => {
        letter.classList.add("is-visible");
      }, (letterIndex / letterCount) * 6000);
      letterIndex += 1;
    }

    title.append(line);
  }

  window.setTimeout(() => {
    title.classList.add("is-flickering");
  }, 6000);
}

beginButton.addEventListener("click", () => {
  loadingMessage.textContent = "Case file loading..";
  beginButton.disabled = true;

  window.setTimeout(() => {
    window.location.href = "exhibit-a.html";
  }, 5000);
});
