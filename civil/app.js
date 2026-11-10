const CEREMONY_START = '2026-12-23T10:45:00-08:00';
const CEREMONY_END = '2026-12-23T12:15:00-08:00';
const RECEPTION_START = '2026-12-23T13:00:00-08:00';
const RECEPTION_END = '2026-12-23T16:00:00-08:00';

const CITY_HALL = {
  name: 'San Francisco City Hall',
  lines: ['1 Dr. Carlton B. Goodlett Place', 'Fourth Floor Balcony', 'San Francisco, CA 94102'],
  when: '10:45 a.m. to 12:15 p.m.',
  maps: 'https://www.google.com/maps/search/?api=1&query=San%20Francisco%20City%20Hall%201%20Dr%20Carlton%20B%20Goodlett%20Pl'
};

const EPIC = {
  name: 'Epic Steak',
  lines: ['369 The Embarcadero', 'San Francisco, CA 94105'],
  when: '1:00 to 4:00 p.m.',
  note: 'No valet parking.',
  maps: 'https://www.google.com/maps/search/?api=1&query=Epic%20Steak%20369%20The%20Embarcadero%20San%20Francisco'
};

const MENU_PREVIEW = [
  {
    title: 'Cocktail hour',
    note: 'Premium cocktails, wine, beer, and nonalcoholic drinks.',
    dishes: [
      ['Dungeness Crab Cakes', 'Citrus, Calabrian chili aioli'],
      ['Grilled Steak Skewers', 'Chimichurri sauce'],
      ['Harissa Prawns', 'Micro coriander, tzatziki sauce']
    ]
  },
  {
    title: 'First course',
    note: '',
    dishes: [
      ['Ravioli', 'Vegetarian. Seasonal ravioli']
    ]
  },
  {
    title: 'Main course',
    note: '',
    dishes: [
      ['6oz Grilled Filet Mignon', 'Creamed spinach, roasted sunchoke, bordelaise'],
      ['Northern Halibut', 'Butter beans, roasted mushrooms, spinach']
    ]
  }
];

const PREVIEW = {
  couple: {
    greeting: 'Preview Guest and Preview Partner',
    guest1: 'Preview Guest',
    guest2: 'Preview Partner'
  },
  single: {
    greeting: 'Preview Guest',
    guest1: 'Preview Guest',
    guest2: ''
  }
};

const app = document.querySelector('#app');

init();

function init() {
  const scriptUrl = (window.WEDDING.scriptUrl || '').trim();
  const params = new URLSearchParams(window.location.search);
  const token = (params.get('invite') || '').trim();
  if (!scriptUrl) {
    const party = params.get('preview') === 'single' ? 'single' : 'couple';
    const menu = params.get('menu') === 'sample' ? sampleMenu() : emptyMenu();
    renderInvitation(PREVIEW[party], menu, { preview: party });
    return;
  }
  if (!token) {
    renderGate();
    return;
  }
  loadInvitation(scriptUrl, token);
}

async function loadInvitation(scriptUrl, token) {
  try {
    const response = await fetch(`${scriptUrl}?token=${encodeURIComponent(token)}`);
    const data = await response.json();
    if (!data.ok) {
      renderGate();
      return;
    }
    renderInvitation(data, data.menu || emptyMenu(), { token, scriptUrl });
  } catch (error) {
    console.error(error);
    renderGate('This invitation link could not be opened. Please try it again.');
  }
}

function renderGate(message) {
  app.innerHTML = `
    <section class="gate">
      <div class="card panel">
        <img class="monogram" src="assets/monogram.png" alt="MN monogram" />
        <p class="eyebrow">Private invitation</p>
        <h1><span>Monica</span><span class="amp">&amp;</span><span>Nathaniel</span></h1>
        <p class="family">Villegas</p>
        <p>${message || 'Please open the personal link you were sent.'}</p>
      </div>
    </section>`;
}

