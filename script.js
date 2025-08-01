const PRODUCTS = [
  { name: "US Gasoline (avg)", category: "Automotive" },
  { name: "Car", category: "Automotive" },
  { name: "SUV", category: "Automotive" },
  { name: "Pickup Truck", category: "Automotive" },
  { name: "Electric Vehicle", category: "Automotive" },
  { name: "Motorcycle", category: "Automotive" },
  { name: "Hybrid Car", category: "Automotive" },
  { name: "Minivan", category: "Automotive" },

  { name: 'Laptop', category: 'Electronics' },
  { name: 'Smartphone', category: 'Electronics' },
  { name: 'Tablet', category: 'Electronics' },
  { name: 'Smartwatch', category: 'Electronics' },
  { name: 'TV', category: 'Electronics' },
  { name: 'Headphones', category: 'Electronics' },
  { name: 'Desktop Computer', category: 'Electronics' },
  { name: 'Gaming Console', category: 'Electronics' },
  { name: 'Bluetooth Speaker', category: 'Electronics' },
  { name: 'Camera', category: 'Electronics' },

  { name: 'Rent Apartment A', category: 'Real Estate' },
  { name: 'Rent Apartment B', category: 'Real Estate' },
  { name: '1 Bedroom Apartment', category: 'Real Estate' },
  { name: '2 Bedroom Apartment', category: 'Real Estate' },
  { name: 'Single Family Home', category: 'Real Estate' },
  { name: 'Studio Apartment', category: 'Real Estate' },
  { name: 'Condo', category: 'Real Estate' },

  { name: 'Produce Apples', category: 'Groceries' },
  { name: 'Produce Bananas', category: 'Groceries' },
  { name: 'Produce Oranges', category: 'Groceries' },
  { name: 'Produce Tomatoes', category: 'Groceries' },
  { name: 'Produce Potatoes', category: 'Groceries' },
  { name: 'Produce Lettuce', category: 'Groceries' },
  { name: 'Produce Grapes', category: 'Groceries' },
  { name: 'Produce Carrots', category: 'Groceries' },
  { name: 'Chicken Breast', category: 'Groceries' },
  { name: 'Ground Beef', category: 'Groceries' },
  { name: 'Milk (Gallon)', category: 'Groceries' },
  { name: 'Eggs (Dozen)', category: 'Groceries' },
  { name: 'Bread (Loaf)', category: 'Groceries' },
  { name: 'Butter (lb)', category: 'Groceries' },
  { name: 'Rice (5lb)', category: 'Groceries' },
  { name: 'Pasta (1lb)', category: 'Groceries' },
  { name: 'Coffee (lb)', category: 'Groceries' },
  { name: 'Cheese (lb)', category: 'Groceries' },
  { name: 'Yogurt (32oz)', category: 'Groceries' },
  { name: 'Orange Juice (gallon)', category: 'Groceries' }
];

const TIMEFRAMES = {
  '1w': 7,
  '1m': 30,
  '6m': 183,
  '1y': 365,
  '2y': 730,
  '5y': 1825,
  '10y': 3650
};
const TIMEFRAME_LABELS = {
  '1w': '1 Week',
  '1m': '1 Month',
  '6m': '6 Months',
  '1y': '1 Year',
  '2y': '2 Years',
  '5y': '5 Years',
  '10y': '10 Years'
};
const SIMULATED_DATA_CACHE = {};

