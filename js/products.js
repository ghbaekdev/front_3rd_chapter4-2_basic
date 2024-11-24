async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  // Find the container where products will be displayed
  const container = document.querySelector('#all-products .container');

  // Iterate over each product and create the HTML structure safely
  products.forEach((product) => {
    // Create the main product div
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    // Create the product picture div
    const pictureDiv = document.createElement('div');
    pictureDiv.classList.add('product-picture');
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = `product: ${product.title}`;
    img.width = 250;
    pictureDiv.appendChild(img);

    // Create the product info div
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('product-info');

    const category = document.createElement('h5');
    category.classList.add('categories');
    category.textContent = product.category;

    const title = document.createElement('h4');
    title.classList.add('title');
    title.textContent = product.title;

    const price = document.createElement('h3');
    price.classList.add('price');
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement('button');
    button.textContent = 'Add to bag';

    // Append elements to the product info div
    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    // Append picture and info divs to the main product element
    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    // Append the new product element to the container
    container.appendChild(productElement);
  });
}

loadProducts();

// 무거운 연산을 청크로 나누어 처리하는 함수
function processHeavyOperation(startIndex, chunkSize) {
  const endIndex = Math.min(startIndex + chunkSize, 10000000);

  for (let i = startIndex; i < endIndex; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
  }

  if (endIndex < 10000000) {
    // 다음 청크를 처리하기 위해 requestAnimationFrame 사용
    requestAnimationFrame(() => {
      processHeavyOperation(endIndex, chunkSize);
    });
  }
}

//   function processHeavyOperation(startIndex, chunkSize) {
//     const endIndex = Math.min(startIndex + chunkSize, 10000000);

//     for (let i = startIndex; i < endIndex; i++) {
//       const temp = Math.sqrt(i) * Math.sqrt(i);
//     }

//     if (endIndex < 10000000) {
//       setTimeout(() => {
//         processHeavyOperation(endIndex, chunkSize);
//       }, 0);  // 또는 적절한 지연 시간 설정
//     }
//   }

// 1000개 단위로 청크를 나누어 처리 시작
processHeavyOperation(0, 1000);
