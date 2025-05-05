const targetMarketSelect = document.getElementById('targetMarket');
const printAreaSelect = document.getElementById('printArea');
const sortBySelect = document.getElementById('sortBy');
const productContainer = document.getElementById('productContainer');
let allCards = Array.from(productContainer.getElementsByClassName('col'));

function applyFiltersAndSort() {
  let filteredCards = [...allCards];

  // Filter by Target Market
  const targetMarket = targetMarketSelect.value;
  if (targetMarket !== 'all') {
    filteredCards = filteredCards.filter(card => card.dataset.targetMarket === targetMarket);
  }

  // Filter by Print Area
  const printArea = printAreaSelect.value;
  if (printArea !== 'all') {
    filteredCards = filteredCards.filter(card => card.dataset.printArea === printArea);
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

// Event listeners for all dropdowns
targetMarketSelect.addEventListener('change', applyFiltersAndSort);
printAreaSelect.addEventListener('change', applyFiltersAndSort);
sortBySelect.addEventListener('change', applyFiltersAndSort);

// Initial render
applyFiltersAndSort();