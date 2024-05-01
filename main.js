function toggleMenu() {
  var navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// Define some sample products
var products = [
  {
    imageUrl: "images/product1.jpg",
    title: "AMBRARÖNN",
    description: "Vase, 25 cm",
    price: "$20.99",
  },
  {
    imageUrl: "images/product2.jpg",
    title: "SOJABÖNA",
    description: "Vase, 20 cm",
    price: "$24.99",
  },
  {
    imageUrl: "images/product3.webp",
    title: "CHILISTRÅN",
    description: "Vase/watering can",
    price: "$14.99",
  },
  {
    imageUrl: "images/product4.jpg",
    title: "CHIAFRÖN",
    description: "hanso electric incense burner",
    price: "$29.99",
  },
  {
    imageUrl: "images/product5.jpg",
    title: "DAKSJUS",
    description: "Decoration dish, 80 cm",
    price: "$9.99",
  },
  {
    imageUrl: "images/product6.jpg",
    title: "KLYNNON",
    description: "Artificial flower, 30 cm",
    price: "$19.99",
  },
  {
    imageUrl: "images/product7.jpg",
    title: "ASKHOLMEN",
    description: "Tealight holder, 50 cm",
    price: "$39.99",
  },
  {
    imageUrl: "images/product8.jpg",
    title: "DAKSJUS",
    description: "Wall decoration",
    price: "$21.99",
  },
  {
    imageUrl: "images/product9.jpg",
    title: "MUSKOTBLOMMA",
    description: "Scented candle in glass, set of 2",
    price: "$14.99",
  },
  {
    imageUrl: "images/product10.jpg",
    title: "CHILIFRUKT",
    description: "Candle holder, set of 3",
    price: "$34.99",
  },
];

// Call the function to create product elements
var productListContainer = document.getElementById("product-list-container");
productListContainer.appendChild(createProductElements(products));

// Function to create product elements dynamically
function createProductElements(products) {
  // Create a new <ul> element
  var productList = document.createElement("ul");
  productList.classList.add("image-list");

  // Loop through each product and create a list item for it
  products.forEach(function (product) {
    // Create list item for each product
    var listItem = document.createElement("li");

    // Create image element
    var productImg = document.createElement("img");
    productImg.classList.add("image-item");
    productImg.src = product.imageUrl;
    productImg.alt = product.title;

    // Create title element
    var title = document.createElement("h3");
    title.textContent = product.title;

    // Create description element
    var description = document.createElement("p");
    description.textContent = product.description;

    // Create price element
    var price = document.createElement("p");
    price.textContent = product.price;

    // Create add to card element
    var addToCard = document.createElement("button");
    addToCard.classList.add("addToCart");
    addToCard.setAttribute("id", "card");
    addToCard.textContent = "Add To Cart";

    // Append image, title, description, and price to list item
    listItem.appendChild(productImg);
    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(price);
    listItem.appendChild(addToCard);

    // Append list item to the product list
    productList.appendChild(listItem);
  });

  return productList;
}

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

// Function to handle "Add to Cart" button click
// Define a cart array to store added products
var cart = [];

// Function to handle "Add to Cart" button click
function addToCart(event) {
  // Reset the display of the popup
  var popup = document.getElementById("popup");
  popup.style.display = "none";
  var overlay = document.getElementById("overlay");
  // Get product details
  var product = event.target.parentNode;
  var productImage = product.querySelector("img").src; // Get the image URL
  var productName = product.querySelector("h3").textContent;
  var productDescription =
    product.querySelector("p:nth-of-type(1)").textContent;
  var productPrice = product.querySelector("p:nth-of-type(2)").textContent;

  // Create product object
  var productObject = {
    image: productImage,
    name: productName,
    description: productDescription,
    price: productPrice,
  };
  // Retrieve cart from localStorage or create an empty array if not exists
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  var existingProduct = cart.find(function (item) {
    return item.name === productName;
  });

  // If the product already exists, display a message in the popup
  if (existingProduct) {
    var popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = "This product is already in your cart!";
    popup.style.display = "block";
    overlay.style.display = "block";
    return;
  }

  // Add product to cart array
  cart.push(productObject);

  // Store updated cart array in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Display confirmation message in the popup
  var popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = "Product added to cart!";
  popup.style.display = "block";
  overlay.style.display = "block";
}

// Close the popup when the close button is clicked
document.getElementById("close-btn").addEventListener("click", function () {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
  overlay.style.display = "none";
});

// Close the popup when the close button is clicked
document.getElementById("close-btn").addEventListener("click", function () {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
});

// Get all "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll(".addToCart");

// Add event listener to each "Add to Cart" button
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", addToCart);
});

//display product in cart page

function displayCart(cart) {
  var cartItemsContainer = document.getElementById("cart-items-container");
  var totalPriceElement = document.getElementById("totalPrice");

  // Clear previous content
  cartItemsContainer.innerHTML = "";

  // Check if cart is empty
  if (!cart || cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceElement.textContent = "total: 0.00 $";
    return;
  }

  // Create HTML for each product in the cart
  var cartItemsHTML = "";
  cart.forEach(function (product) {
    cartItemsHTML += `
      <div class="cart-item">
      <img src=${product.image} alt="image">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.price}</p>
      </div>
    `;
  });

  // Append HTML to the container
  cartItemsContainer.innerHTML = cartItemsHTML;
  updateTotalPrice();
}

// Function to clear localStorage when the user leaves the website
// window.addEventListener("beforeunload", function (event) {
//   localStorage.clear();
// });

function calculateTotalPrice() {
  // Retrieve cart from localStorage
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Initialize total price
  var totalPrice = 0;

  // Iterate over each item in the cart and sum up the prices
  cart.forEach(function (item) {
    // Extract numeric part of the price using regular expression
    var priceMatch = item.price.match(/\d+\.\d+/); // Match digits followed by a dot and more digits
    if (priceMatch) {
      var price = parseFloat(priceMatch[0]); // Extract the matched numeric part and convert to number

      // Add price to total price
      totalPrice += price;
    }
  });
  // Return total price
  return totalPrice.toFixed(2); // Convert to 2 decimal places
}

// Function to calculate total price and update total amount in HTML
function updateTotalPrice() {
  // Calculate total price
  var totalPrice = calculateTotalPrice();
  // Update total amount in HTML
  var totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = "total: " + totalPrice + "$";
}