// --- Seeded Random ---
function seededRandom(seed) {
  let t = seed += 0x6D2B79F5;
  return function() {
    t = Math.imul(t ^ t >>> 15, 1 | t);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function getProductSeed(productName) {
  let hash = 0, str = productName.toLowerCase();
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash) + str.charCodeAt(i);
  return hash;
}

// --- Improved Realistic Simulation (no plateaus, no wild spikes) ---
function generateSimulatedHistory(name, totalDays) {
  let base, min, max, round, pattern;
  if (/gasoline/i.test(name)) {
    base = 3.25; min = 1.8; max = 5.0; round = 2; pattern = 'gasoline';
  }
  else if (/laptop/i.test(name))     { base = 1200; min = 500; max = 2200; round = 0; pattern = 'tech'; }
  else if (/smartphone/i.test(name)) { base = 900; min = 300; max = 1500; round = 0; pattern = 'mobile'; }
  else if (/tablet/i.test(name))     { base = 400; min = 120; max = 800; round = 0; pattern = 'mobile'; }
  else if (/tv/i.test(name))         { base = 800; min = 250; max = 1800; round = 0; pattern = 'tech'; }
  else if (/smartwatch/i.test(name)) { base = 300; min = 100; max = 650; round = 0; pattern = 'mobile'; }
  else if (/headphones/i.test(name)) { base = 180; min = 60; max = 400; round = 0; pattern = 'mobile'; }
  else if (/desktop computer/i.test(name)) { base = 1600; min = 700; max = 2700; round = 0; pattern = 'tech'; }
  else if (/gaming console/i.test(name))   { base = 500; min = 250; max = 800; round = 0; pattern = 'tech'; }
  else if (/bluetooth speaker/i.test(name)){ base = 120; min = 40; max = 240; round = 0; pattern = 'mobile'; }
  else if (/camera/i.test(name))           { base = 950; min = 350; max = 1900; round = 0; pattern = 'tech'; }
  else if (/car|suv|pickup|minivan|motorcycle|vehicle/i.test(name)) { base = 32000; min = 17000; max = 70000; round = 0; pattern = 'vehicle'; }
  else if (/apartment|home|condo|rent|studio/i.test(name)) { base = 1900; min = 900; max = 4200; round = 0; pattern = 'realestate'; }
  else if (/apples|bananas|oranges|tomatoes|potatoes|lettuce|grapes|carrots/i.test(name)) { base = 2.5; min = 0.8; max = 6.5; round = 2; pattern = 'produce'; }
  else if (/chicken breast/i.test(name)) { base = 5.8; min = 2.9; max = 11; round = 2; pattern = 'grocery'; }
  else if (/ground beef/i.test(name))    { base = 6.5; min = 3.5; max = 12; round = 2; pattern = 'grocery'; }
  else if (/milk/i.test(name))           { base = 3.8; min = 2.2; max = 7; round = 2; pattern = 'grocery'; }
  else if (/eggs/i.test(name))           { base = 2.9; min = 1.8; max = 7; round = 2; pattern = 'grocery'; }
  else if (/bread/i.test(name))          { base = 2.7; min = 1.2; max = 4.5; round = 2; pattern = 'grocery'; }
  else if (/butter/i.test(name))         { base = 5.2; min = 2.8; max = 9; round = 2; pattern = 'grocery'; }
  else if (/rice/i.test(name))           { base = 6.0; min = 3.0; max = 14; round = 2; pattern = 'grocery'; }
  else if (/pasta/i.test(name))          { base = 1.8; min = 1.0; max = 3.5; round = 2; pattern = 'grocery'; }
  else if (/coffee/i.test(name))         { base = 11.2; min = 6.0; max = 18; round = 2; pattern = 'grocery'; }
  else if (/cheese/i.test(name))         { base = 7.6; min = 3.5; max = 18; round = 2; pattern = 'grocery'; }
  else if (/yogurt/i.test(name))         { base = 4.8; min = 2.2; max = 9; round = 2; pattern = 'grocery'; }
  else if (/orange juice/i.test(name))   { base = 7.0; min = 3.0; max = 15; round = 2; pattern = 'grocery'; }
  else { base = 10; min = 0; max = 10000; round = 2; pattern = 'default'; }

  const seed = getProductSeed(name);
  const rand = seededRandom(seed);

  let arr = [];
  let now = new Date();
  let price = base;

  // Smooth random walk parameters
  let volatility = {
    gasoline: 0.005,
    tech: 0.007,
    mobile: 0.008,
    vehicle: 0.003,
    realestate: 0.0025,
    produce: 0.012,
    grocery: 0.004,
    default: 0.006
  }[pattern] || 0.006;

  // Seasonal amplitude
  let seasonalAmplitude = {
    gasoline: 0.03,
    tech: 0.01,
    mobile: 0.01,
    vehicle: 0.01,
    realestate: 0.012,
    produce: 0.07,
    grocery: 0.02,
    default: 0.01
  }[pattern] || 0.01;

  // Trend per year (inflation/deflation)
  let yearlyTrend = {
    gasoline: 0.03,
    tech: -0.04,
    mobile: -0.07,
    vehicle: 0.015,
    realestate: 0.03,
    produce: 0.018,
    grocery: 0.012,
    default: 0.01
  }[pattern] || 0.01;

  // Loop for each day
  for (let i = totalDays - 1; i >= 0; i--) {
    let dt = new Date(now);
    dt.setDate(dt.getDate() - i);

    let yearFrac = i / 365;
    let month = dt.getMonth();

    // Seasonal effect
    let seasonal = 1;
    if (pattern === 'gasoline') {
      seasonal += seasonalAmplitude * Math.sin(2 * Math.PI * (month + dt.getDate()/30) / 12);
    } else if (pattern === 'produce') {
      seasonal += seasonalAmplitude * Math.cos(2 * Math.PI * (month + dt.getDate()/30) / 12);
    } else if (pattern === 'grocery') {
      seasonal += seasonalAmplitude * Math.sin(2 * Math.PI * (month + dt.getDate()/30) / 12);
    } else if (pattern === 'realestate') {
      seasonal += seasonalAmplitude * Math.sin(2 * Math.PI * yearFrac / 7);
    }

    // Inflation/deflation trend
    let trend = 1 + yearlyTrend * yearFrac / totalDays * 3650;

    // Smooth random walk, no spikes
    let step = (rand()-0.5) * volatility * price;
    price += step;
    // Keep price moving gently around base
    price = base * trend * seasonal + (price - base) * 0.95;

    price = Math.max(price, min);
    price = Math.min(price, max);

    arr.push({ date: dt.toISOString().split('T')[0], price: parseFloat(price.toFixed(round)) });
  }
  return arr;
}

function consistentSimulatedHistory(name, days) {
  const totalDays = TIMEFRAMES['10y'];
  if (!SIMULATED_DATA_CACHE[name]) {
    SIMULATED_DATA_CACHE[name] = generateSimulatedHistory(name, totalDays);
  }
  return SIMULATED_DATA_CACHE[name].slice(-days);
}

// ==== CATEGORY POPULATION AND FILTERING ====
const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

function populateCategorySelect() {
  const categorySelect = document.getElementById('category-select');
  categorySelect.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

function populateProductSelect(selectedCategory) {
  const select = document.getElementById('item-select');
  select.innerHTML = '';
  PRODUCTS.filter(p => p.category === selectedCategory).forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.name;
    opt.textContent = item.name;
    select.appendChild(opt);
  });
}

