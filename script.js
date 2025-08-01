// ======= Configuration =======
const ITEMS = [
  // Electronics
  { name: 'Laptop', category: 'Electronics' },
  { name: 'Smartphone', category: 'Mobile' },
  { name: 'Tablet', category: 'Electronics' },
  { name: 'Smartwatch', category: 'Mobile' },
  { name: 'TV', category: 'Electronics' },
  { name: 'Headphones', category: 'Electronics' },
  { name: 'Desktop Computer', category: 'Electronics' },
  { name: 'Gaming Console', category: 'Electronics' },
  { name: 'Bluetooth Speaker', category: 'Electronics' },
  { name: 'Camera', category: 'Electronics' },

  // Automotive
  { name: 'Car', category: 'Automotive' },
  { name: 'SUV', category: 'Automotive' },
  { name: 'Pickup Truck', category: 'Automotive' },
  { name: 'Electric Vehicle', category: 'Automotive' },
  { name: 'Motorcycle', category: 'Automotive' },
  { name: 'Hybrid Car', category: 'Automotive' },
  { name: 'Minivan', category: 'Automotive' },

  // Real Estate
  { name: 'Rent Apartment A', category: 'Real Estate' },
  { name: 'Rent Apartment B', category: 'Real Estate' },
  { name: '1 Bedroom Apartment', category: 'Real Estate' },
  { name: '2 Bedroom Apartment', category: 'Real Estate' },
  { name: 'Single Family Home', category: 'Real Estate' },
  { name: 'Studio Apartment', category: 'Real Estate' },
  { name: 'Condo', category: 'Real Estate' },

  // Produce & Groceries
  { name: 'Produce Apples', category: 'Produce' },
  { name: 'Produce Bananas', category: 'Produce' },
  { name: 'Produce Oranges', category: 'Produce' },
  { name: 'Produce Tomatoes', category: 'Produce' },
  { name: 'Produce Potatoes', category: 'Produce' },
  { name: 'Produce Lettuce', category: 'Produce' },
  { name: 'Produce Grapes', category: 'Produce' },
  { name: 'Produce Carrots', category: 'Produce' },
  { name: 'Chicken Breast', category: 'Produce' },
  { name: 'Ground Beef', category: 'Produce' },
  { name: 'Milk (Gallon)', category: 'Produce' },
  { name: 'Eggs (Dozen)', category: 'Produce' },
  { name: 'Bread (Loaf)', category: 'Produce' },
  { name: 'Butter (lb)', category: 'Produce' },
  { name: 'Rice (5lb)', category: 'Produce' },
  { name: 'Pasta (1lb)', category: 'Produce' },
  { name: 'Coffee (lb)', category: 'Produce' },
  { name: 'Cheese (lb)', category: 'Produce' },
  { name: 'Yogurt (32oz)', category: 'Produce' },
  { name: 'Orange Juice (gallon)', category: 'Produce' }
];

const TIMEFRAMES = {
  '2y': 730,
  '1y': 365,
  '6m': 183,
  '1m': 30,
  '1w': 7
};

// ======= Simulated Data Generator =======
function generateSimulatedData(item, days) {
  let base;
  switch (item.name) {
    // Electronics
    case 'Tablet': base = 350 + Math.random() * 200; break;
    case 'Smartwatch': base = 180 + Math.random() * 120; break;
    case 'TV': base = 350 + Math.random() * 500; break;
    case 'Headphones': base = 70 + Math.random() * 200; break;
    case 'Desktop Computer': base = 800 + Math.random() * 700; break;
    case 'Gaming Console': base = 400 + Math.random() * 200; break;
    case 'Bluetooth Speaker': base = 90 + Math.random() * 80; break;
    case 'Camera': base = 500 + Math.random() * 400; break;

    // Automotive
    case 'SUV': base = 32000 + Math.random() * 20000; break;
    case 'Pickup Truck': base = 35000 + Math.random() * 25000; break;
    case 'Electric Vehicle': base = 40000 + Math.random() * 20000; break;
    case 'Motorcycle': base = 9000 + Math.random() * 8000; break;
    case 'Hybrid Car': base = 28000 + Math.random() * 12000; break;
    case 'Minivan': base = 27000 + Math.random() * 12000; break;

    // Real Estate
    case '1 Bedroom Apartment': base = 1400 + Math.random() * 800; break;
    case '2 Bedroom Apartment': base = 1800 + Math.random() * 1000; break;
    case 'Single Family Home': base = 2500 + Math.random() * 1500; break;
    case 'Studio Apartment': base = 1200 + Math.random() * 600; break;
    case 'Condo': base = 1600 + Math.random() * 900; break;

    // Produce & Groceries
    case 'Produce Oranges': base = 2.5 + Math.random() * 1.5; break;
    case 'Produce Tomatoes': base = 2.2 + Math.random() * 1.1; break;
    case 'Produce Potatoes': base = 1.5 + Math.random() * 0.8; break;
    case 'Produce Lettuce': base = 1.3 + Math.random() * 0.8; break;
    case 'Produce Grapes': base = 3.0 + Math.random() * 1.5; break;
    case 'Produce Carrots': base = 1.2 + Math.random() * 0.7; break;
    case 'Chicken Breast': base = 4 + Math.random() * 1.7; break;
    case 'Ground Beef': base = 5 + Math.random() * 2.5; break;
    case 'Milk (Gallon)': base = 3.5 + Math.random() * 1; break;
    case 'Eggs (Dozen)': base = 2.5 + Math.random() * 1.5; break;
    case 'Bread (Loaf)': base = 2.2 + Math.random() * 1; break;
    case 'Butter (lb)': base = 3.8 + Math.random() * 2.2; break;
    case 'Rice (5lb)': base = 4.5 + Math.random() * 2; break;
    case 'Pasta (1lb)': base = 1.3 + Math.random() * 1; break;
    case 'Coffee (lb)': base = 8 + Math.random() * 4; break;
    case 'Cheese (lb)': base = 5.5 + Math.random() * 2.5; break;
    case 'Yogurt (32oz)': base = 3.5 + Math.random() * 1.5; break;
    case 'Orange Juice (gallon)': base = 5 + Math.random() * 2; break;

    default:
      switch (item.category) {
        case 'Electronics': base = 1000 + Math.random() * 800; break;
        case 'Mobile': base = 600 + Math.random() * 400; break;
        case 'Automotive': base = 20000 + Math.random() * 15000; break;
        case 'Real Estate': base = 1200 + Math.random() * 1500; break;
        case 'Produce': base = 2 + Math.random() * 5; break;
        default: base = 5 + Math.random() * 10;
      }
  }
  // Simulate up/down trend
  const data = [];
  let price = base;
  for (let i = days - 1; i >= 0; i--) {
    let dt = new Date();
    dt.setDate(dt.getDate() - i);
    // Simulate price with noise and trend
    let drift = 1 + 0.004 * Math.sin(i / 60) + 0.001 * (Math.random() - 0.5);
    price = price * drift + (Math.random() - 0.5) * (base * 0.01);
    price = Math.max(price, 0.5);
    data.push({ date: dt.toISOString().split('T')[0], price: parseFloat(price.toFixed(2)) });
  }
  return data;
}

