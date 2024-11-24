async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error('api 요청 실패');

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error(error);
  }
}

function displayProducts(products) {
  const container = document.querySelector('#all-products .container');
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const productElement = createProductElement(product);
    fragment.appendChild(productElement);
  });

  container.appendChild(fragment);
}

function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  productElement.innerHTML = `
    <div class="product-picture">
      <img src="${product.image}" alt="product: ${product.title}" width="250" loading="lazy">
    </div>
    <div class="product-info">
      <h5 class="categories">${product.category}</h5>
      <h4 class="title">${product.title}</h4>
      <h3 class="price"><span>US$ ${product.price}</span></h3>
      <button>Add to bag</button>
    </div>
  `;

  return productElement;
}

loadProducts();

function processHeavyOperation(startIndex, chunkSize) {
  const endIndex = Math.min(startIndex + chunkSize, 10000000);

  for (let i = startIndex; i < endIndex; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
  }

  if (endIndex < 10000000) {
    setTimeout(() => {
      processHeavyOperation(endIndex, chunkSize);
    }, 0);
  }
}

processHeavyOperation(0, 1000);
