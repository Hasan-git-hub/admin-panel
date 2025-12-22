const request = new XMLHttpRequest();
const elList = document.querySelector(".setting-cards");
const addBtn = document.getElementById("addProduct");

request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    const data = JSON.parse(request.responseText);
    showData(data);
  }
});

request.open("GET", "https://fakestoreapi.com/products");

request.send();

function showData(data) {
  elList.innerHTML = "";
  data.forEach((item) => createCard(item));
}

function createCard({ title, image, id, category, price, description }) {
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
        <button class="btn btn--ghost delete-btn ${id}">Delete</button>
      </div>
    </div>
  `;

  elList.appendChild(card);
}

elList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".product-card").remove();
  }
});

const wrapeer = document.querySelector(".settings-wrapper")

const createBtn = document.querySelector(".create");

const modal = document.createElement("div");
modal.className = "modal hidden";

modal.innerHTML = `
  <form class="settings-form">
    <input type="url" placeholder="Image URL" required>
    <input type="text" placeholder="Title" required>
    <input type="text" placeholder="Category" required>
    <input type="number" placeholder="Price" required>
    <input type="text" placeholder="Description" required>

    <div class="form-actions">
      <button type="submit" class="submit-btn">Submit</button>
      <button type="button" class="cancel-btn">Clean</button>
    </div>
  </form>
`;

document.body.appendChild(modal);

createBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

modal.querySelector(".cancel-btn").addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const [
    img,
    title,
    category,
    price,
    description
  ] = e.target.querySelectorAll("input");

  createCard({
    id: Date.now(),
    image: img.value,
    title: title.value,
    category: category.value,
    price: price.value,
    description: description.value
  });

  e.target.reset();
  modal.classList.add("hidden");
});

