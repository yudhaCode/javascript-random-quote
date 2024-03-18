// Define fetchQuote function outside the DOMContentLoaded event listener
function fetchQuote(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];
      document.querySelector(".header h2").textContent = `${quote.author}`;
      document.querySelector(".content p").textContent = `“${quote.text}”`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const btnGenerate = document.querySelector(".btn-generate");
  const btnCopy = document.querySelector(".btn-copy");
  const btnFamous = document.querySelector(".btn-famous");
  const btnInspirational = document.querySelector(".btn-inspirational");

  btnGenerate.addEventListener("click", function () {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex];
        document.querySelector(".header h2").textContent = `${quote.author}`;
        document.querySelector(".content p").textContent = `“${quote.text}”`;
      });
  });

  btnCopy.addEventListener("click", function () {
    const quoteToCopy = `${document.querySelector(".header h2").textContent}\n${
      document.querySelector(".content p").textContent
    }`;
    navigator.clipboard
      .writeText(quoteToCopy)
      .then(() => {
        alert("Quote copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  });

  btnFamous.addEventListener("click", function () {
    fetchQuote("https://type.fit/api/quotes?category=famous");
  });

  btnInspirational.addEventListener("click", function () {
    fetchQuote("https://type.fit/api/quotes?category=inspirational");
  });
});
