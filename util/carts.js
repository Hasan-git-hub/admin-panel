const API_URL = "https://fakestoreapi.com/carts";
const elList = document.querySelector(".carts-product");
const createBtn = document.querySelector(".create");
const date = new Date();
const day = date.toLocaleDateString();

let mode = "create";
let currentId = null;

async function getProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error(err);
  }
}

function render(data) {
  elList.innerHTML = "";
  data.forEach(createCard);
}

function createCard({ id, userId }) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = id;

  card.innerHTML = `
    <div class="carts">
      <div>
        <h3 class="carts-id">${id}</h3>
        <div class="carts-userId">${userId}</div>
      </div>

      <p class="carts-date">${day}
      </p>
    </div>
  `;

  elList.appendChild(card);
}
getProducts();