// ==== UI POPULATION ====
function createTimeframeTabs() {
  const container = document.getElementById('timeframe-tabs');
  container.innerHTML = '';
  Object.keys(TIMEFRAME_LABELS).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.timeframe = key;
    btn.innerText = TIMEFRAME_LABELS[key];
    container.appendChild(btn);
  });
  setActiveTab('1y');
}

function setActiveTab(activeKey) {
  document.querySelectorAll('#timeframe-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.timeframe === activeKey);
  });
}

// ==== MAIN DATA LOADING ====
let chart; // Chart.js instance

async function loadAndRender() {
  const category = document.getElementById('category-select').value;
  const productName = document.getElementById('item-select').value;
  const timeframe = document.querySelector('#timeframe-tabs .tab-btn.active').dataset.timeframe;
  const days = TIMEFRAMES[timeframe];

  const product = PRODUCTS.find(p => p.name === productName && p.category === category) || PRODUCTS.find(p => p.category === category);

  if (!product) return;

  const priceData = consistentSimulatedHistory(product.name, days);

  updateTable(priceData);
  updateChart(priceData, product.name);
  updateStats(priceData);
}

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
        backgroundColor: 'rgba(54, 162, 235, 0.12)',
        tension: 0.28,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }},
      scales: { x: { display: true }, y: { beginAtZero: false } }
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
    `<b>${direction}</b> over period: <span style="color:${change > 0 ? '#d0342c':'#349e2c'}">${change > 0 ? '+' : ''}${change.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} (${changePct.toFixed(2)}%)</span>`;
}

// ==== EVENT LISTENERS & INIT ====
window.addEventListener('DOMContentLoaded', () => {
  populateCategorySelect();
  populateProductSelect(CATEGORIES[0]);
  createTimeframeTabs();

  document.getElementById('category-select').addEventListener('change', e => {
    populateProductSelect(e.target.value);
    loadAndRender();
  });

  document.getElementById('item-select').addEventListener('change', loadAndRender);

  document.getElementById('timeframe-tabs').addEventListener('click', e => {
    if (e.target && e.target.classList.contains('tab-btn')) {
      setActiveTab(e.target.dataset.timeframe);
      loadAndRender();
    }
  });

  loadAndRender();
});