const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("input");
const infoText = document.querySelector(".info-text");
const synonyms = document.querySelector(".synonyms .list");
const volumeIcon = document.querySelector(".word i");
const removeIcon = document.querySelector(".fa-times");
let audio;

const data = (result, word) => {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning fo <span>"${word}"<span>. Please try to search for another word.`;
  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0].definition;
    let example = result[0].meanings[0].definitions[0].example;
    let phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".details span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions;
    document.querySelector(".example span").innerText = example;
    synonyms.innerHTML = "";
    audio = new Audio("https:" + result[0].phonetics[0].audio);

    if (result[0].meanings[0].definitions[0].synonyms[0] === undefined) {
      synonyms.insertAdjacentHTML(
        "beforeend",
        `<span>No synonyms exist.</span>`
      );
    } else {
      for (let i = 0; i < 5; i++) {
        let tag = `<span onClick=search('${result[0].meanings[0].definitions[0].synonyms[i]}')>${result[0].meanings[0].definitions[0].synonyms[i]},</span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }
  }
};

function search(word) {
  wrapper.classList.remove("active");
  searchInput.value = word;
  fetchApi(word);
}

const fetchApi = (word) => {
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

  console.log(window.url);
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      data(result, word);
    });
};

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && event.target.value) {
    fetchApi(event.target.value);
  }
});

volumeIcon.addEventListener("click", () => {
  audio.play();
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
});