function renderInvitation(invitation, menu, session) {
  const guest2 = (invitation.guest2 || '').trim();
  app.innerHTML = `
    ${session.preview ? previewBanner(session.preview) : ''}
    <section class="screen reveal">
      <img class="monogram" src="assets/monogram.png" alt="Monica and Nathaniel monogram" />
      <p class="eyebrow">Our private civil ceremony</p>
      <p class="short-date">12/23/26</p>
    </section>
    ${art('balloon.png', 'balloon')}
    <section class="screen reveal">
      <div class="frame">
        <div class="frame-inner">
          <h1><span>Monica</span><span class="amp">&amp;</span><span>Nathaniel</span></h1>
          <p class="family">Villegas</p>
          <p class="invite">${inviteLine(invitation)}</p>
          <p class="date-line"><strong>Wednesday, December 23, 2026</strong></p>
          <p class="date-line"><strong>in San Francisco.</strong></p>
        </div>
      </div>
    </section>
    ${art('city-hall.png', 'city-hall')}
    <section class="panel reveal">
      <h2>Ceremony &amp; Reception</h2>
      <div class="venues">
        ${venue('Ceremony', CITY_HALL, calendarUrl('Civil ceremony of Monica and Nathaniel Villegas', CEREMONY_START, CEREMONY_END, CITY_HALL), 'left')}
        ${venue('Reception', EPIC, calendarUrl('Reception for Monica and Nathaniel Villegas', RECEPTION_START, RECEPTION_END, EPIC), 'right')}
      </div>
    </section>
    <section class="panel reveal">
      <h2>The Day</h2>
      <ol class="timeline">
        <li><time>10:45 to 11:30 a.m.</time><span>Ceremony on the Fourth Floor Balcony at San Francisco City Hall</span></li>
        <li><time>11:30 a.m. to 12:15 p.m.</time><span>Group photos on the balcony and outside.</span></li>
        <li><time>1:00 to 2:00 p.m.</time><span>Cocktail hour and hors d'oeuvres at Epic Steak</span></li>
        <li><time>2:00 to 4:00 p.m.</time><span>Coursed lunch and cake</span></li>
        <li><time>4:00 p.m. onward</time><span>Nightcap at a holiday-themed bar. Optional.</span></li>
      </ol>
    </section>
    <section class="panel reveal">
      <h2>Afterward</h2>
      <p>After the reception, join us for a nightcap at a holiday-themed bar. It's a festive tradition Monica and Nathaniel have shared since they started dating, and they want to continue it with you all. Details to be shared here closer to the day.</p>
    </section>
    ${art('bay-bridge.png', 'bridge')}
    <section class="panel reveal dress">
      <h2>Dress code</h2>
      <p class="dress-code">Formal</p>
      <p>This is a formal celebration. San Francisco winter can turn cool, so we suggest dressing in layers.</p>
    </section>
    <section class="panel reveal transport">
      <h2>Transportation</h2>
      <p>Rideshare is highly suggested.</p>
      <p>For San Francisco City Hall, the parking garage in front of the building is the best option.</p>
      <p>For Epic Steak, Hills Plaza parking garage is the closest option on the Embarcadero. There is no valet.</p>
    </section>
    <section class="panel reveal" id="menu-panel"></section>
    ${art('mistletoe.png', 'mistletoe')}
    <section class="panel reveal" id="rsvp-panel"></section>
    <footer class="closing reveal">
      <h2>With love,</h2>
      <p class="signature">Monica and Nathaniel</p>
      <p class="fine">Please reply by ${window.WEDDING.rsvpDeadline}.</p>
      <p class="credit">Hand-drawn art by Madeline Morales.</p>
    </footer>`;
  renderMenu();
  renderRsvp(invitation, menu, session, guest2);
  revealOnScroll();
}

function art(file, name) {
  return `<figure class="art art-${name} reveal" aria-hidden="true"><img src="assets/${file}" alt="" /></figure>`;
}

function inviteLine(invitation) {
  const guest1 = escapeHtml(invitation.guest1 || 'you');
  const guest2 = escapeHtml((invitation.guest2 || '').trim());
  const guests = guest2 ? `their family, ${guest1}, and ${guest2}` : `their family and ${guest1}`;
  return `cordially invite ${guests} to their private ceremony on`;
}

