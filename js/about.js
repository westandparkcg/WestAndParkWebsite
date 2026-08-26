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

/* Placeholder roster — role-first so real names/photos can drop in */
const TEAM = [
  ['Principal & Founder', 'Sets the standard. Personally reviews every estimate over $1M before it goes out.'],
  ['Director of Preconstruction', 'Turns napkin sketches into numbers you can take to a lender.'],
  ['Director of Operations', 'Owns every schedule in the company. Allergic to surprises.'],
  ['Senior Project Executive', 'Your single point of accountability from contract to closeout.'],
  ['Senior Superintendent', 'Thirty years of field wisdom. Runs the safest sites we have.'],
  ['Project Manager', 'The weekly report you can read in five minutes? That is them.'],
  ['Safety Director', 'OSHA-30, and the only person who can stop any job at any time.'],
  ['Facilities Lead', 'Answers the 2 AM call after everyone else has gone home.'],
];

const team = document.querySelector('[data-team]');
if (team) {
  team.innerHTML = TEAM.map(
    ([role, bio]) => `
    <div class="team-cell">
      <div class="team-avatar" aria-hidden="true">W+P</div>
      <div>
        <h3>Your Name Here</h3>
        <div class="role">${role}</div>
      </div>
      <p>${bio}</p>
    </div>`
  ).join('');
}

initReveals();
