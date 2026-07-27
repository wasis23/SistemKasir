const fmt = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');

const PRODUCTS = [
  {id:1, name:'Kopi Susu Aren',   cat:'Minuman', price:28000, stock:50, img:'assets/img/kopi_susu.png'},
  {id:2, name:'Americano',        cat:'Minuman', price:24000, stock:40, img:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop'},
  {id:3, name:'Latte',            cat:'Minuman', price:30000, stock:35, img:'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop'},
  {id:4, name:'Teh Tarik',        cat:'Minuman', price:22000, stock:45, img:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop'},
  {id:5, name:'Matcha Latte',     cat:'Minuman', price:32000, stock:30, img:'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop'},
  {id:6, name:'Es Coklat',        cat:'Minuman', price:25000, stock:40, img:'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&auto=format&fit=crop'},
  {id:7, name:'Classic Beef Burger',cat:'Makanan',price:65000, stock:20, img:'assets/img/burger.png'},
  {id:8, name:'Chicken Sandwich', cat:'Makanan', price:58000, stock:18, img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&auto=format&fit=crop'},
  {id:9, name:'Nasi Goreng',      cat:'Makanan', price:45000, stock:25, img:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop'},
  {id:10,name:'Mie Goreng',       cat:'Makanan', price:40000, stock:20, img:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&auto=format&fit=crop'},
  {id:11,name:'French Fries',     cat:'Snack',   price:25000, stock:60, img:'assets/img/french_fries.png'},
  {id:12,name:'Croissant',        cat:'Snack',   price:32000, stock:15, img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop'},
  {id:13,name:'Brownies',         cat:'Snack',   price:28000, stock:20, img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop'},
  {id:14,name:'Roti Bakar',       cat:'Snack',   price:22000, stock:25, img:'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=400&auto=format&fit=crop'},
];

const TRANSACTIONS = [
  {num:'TRX-001', time:'08:32', total:87000,  method:'Tunai'},
  {num:'TRX-002', time:'09:15', total:53000,  method:'QRIS'},
  {num:'TRX-003', time:'10:08', total:156000, method:'Tunai'},
  {num:'TRX-004', time:'11:24', total:65000,  method:'Transfer'},
  {num:'TRX-005', time:'12:45', total:120000, method:'QRIS'},
  {num:'TRX-006', time:'13:30', total:78000,  method:'Tunai'},
  {num:'TRX-007', time:'14:12', total:95000,  method:'QRIS'},
];

let state = {
  view: 'pos',
  cat: 'Semua',
  search: '',
  cart: [],
  payMethod: 'cash',
  cashInput: 0,
};

/* ---- RENDER ---- */
function render() {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === state.view);
  });
  document.querySelectorAll('.view-page').forEach(v => v.style.display = 'none');
  const cur = document.getElementById('view-' + state.view);
  if (cur) cur.style.display = state.view === 'pos' ? 'grid' : 'flex';
  if (state.view === 'pos')       renderPOS();
  if (state.view === 'dashboard') renderDashboard();
  if (state.view === 'inventory') renderInventory();
  if (state.view === 'laporan')   renderReport();
  updateClock();
}

/* ---- POS ---- */
function renderPOS() {
  const cats = ['Semua', 'Minuman', 'Makanan', 'Snack'];
  document.getElementById('cat-btns').innerHTML = cats.map(c =>
    `<button class="cat-btn${state.cat===c?' active':''}" onclick="setCat('${c}')">${c}</button>`
  ).join('');

  const filtered = PRODUCTS.filter(p =>
    (state.cat === 'Semua' || p.cat === state.cat) &&
    p.name.toLowerCase().includes(state.search.toLowerCase())
  );

  document.getElementById('products-grid').innerHTML = filtered.length ? filtered.map(p => `
    <div class="product-card${p.stock===0?' out-of-stock':''}" onclick="addToCart(${p.id})">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.stock===0 ? '<div class="stock-out-badge">HABIS</div>' : ''}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${fmt(p.price)}</div>
        <div class="product-stock" style="${p.stock<10?'color:#ef4444;font-weight:700':''}">
          ${p.stock > 0 ? 'Stok: ' + p.stock : '✗ Stok Habis'}
        </div>
      </div>
      <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id})" ${p.stock===0?'disabled':''}>+</button>
    </div>
  `).join('') : '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:2rem">Tidak ada produk ditemukan</div>';

  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const empty = document.getElementById('cart-empty');
  const list  = document.getElementById('cart-items-list');

  if (!state.cart.length) {
    empty.style.display = 'flex';
    list.style.display  = 'none';
  } else {
    empty.style.display = 'none';
    list.style.display  = 'block';
    list.innerHTML = state.cart.map((item, i) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${fmt(item.price)} × ${item.qty} = ${fmt(item.price*item.qty)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${i},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${i})">🗑</button>
      </div>
    `).join('');
  }

  const sub   = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax   = sub * 0.1;
  const total = sub + tax;
  document.getElementById('subtotal').textContent  = fmt(sub);
  document.getElementById('tax').textContent       = fmt(tax);
  document.getElementById('total').textContent     = fmt(total);
  document.getElementById('pay-btn').disabled      = !state.cart.length;
  const payText = state.cart.length ? `BAYAR (${fmt(total)})` : 'BAYAR';
  document.getElementById('pay-btn').textContent   = payText;
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || p.stock <= 0) return;
  p.stock--;
  const ex = state.cart.find(x => x.id === id);
  if (ex) ex.qty++;
  else state.cart.push({id: p.id, name: p.name, price: p.price, img: p.img, qty: 1});
  renderPOS();
}

function changeQty(i, d) {
  const item = state.cart[i];
  if (!item) return;
  const p = PRODUCTS.find(x => x.id === item.id);
  if (d > 0) {
    if (!p || p.stock <= 0) return;
    p.stock--;
    item.qty++;
  } else if (d < 0) {
    if (p) p.stock++;
    item.qty--;
    if (item.qty <= 0) state.cart.splice(i, 1);
  }
  renderPOS();
}

function removeItem(i) {
  const item = state.cart[i];
  if (!item) return;
  const p = PRODUCTS.find(x => x.id === item.id);
  if (p) p.stock += item.qty;
  state.cart.splice(i, 1);
  renderPOS();
}
function setCat(c) { state.cat = c; renderPOS(); }

/* ---- PAYMENT MODAL ---- */
function openPayModal() {
  const sub   = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.round(sub * 1.1);
  document.getElementById('modal-total-amount').textContent = fmt(total);
  document.getElementById('pay-modal').classList.add('open');
  state.cashInput = 0;
  const ci = document.getElementById('cash-input');
  if (ci) ci.value = '';
  updateChange();
  setPayTab('cash');
}
function closePayModal() { document.getElementById('pay-modal').classList.remove('open'); }

function setPayTab(t) {
  state.payMethod = t;
  document.querySelectorAll('.pay-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
  document.getElementById('cash-section').style.display    = t==='cash'     ? 'block' : 'none';
  document.getElementById('qris-section').style.display    = t==='qris'     ? 'block' : 'none';
  document.getElementById('transfer-section').style.display= t==='transfer' ? 'block' : 'none';
}

function setQuickCash(val) {
  state.cashInput = val;
  const ci = document.getElementById('cash-input');
  if (ci) ci.value = val.toLocaleString('id-ID');
  updateChange();
}

function updateChange() {
  const sub    = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total  = Math.round(sub * 1.1);
  const change = Math.max(0, state.cashInput - total);
  const el     = document.getElementById('change-val');
  if (el) el.textContent = fmt(change);
}

function confirmPayment() {
  const sub   = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.round(sub * 1.1);
  if (state.payMethod === 'cash' && state.cashInput < total) {
    alert('Uang yang diterima kurang!'); return;
  }
  closePayModal();
  document.getElementById('success-overlay').classList.add('show');
  state.cart = [];
  setTimeout(() => {
    document.getElementById('success-overlay').classList.remove('show');
    renderPOS();
  }, 2300);
}

/* ---- DASHBOARD ---- */
function renderDashboard() {
  // 1. Revenue Breakdown Bar Chart
  const barHeights = [55, 48, 52, 45, 56, 84, 60, 75, 48, 66, 75, 95, 78, 58, 65, 48, 55, 68, 62, 58, 68, 80, 66, 42];
  const barChartEl = document.getElementById('exec-bar-chart');
  if (barChartEl) {
    barChartEl.innerHTML = barHeights.map((h, i) => {
      const isActive = i === 11; // Oct 1 highlight
      return `
        <div class="bar-exec-col">
          ${isActive ? '<div class="bar-tooltip-pop">Oct 1 · 568,950</div>' : ''}
          <div class="bar-exec-fill${isActive?' active':''}" style="height:${h}%; --delay:${i}" title="Oct ${i+1}: ${h*12}k"></div>
        </div>
      `;
    }).join('');
  }

  // 2. Heatmap Peak Hours
  const heatmapEl = document.getElementById('heatmap-matrix');
  if (heatmapEl) {
    const colors = ['#1e1b4b', '#312e81', '#3730a3', '#4338ca', '#6366f1', '#818cf8', '#a855f7', '#c084fc', '#d946ef'];
    let html = '';
    for (let r = 0; r < 7; r++) {
      html += '<div class="heatmap-row">';
      for (let c = 0; c < 9; c++) {
        // Generate pseudo peak hour heat distribution (higher intensity mid day / weekends)
        const intensityIndex = Math.min(8, Math.floor(((r % 2 + 1) * (c + 1) * 1.3) % 9));
        const bg = colors[intensityIndex];
        const cellDelay = r * 9 + c;
        html += `<div class="heatmap-cell" style="background:${bg}; --delay:${cellDelay}" title="Day ${r+1}, Hour ${c*2.5}:00"></div>`;
      }
      html += '</div>';
    }
    heatmapEl.innerHTML = html;
  }

  // 3. Best Sellers Ranking Table
  const bestSellers = [
    { rank: 1, name: 'Es Kopi Susu', cat: 'Minuman', qty: 58, sales: 1624000, img: 'assets/img/kopi_susu.png' },
    { rank: 2, name: 'Nasi Goreng Spesial', cat: 'Makanan', qty: 35, sales: 1575000, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop' },
    { rank: 3, name: 'Roti Bakar', cat: 'Snack', qty: 30, sales: 660000, img: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=400&auto=format&fit=crop' },
    { rank: 4, name: 'Ayam Geprek', cat: 'Makanan', qty: 20, sales: 500000, img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&auto=format&fit=crop' },
    { rank: 5, name: 'Teh Manis', cat: 'Minuman', qty: 23, sales: 230000, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop' },
  ];

  const bsEl = document.getElementById('best-seller-rows');
  if (bsEl) {
    const maxQty = 60;
    bsEl.innerHTML = bestSellers.map(b => `
      <tr>
        <td class="rank-num">${b.rank}</td>
        <td>
          <div class="rank-prod">
            <img src="${b.img}" alt="${b.name}" class="rank-img"/>
            <div>
              <div class="rank-name">${b.name}</div>
            </div>
          </div>
        </td>
        <td><span style="color:#94a3b8;font-size:.72rem">${b.cat}</span></td>
        <td>
          <div style="font-weight:700;color:#e2e8f0;font-size:.78rem">${b.qty}</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${Math.round((b.qty/maxQty)*100)}%; --delay:${b.rank}"></div>
          </div>
        </td>
        <td style="text-align:right;font-weight:800;color:#38bdf8">${fmt(b.sales)}</td>
      </tr>
    `).join('');
  }
}

/* ---- INVENTORY ---- */
function renderInventory() {
  document.getElementById('inv-tbody').innerHTML = PRODUCTS.map(p => {
    const status = p.stock===0 ? 'out' : p.stock<20 ? 'low' : 'ok';
    const bdg    = {ok:'badge-ok',low:'badge-low',out:'badge-out'}[status];
    const lbl    = {ok:'✓ Aman',low:'⚠ Hampir Habis',out:'✗ Habis'}[status];
    return `<tr>
      <td style="display:flex;align-items:center;gap:.5rem"><img src="${p.img}" style="width:28px;height:28px;border-radius:6px;object-fit:cover;border:1px solid rgba(255,255,255,.1)"/><span>${p.name}</span></td>
      <td><span style="color:var(--muted);font-size:.75rem">${p.cat}</span></td>
      <td style="font-weight:700;color:var(--cyan)">${fmt(p.price)}</td>
      <td style="font-weight:700;color:var(--text)">${p.stock} pcs</td>
      <td><span class="badge ${bdg}">${lbl}</span></td>
    </tr>`;
  }).join('');
}

/* ---- REPORT ---- */
function renderReport() {
  document.getElementById('tx-list').innerHTML = TRANSACTIONS.map(t => `
    <div class="tx-row" style="grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr">
      <span class="tx-num">${t.num}</span>
      <span style="color:var(--muted)">${t.time} WIB</span>
      <span style="color:#c084fc;font-weight:600">${t.method}</span>
      <span style="font-weight:700;color:#38bdf8">${fmt(t.total)}</span>
      <span><span class="tx-status">✓ Lunas</span></span>
    </div>
  `).join('');
}

/* ---- CLOCK ---- */
function updateClock() {
  const now = new Date();
  const t   = now.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
  const el  = document.getElementById('clock');
  if (el) el.textContent = t + ' WIB';
}
setInterval(updateClock, 1000);

/* ---- VIEW SWITCHER ---- */
function setView(v) {
  state.view = v;
  render();
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  render();

  // Cash input listener
  const ci = document.getElementById('cash-input');
  if (ci) {
    ci.addEventListener('input', e => {
      const raw = e.target.value.replace(/\D/g,'');
      state.cashInput = parseInt(raw) || 0;
      e.target.value  = state.cashInput ? state.cashInput.toLocaleString('id-ID') : '';
      updateChange();
    });
  }

  // Report tabs
  document.querySelectorAll('.r-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.r-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