function venue(title, place, calendar, side) {
  return `<div class="venue venue-${side}">
    <p class="kicker">${title}</p>
    <p class="place"><strong>${place.name}</strong></p>
    ${place.lines.map(line => `<p class="place">${line}</p>`).join('')}
    <p class="time">${place.when}</p>
    ${place.note ? `<p class="note">${place.note}</p>` : ''}
    <div class="actions">
      <a class="button secondary" href="${place.maps}" target="_blank" rel="noopener noreferrer">Open in Maps</a>
      <a class="button secondary" href="${calendar}" target="_blank" rel="noopener noreferrer">Add to calendar</a>
    </div>
  </div>`;
}

function revealOnScroll() {
  const nodes = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    nodes.forEach(node => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  // Wait until the hidden state has painted, or the first screen appears without a fade.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => nodes.forEach(node => observer.observe(node)));
  });
}

function previewBanner(party) {
  const other = party === 'single' ? 'couple' : 'single';
  const otherHref = other === 'single' ? '?preview=single' : './';
  return `<p class="preview-banner">Design preview for a ${party} invitation. Replies are not saved yet. <a href="${otherHref}">View the ${other} version</a>.</p>`;
}

function renderMenu() {
  const panel = document.querySelector('#menu-panel');
  const courses = MENU_PREVIEW.map(course => `
    <div class="menu-course">
      <h3>${course.title}</h3>
      ${course.note ? `<p class="menu-note">${course.note}</p>` : ''}
      <ul class="dishes">
        ${course.dishes.map(([name, detail]) => `<li><strong>${name}</strong><span>${detail}</span></li>`).join('')}
      </ul>
    </div>`).join('');
  panel.innerHTML = `
    <h2>Menu</h2>
    <p>Main course will be chosen by you on the day of the reception. Vegan upon request.</p>
    ${courses}
    <div class="menu-course">
      <h3>Dessert</h3>
      <ul class="dishes"><li><strong>S'mores Cake</strong><span>Chocolate ganache and graham crust</span></li></ul>
    </div>`;
}

function renderRsvp(invitation, menu, session, guest2) {
  const panel = document.querySelector('#rsvp-panel');
  const guests = [{ key: 'guest1', name: invitation.guest1 }];
  if (guest2) guests.push({ key: 'guest2', name: guest2 });
  panel.innerHTML = `
    <h2>Reply</h2>
    <p>Please respond by ${window.WEDDING.rsvpDeadline}.</p>
    <form id="rsvp-form" novalidate>
      ${guests.map(guest => guestFields(guest)).join('')}
      <h3>How we can reach you</h3>
      <p class="fine">One email, phone number, and mailing address for the household.</p>
      <label class="field">Email<input name="email" type="email" autocomplete="email" required /></label>
      <label class="field">Phone<input name="phone" type="tel" autocomplete="tel" required /></label>
      <label class="field">Street address<input name="street" autocomplete="address-line1" required /></label>
      <label class="field">Apartment, suite, or other<input name="line2" autocomplete="address-line2" /></label>
      <label class="field">City<input name="city" autocomplete="address-level2" required /></label>
      <label class="field">State or region<input name="region" autocomplete="address-level1" required /></label>
      <label class="field">Postal code<input name="postal" autocomplete="postal-code" required /></label>
      <label class="field">Country<input name="country" autocomplete="country-name" value="United States" required /></label>
      <label class="field">An optional note for Monica and Nathaniel<textarea name="message" maxlength="500"></textarea></label>
      <div class="hp"><label>Company<input name="company" tabindex="-1" autocomplete="off" /></label></div>
      <p class="form-error" id="form-error" hidden></p>
      <button type="submit">Send reply</button>
    </form>`;
  document.querySelector('#rsvp-form').addEventListener('submit', event => submitRsvp(event, invitation, menu, session, guests));
}

