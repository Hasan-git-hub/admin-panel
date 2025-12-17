const request = new XMLHttpRequest();
const elList = document.querySelector(".setting-cards");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4) {
    const data = JSON.parse(request.responseText);
    showData(data);
  }
});

request.open("GET", "https://fakestoreapi.com/products");

request.send();

function showData(data) {
  data.map(({ title, image, id, category, price, description }, index) => {
    elList.innerHTML += `
    
      <article class="product-card" aria-label="Mens Cotton Jacket">
        <div class="product-card__media">
          <img
          width="100%"
          height= "200"
            class="product-card__img"
            src=${image}
            alt="Mens Cotton Jacket"
          />
        </div>

        <div class="product-card__body">
          <div>
            <h3 class="product-card__title">${title}</h3>
            <div class="product-card__category">${category}</div>
          </div>

          <div class="product-card__price-row">
            <div class="product-card__price">$${price}</div>
            <div
              class="product-card__rating"
              title="4.7 out of 5 (500 reviews)"
            >
              <span class="star">★</span>
              <span>4.7</span>
              <small style="opacity: 0.6">(500)</small>
            </div>
          </div>

          <p class="product-card__desc">
       ${description}
          </p>

          <div class="product-card__actions">
            <button class="btn btn--primary" type="button">Edit</button>
            <button class="btn btn--ghost" type="button">View</button>
          </div>
          
        </div>
      </article>
    
    
    `;
  });
}