// ======= UI Population =======
function populateItemSelect(category = "") {
  const select = document.getElementById('item-select');
  select.innerHTML = '<option value="">All</option>';
  ITEMS.filter(item => !category || item.category === category)
    .forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.name;
      opt.textContent = item.name;
      select.appendChild(opt);
    });
}

function getSelectedItem() {
  const itemName = document.getElementById('item-select').value;
  if (!itemName) return null;
  return ITEMS.find(item => item.name === itemName);
}

function getSelectedCategory() {
  return document.getElementById('category-select').value;
}

function getSelectedTimeframe() {
  return document.getElementById('timeframe-select').value;
}

// ======= Main Data Loading and UI Update =======
let chart; // Chart.js instance

function loadAndRender() {
  const itemName = document.getElementById('item-select').value;
  const category = document.getElementById('category-select').value;
  const timeframe = document.getElementById('timeframe-select').value;
  const days = TIMEFRAMES[timeframe];

  // Filter items
  let filteredItems = ITEMS.filter(item =>
    (!itemName || item.name === itemName) &&
    (!category || item.category === category)
  );

  // If "All" is selected, default to first matching item for chart/table
  let mainItem = filteredItems.length > 0
    ? filteredItems[0]
    : ITEMS[0];

  let priceData = generateSimulatedData(mainItem, days);

  // Filter to selected timeframe
  const now = new Date();
  priceData = priceData.filter(d => {
    const dDate = new Date(d.date);
    return dDate >= new Date(now - days * 24 * 60 * 60 * 1000);
  });

  updateTable(priceData);
  updateChart(priceData, mainItem.name);
  updateStats(priceData);

  // Repopulate item select for chosen category
  populateItemSelect(category);
  // Maintain previous selection
  document.getElementById('item-select').value = itemName;
}

// ======= Table & Chart Update =======
function updateTable(data) {
  const tbody = document.querySelector('#data-table tbody');
  tbody.innerHTML = '';
  data.slice().reverse().forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.date}</td><td>$${row.price.toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}

function updateChart(data, label) {
  const ctx = document.getElementById('priceChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label: label + ' Price',
        data: data.map(d => d.price),
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.15)',
        tension: 0.18,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { display: true },
        y: { beginAtZero: false }
      }
    }
  });
}

function updateStats(data) {
  if (data.length < 2) {
    document.getElementById('price-stats').textContent = 'Not enough data';
    return;
  }
  const start = data[0].price;
  const end = data[data.length - 1].price;
  const change = end - start;
  const changePct = ((change) / start) * 100;
  const direction = change > 0 ? "Increase" : "Decrease";
  document.getElementById('price-stats').innerHTML =
    `<b>${direction}</b> over period: <span style="color:${change > 0 ? '#d0342c':'#349e2c'}">${change > 0 ? '+' : ''}${change.toFixed(2)} (${changePct.toFixed(2)}%)</span>`;
}

// ======= Event Listeners & Init =======
document.getElementById('category-select').addEventListener('change', () => {
  populateItemSelect(getSelectedCategory());
  loadAndRender();
});
document.getElementById('item-select').addEventListener('change', loadAndRender);
document.getElementById('timeframe-select').addEventListener('change', loadAndRender);

window.addEventListener('DOMContentLoaded', () => {
  populateItemSelect();
  loadAndRender();
});