function guestFields(guest) {
  return `<fieldset class="guest-block">
    <legend class="script">${escapeHtml(guest.name)}</legend>
    <div class="choice-row">
      <label class="choice attend"><input type="radio" name="${guest.key}-attending" value="yes" required /> Will attend</label>
      <label class="choice attend"><input type="radio" name="${guest.key}-attending" value="no" /> Cannot attend</label>
    </div>
  </fieldset>`;
}

async function submitRsvp(event, invitation, menu, session, guests) {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.querySelector('#form-error');
  const payload = readForm(form, invitation, menu, guests);
  if (payload.error) {
    error.hidden = false;
    error.textContent = payload.error;
    return;
  }
  error.hidden = true;
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  if (!session.scriptUrl) {
    showSuccess(payload, true);
    return;
  }
  try {
    const response = await fetch(session.scriptUrl, {
      method: 'POST',
      body: JSON.stringify({ ...payload.value, token: session.token })
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || 'Reply was not saved');
    showSuccess(payload, false);
  } catch (requestError) {
    console.error(requestError);
    error.hidden = false;
    error.textContent = 'The reply did not go through. Please try again. If this keeps happening, the setup steps in SETUP.md include a Safari test.';
    button.disabled = false;
  }
}

function readForm(form, invitation, menu, guests) {
  const data = new FormData(form);
  if ((data.get('company') || '').trim()) return { error: 'Reply could not be sent.' };
  const value = {
    email: text(data, 'email'),
    phone: text(data, 'phone'),
    street: text(data, 'street'),
    line2: text(data, 'line2'),
    city: text(data, 'city'),
    region: text(data, 'region'),
    postal: text(data, 'postal'),
    country: text(data, 'country'),
    message: text(data, 'message'),
    guests: []
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return { error: 'Enter an email address.' };
  if (value.phone.replace(/\D/g, '').length < 10) return { error: 'Enter a phone number with at least 10 digits.' };
  if (!value.street || !value.city || !value.region || !value.postal || !value.country) {
    return { error: 'Enter the full mailing address.' };
  }
  for (const guest of guests) {
    const attending = data.get(`${guest.key}-attending`);
    if (attending !== 'yes' && attending !== 'no') return { error: `Please respond for ${guest.name}.` };
    const record = {
      name: guest.name,
      attending: attending === 'yes',
    };
    value.guests.push(record);
  }
  return { value };
}

function showSuccess(payload, preview) {
  const names = payload.value.guests.map(guest => `${guest.name} will ${guest.attending ? 'attend' : 'not attend'}`).join('. ');
  document.querySelector('#rsvp-panel').innerHTML = `
    <div class="success">
      <h2>Thank you</h2>
      <p>${escapeHtml(names)}.</p>
      <p>${preview ? 'This was a design preview, so nothing was saved.' : 'Your reply is saved. Open this same link again if you need to change it before the deadline.'}</p>
    </div>`;
}

function calendarUrl(title, start, end, place) {
  const dates = `${stamp(start)}/${stamp(end)}`;
  const details = 'Private civil ceremony of Monica and Nathaniel Villegas';
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&location=${encodeURIComponent(place.name)}&details=${encodeURIComponent(details)}`;
}

function stamp(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function sampleMenu() {
  return {
    ready: true,
    first: [
      { name: 'Citrus and fennel', notes: 'Placeholder' },
      { name: 'Mushroom tartlet', notes: 'Placeholder' }
    ],
    second: [
      { name: 'Roasted chicken', notes: 'Placeholder' },
      { name: 'Seared salmon', notes: 'Placeholder' },
      { name: 'Butternut risotto', notes: 'Placeholder' },
      { name: 'Filet of beef', notes: 'Placeholder' }
    ],
    dessert: [
      { name: 'Olive oil cake', notes: 'Placeholder' },
      { name: 'Chocolate pot', notes: 'Placeholder' }
    ]
  };
}

function emptyMenu() {
  return { ready: false, first: [], second: [], dessert: [] };
}

function hasOptions(menu) {
  return ['first', 'second', 'dessert'].every(key => (menu[key] || []).length > 0);
}

function choiceExists(options, name) {
  return (options || []).some(option => option.name === name);
}

function text(data, key) {
  return String(data.get(key) || '').trim();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}