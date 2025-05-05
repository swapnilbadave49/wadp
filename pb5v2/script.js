const targetMarketCheckboxes = document.querySelectorAll('.target-market');
const printAreaCheckboxes = document.querySelectorAll('.print-area');
const sortBySelect = document.getElementById('sortBy');
const productContainer = document.getElementById('productContainer');
let allCards = Array.from(productContainer.getElementsByClassName('col'));

function applyFiltersAndSort() {
  let filteredCards = [...allCards];

  // Filter by Target Market
  const selectedTargetMarkets = Array.from(targetMarketCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  if (selectedTargetMarkets.length > 0) {
    filteredCards = filteredCards.filter(card =>
      selectedTargetMarkets.includes(card.dataset.targetMarket)
    );
  }

  // Filter by Print Area
  const selectedPrintAreas = Array.from(printAreaCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  if (selectedPrintAreas.length > 0) {
    filteredCards = filteredCards.filter(card =>
      selectedPrintAreas.includes(card.dataset.printArea)
    );
  }

  // Apply sorting
  const sortBy = sortBySelect.value;
  switch (sortBy) {
    case 'priceLowToHigh':
      filteredCards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      break;
    case 'priceHighToLow':
      filteredCards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
      break;
    case 'popularity':
      filteredCards.sort(() => Math.random() - 0.5);
      break;
    case 'default':
      filteredCards = [...allCards].filter(card => filteredCards.includes(card));
      break;
  }

  // Clear and re-append filtered and sorted cards
  productContainer.innerHTML = '';
  filteredCards.forEach(card => productContainer.appendChild(card));
}

// Event listeners for all checkboxes and sort dropdown
targetMarketCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', applyFiltersAndSort);
});
printAreaCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', applyFiltersAndSort);
});
sortBySelect.addEventListener('change', applyFiltersAndSort);

// Initial render
applyFiltersAndSort();