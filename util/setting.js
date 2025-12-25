const API_URL = "https://fakestoreapi.com/products";
const elList = document.querySelector(".setting-cards");
const createBtn = document.querySelector(".create");

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

function createCard({ id, title, image, category, price, description }) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = id;

  card.innerHTML = `
    <div class="product-card__media">
      <img class="product-card__img" src="${image}" alt="${title}">
    </div>

    <div class="product-card__body">
      <div>
        <h3 class="product-card__title">${title}</h3>
        <div class="product-card__category">${category}</div>
      </div>

      <div class="product-card__price-row">
        <div class="product-card__price">$${price}</div>
        <div class="product-card__rating">
          <span class="star">★</span>
          <span>4.7</span>
        </div>
      </div>

      <p class="product-card__desc">${description}</p>

      <div class="product-card__actions">
        <button class="btn btn--primary edit-btn">Edit</button>
        <button class="btn btn--ghost delete-btn">Delete</button>
      </div>
    </div>
  `;

  elList.appendChild(card);
}

elList.addEventListener("click", async (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  const id = card.dataset.id;

  if (e.target.classList.contains("delete-btn")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    card.remove();
  }

  if (e.target.classList.contains("edit-btn")) {
    openEdit(card, id);
  }
});

const modal = document.createElement("div");
modal.className = "modal hidden";

modal.innerHTML = `
  <form class="settings-form">
    <input type="url" placeholder="url" required>
    <input type="text" placeholder="title" required>
    <input type="text" placeholder="category" required>
    <input type="number" placeholder="price" required>
    <input type="text" placeholder="description" required>

    <div class="form-actions">
      <button type="submit" class="submit-btn">Save</button>
      <button type="button" class="cancel-btn">Cancel</button>
    </div>
  </form>
`;

document.body.appendChild(modal);

const form = modal.querySelector("form");
const inputs = form.querySelectorAll("input");

createBtn.addEventListener("click", () => {
  mode = "create";
  currentId = null;
  form.reset();
  modal.classList.remove("hidden");
});

modal.querySelector(".cancel-btn").addEventListener("click", () => {
  modal.classList.add("hidden");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    image: inputs[0].value,
    title: inputs[1].value,
    category: inputs[2].value,
    price: Number(inputs[3].value),
    description: inputs[4].value,
  };

  if (mode === "create") {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const newProduct = await res.json();
    createCard(newProduct);
  }

  if (mode === "edit" && currentId) {
    const res = await fetch(`${API_URL}/${currentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const updated = await res.json();
    updateCardDOM(updated);
  }

  modal.classList.add("hidden");
});

function openEdit(card, id) {
  mode = "edit";
  currentId = id;

  inputs[0].value = card.querySelector(".product-card__img").src;
  inputs[1].value = card.querySelector(".product-card__title").textContent;
  inputs[2].value = card.querySelector(".product-card__category").textContent;
  inputs[3].value = card
    .querySelector(".product-card__price")
    .textContent.replace("$", "");
  inputs[4].value = card.querySelector(".product-card__desc").textContent;

  modal.classList.remove("hidden");
}

function updateCardDOM({ id, image, title, category, price, description }) {
  const card = elList.querySelector(`[data-id="${id}"]`);
  if (!card) return;

  card.querySelector(".product-card__img").src = image;
  card.querySelector(".product-card__title").textContent = title;
  card.querySelector(".product-card__category").textContent = category;
  card.querySelector(".product-card__price").textContent = `$${price}`;
  card.querySelector(".product-card__desc").textContent = description;
}

getProducts();
