// ============================================
// DELUSIONAL DUMB GRANDPA — SITE SCRIPT
// (Visual-only cart: no real payment processing)
// ============================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      navToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.textContent = '☰';
    }));
  }

  /* ---- Cart (in-memory, persists across pages via sessionStorage) ---- */
  const CART_KEY = 'ddg_cart_count';
  function getCartCount(){
    return parseInt(sessionStorage.getItem(CART_KEY) || '0', 10);
  }
  function setCartCount(n){
    sessionStorage.setItem(CART_KEY, String(n));
    document.querySelectorAll('.cart-badge').forEach(b => b.textContent = n);
  }
  setCartCount(getCartCount());

  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = getCartCount();
      setCartCount(current + 1);
      const original = btn.dataset.label || btn.textContent.trim();
      btn.dataset.label = original;
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('added');
      }, 1300);
    });
  });

  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Cart preview: ' + getCartCount() + ' item(s). Full checkout isn\'t wired up yet on this demo site.');
    });
  });

  /* ---- Product / category filter tabs ---- */
  const tabs = document.querySelectorAll('.filter-tabs button');
  const items = document.querySelectorAll('[data-category]');
  if (tabs.length && items.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.filter;
        items.forEach(it => {
          it.style.display = (cat === 'all' || it.dataset.category === cat) ? '' : 'none';
        });
      });
    });
  }

  /* ---- Newsletter + contact forms (demo-only submit) ---- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = form.dataset.successMessage || 'Thanks! (This form is a front-end demo — connect it to an email service or Shopify/GoDaddy form handler to go live.)';
        status.classList.add('show');
      }
      form.reset();
    });
  });

});
