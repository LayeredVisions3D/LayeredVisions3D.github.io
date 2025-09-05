// Helper: format dollars
function formatUSD(n){ return n.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0}); }

// Accordion behavior
document.querySelectorAll('.acc').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

// ROI calculator
document.getElementById('calc').addEventListener('click', () => {
  const qty = Number(document.getElementById('qty').value || 0);
  const conv = Number(document.getElementById('conv').value || 0) / 100;
  const value = Number(document.getElementById('value').value || 0);
  const actions = Math.round(qty * conv);
  const revenue = actions * value;
  const out = document.getElementById('roi-output');
  document.getElementById('roi-monthly').textContent = formatUSD(revenue);
  document.getElementById('roi-notes').textContent = `${actions} actions/month at ${Math.round(conv*100)}% x ${formatUSD(value)} avg. value`;
  out.classList.add('flash');
  setTimeout(()=>out.classList.remove('flash'), 400);
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// vCard save (client-side)
document.getElementById('save-contact').addEventListener('click', () => {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Layered Visions 3D;;;',
    'FN:Layered Visions 3D',
    'ORG:Layered Visions 3D LLC',
    'TITLE:Sales',
    'TEL;TYPE=WORK,VOICE:+1-718-419-1050',
    'EMAIL;TYPE=PREF,INTERNET:layeredvisions3d@gmail.com',
    'URL:https://yourdomain.com', // TODO: replace with your site
    'ADR;TYPE=WORK:;;Brooklyn;NY;112xx;USA',
    'END:VCARD'
  ].join('\n');
  const blob = new Blob([vcf], {type:'text/vcard'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'LayeredVisions3D.vcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// Links to replace with your real URLs
document.getElementById('wholesale-form').href = 'https://docs.google.com/forms/d/e/1FAIpQLSfnHkk0mn52RoVqnh6q5E7ObPLPhLmeNUTDsqNGBTjaO7Budw/viewform';
document.getElementById('shop-link').href = 'https://www.etsy.com/shop/LayeredVisions3DShop?ref=shop_profile&listing_id=4357928352';

// Lead form (static demo). Replace with real endpoint (e.g., Netlify Forms, Formspree, or your backend).
document.getElementById('lead-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  console.log('Lead submitted (demo):', data);
  form.reset();
  alert('Thanks! We\'ll reach out shortly.');
});
