/* Services page: detailed rows */
import { SERVICES } from './data.js';
import { initChrome, initReveals } from './ui.js';

initChrome();

const rows = document.querySelector('[data-service-rows]');
rows.innerHTML = SERVICES.map(
  (s, i) => `
  <div class="service-row reveal" id="${s.id}">
    <div class="service-num">0${i + 1}</div>
    <div class="service-main">
      <h2>${s.name}</h2>
      <p>${s.blurb}</p>
    </div>
    <div class="service-side">
      <h3>What's included</h3>
      <ul>${s.points.map((pt) => `<li>${pt}</li>`).join('')}</ul>
    </div>
  </div>`
).join('');

initReveals();
