let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
const searchInput = document.getElementById("text");
const PER_PAGE = 6;
let PAGE = 1;
let POSTS;
let subData;
let listCards = [];

fetch("https://freetestapi.com/api/v1/books")
  .then((response) => response.json())
  .then((data) => {
    subData = data;
    render(subData);
    renderPagination(subData);
  })
  .catch((error) => {
    console.log(error);
  });

function render(mainData) {
  const start = (PAGE - 1) * PER_PAGE;
  const end = PER_PAGE * PAGE;
  let template = mainData
    .slice(start, end)
    .map((item, key) => {
      return `
    <div class="products">
    <img src="${
      booksImages.find((image) => image.id === item.id).image
    }" alt="###" />
    <h3>title : ${item.title}</h3>
    <h3>description : ${item.description}</h3>
    <h3>author : ${item.author}</h3>
    <div  class="heart-container" title="Like">
            <input onclick="addToCard(${key})" type="checkbox" class="checkbox" id="Give-It-An-Id">
            <div class="svg-container">
                <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
    </div>
    `;
    })
    .join("");
  let root = document.querySelector("#root");
  root.innerHTML = template;
}

function handleSearch(event) {
  const value = event.target.value;
  let data = subData;
  let resultOfSearch = data.filter((item) => item.title.toLowerCase().search(value) > -1);
  render(resultOfSearch);
}

function renderPagination(subData) {
  const pageLength = subData.length / PER_PAGE;
  const pageArr = Array.from({ length: pageLength }, (_, i) => i + 1);
  const template = pageArr.map((page) => {
    return `<button class='${PAGE === page ? "active" : ""
    }' onclick='handlePagination(${page})'>${page}</button>`;
  });
  document.getElementById("pagination").innerHTML = template.join("");
}
function handlePagination(page) {
  if (PAGE > 1) {
    PAGE = page;
    renderPagination(subData, PAGE);
    render(subData, PAGE)
  } else {
    PAGE = page;
    renderPagination(subData, PAGE);
    render(subData, PAGE)
  }

}
function handleScroll() {
  const header = document.querySelector("header");

  if (window.scrollY > 300) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
}
function handleTheme(theme) {
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    document.body.classList.add(theme);
  } else {
    document.body.classList.remove("dark");
  }
}
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(subData[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((item) => {
    totalPrice = totalPrice + item.price;
    count = count + item.quantity;
    if (item != null) {
      let root = document.createElement("li");
      root.innerHTML = `
          <img src="${
            booksImages.find((image) => image.id === item.id).image
          }" alt="###" />
          <h3>title : ${item.title}</h3>
          <h3>description : ${item.description}</h3>
          <h3>author : ${item.author}</h3>
              <div>
                  <div class="count">${item.quantity}</div>
              </div>`;
      listCard.appendChild(root);
    }
  });
  quantity.innerText = count;
}
function handleTheme(theme) {
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    document.body.classList.add(theme);
  } else {
    document.body.classList.remove("dark");
  }
}
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  handleTheme(theme);
});
openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
