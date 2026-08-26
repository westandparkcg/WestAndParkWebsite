/* About page */
import { METHOD } from './data.js';
import { initChrome, initReveals } from './ui.js';

initChrome();

const method = document.querySelector('[data-method]');
if (method) {
  method.innerHTML = METHOD.map(
    (m) => `
    <div class="method-row">
      <div class="method-step">${m.step}</div>
      <div class="method-name">${m.name}<span class="time">${m.time}</span></div>
      <p>${m.text}</p>
    </div>`
  ).join('');
}

initReveals();
