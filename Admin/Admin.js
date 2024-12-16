const toggleFormBtn = document.getElementById("toggle-form-btn");
const formSection = document.getElementById("form-section");
const productForm = document.getElementById("product-form");
const productsTableBody = document.querySelector(".products-table").querySelector("tbody");
const statValue = document.querySelectorAll(".stat-value");
toggleFormBtn.addEventListener("click", () => {
  formSection.classList.toggle("active");
});


function setValues(products)
{
  totalProducts = products.length;

  statValue.forEach(stat => {
    console.log(products)
    if(stat.id == "total-products") stat.innerHTML = totalProducts;

    const uniqueCategories = new Set(products.map(product => product.category));
    if(stat.id == "total-categories") stat.innerHTML = uniqueCategories.size;
    
    let totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    console.log(totalPrice)
    let averagePrice = totalPrice / totalProducts;
    console.log(averagePrice)
    if(stat.id == "average-price") stat.innerHTML = `${averagePrice.toFixed(2)}`;
  }
)
}

// Fetch products data from an API and populate the table
async function fetchProducts() {
  try {
    let products = await axios.get('http://127.0.0.1:8000/ApiView/getProduct/0/');
    products = products.data.reverse();

    setValues(products);
    // Clear existing rows
    productsTableBody.innerHTML = "";
    
    // Add new rows
    products.forEach((product) => {
      productsTableBody.innerHTML += `
            <tr>
            <td>
            <div class="product-cell">
            <img src="http://127.0.0.1:8000${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-category">${product.category}</div>
            </div>
            </div>
            </td>
            <td>${product.category}</td>
            <td class="price">$${product.price}</td>
            <td>
            <div class="actions">
            <button href="#edit-form-section" class="action-btn" id='Edit' data-id="${product.id}">✏️</button>
            <button class="action-btn" id='Delete' data-id="${product.id}">🗑️</button>
            </div>
            </td>
            </tr>
            `;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

const editFormSection = document.getElementById("edit-form-section");
const editProductForm = document.getElementById("edit-product-form");
const cancelEditBtn = document.getElementById("cancel-edit");

async function editProduct(id) {
  let product = await axios.get(`http://127.0.0.1:8000/ApiView/getProduct/${id}/`);
  product = product.data;

  document.getElementById("edit-product-id").value = id;
  document.getElementById("edit-product-name").value = product.name;
  document.getElementById("edit-product-description").value = product.description;
  document.getElementById("edit-product-category").value = product.category;
  document.getElementById("edit-product-price").value = product.price;

  document.getElementById("form-title-id").innerHTML = `Edit Product Id: ${id}`;

  editFormSection.classList.add("active");
  formSection.classList.remove("active");
}

editProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("edit-product-id").value;
  const name = document.getElementById("edit-product-name").value;
  const desc = document.getElementById("edit-product-description").value;
  const category = document.getElementById("edit-product-category").value;
  const price = document.getElementById("edit-product-price").value;
  const image = document.getElementById("edit-product-image").files[0];

  let formData = new FormData();
  formData.append("name", name);
  formData.append("description", desc);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("image", image);

  changeProduct(id, "put", formData);
});

cancelEditBtn.addEventListener("click", () => {
  editFormSection.classList.remove("active");
  editProductForm.reset();
});

productsTableBody.addEventListener("click", (e) => {
  let btn = e.target;
  let id = btn.getAttribute("data-id");
  if (btn.id == "Delete") {
    changeProduct(id, "delete");
  } else if (btn.id == "Edit") {
    editProduct(id);
  }
});
async function changeProduct(id, method, editedData = {}) {
  await axios({
    method: `${method}`,
    url: `http://127.0.0.1:8000/ApiView/change/${id}/`,
    data: editedData,
  });
  fetchProducts();
}

// Handle product form submission
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const desc = document.getElementById("product-description").value;
  const category = document.getElementById("product-category").value;
  const price = document.getElementById("product-price").value;
  const image = document.getElementById("product-image").files[0];

  let formData = new FormData();
  formData.append("name", name);
  formData.append("description", desc);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("image", image);

  const response = await axios.post(
    'http://127.0.0.1:8000/ApiView/setProduct/',
    formData
  );

  if (response.status == 200) {
    fetchProducts();
    productForm.reset();
  } else {
    alert("Form Not Submitted");
  }
});


// Initialize the table with API data
fetchProducts();