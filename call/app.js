const app = document.querySelector('#app');

init();

function init() {
  const days = window.CALL.days.filter(day => day.published !== false);
  const byId = Object.fromEntries(days.map(day => [day.id, day]));

  function selected() {
    const id = location.hash.replace('#', '');
    return byId[id] || days[0];
  }

  function draw() {
    const day = selected();
    if (location.hash !== `#${day.id}`) history.replaceState(null, '', `#${day.id}`);
    document.title = `${day.label} · Call sheet`;
    const crew = window.CALL.people.filter(person => person.days.includes(day.id));
    app.innerHTML = `
      <header class="top">
        <p class="kicker">Call sheet</p>
        <h1>${escapeHtml(day.title)}</h1>
        <div class="switch" role="tablist" aria-label="Event day">
          ${days.map(item => `
            <button type="button" role="tab" id="tab-${item.id}" aria-selected="${item.id === day.id}" aria-controls="day" data-day="${item.id}">${escapeHtml(item.label)}</button>
          `).join('')}
        </div>
      </header>
      <div id="day" role="tabpanel" aria-labelledby="tab-${day.id}">
        ${window.CALL.note ? `<p class="notice">${escapeHtml(window.CALL.note)}</p>` : ''}
        ${shotlist(day)}
        ${section('Timeline', timeline(day))}
        ${section('Places', places(day))}
        ${tickets(day)}
        ${section('People', people(crew))}
      </div>`;
    app.querySelectorAll('[data-day]').forEach(button => {
      button.addEventListener('click', () => {
        location.hash = button.dataset.day;
      });
    });
    app.querySelectorAll('[data-ticket]').forEach(button => {
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') === 'true';
        app.querySelectorAll('[data-ticket]').forEach(other => setTicket(other, false));
        setTicket(button, !open);
      });
    });
  }

  window.addEventListener('hashchange', draw);
  draw();
}

function shotlist(day) {
  const url = (day.shotlist || '').trim();
  if (!url) {
    return `<p class="shot waiting">Shot list link not added yet</p>`;
  }
  return `<a class="shot" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Click for photo shot list</a>`;
}

function setTicket(button, open) {
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  button.nextElementSibling.hidden = !open;
  const action = button.querySelector('.action');
  if (action) action.textContent = open ? 'Tap to hide' : 'Tap to show';
}

function tickets(day) {
  const passes = day.tickets || [];
  if (!passes.length) return '';
  return `
    <section>
      <h2>Tickets</h2>
      <p class="notice ticket-note">${escapeHtml(day.ticketNote || 'Photo ID may be required.')}</p>
      <ul class="cards tickets">
        ${passes.map((pass, index) => `
          <li>
            <button type="button" data-ticket aria-expanded="false" aria-controls="ticket-${index}">
              <strong>${escapeHtml(pass.who)}</strong>
              <span>Ticket ${escapeHtml(pass.numbers)}</span>
              <span class="action">Tap to show</span>
            </button>
            <div class="pass" id="ticket-${index}" hidden>
              <img src="${escapeHtml(pass.file)}" alt="Filoli ticket for ${escapeHtml(pass.who)}">
            </div>
          </li>`).join('')}
      </ul>
    </section>`;
}

function section(title, body) {
  return `<section><h2>${title}</h2>${body}</section>`;
}

function timeline(day) {
  if (!day.timeline.length) return `<p class="empty">Schedule for this day isn’t on the sheet yet.</p>`;
  return `<ol class="timeline">${day.timeline.map(item => `
    <li>
      <time>${escapeHtml(item.time)}</time>
      <div><strong>${escapeHtml(item.text)}</strong>${item.detail ? `<span>${escapeHtml(item.detail)}</span>` : ''}</div>
    </li>`).join('')}</ol>`;
}

function places(day) {
  if (!day.places.length) return `<p class="empty">Address for this day isn’t on the sheet yet.</p>`;
  return `<ul class="cards">${day.places.map(place => `
    <li>
      <a href="${escapeHtml(place.maps)}">
        <strong>${escapeHtml(place.name)}</strong>
        ${place.lines.map(line => `<span>${escapeHtml(line)}</span>`).join('')}
        ${place.note ? `<em>${escapeHtml(place.note)}</em>` : ''}
        <span class="action">Open in Maps</span>
      </a>
    </li>`).join('')}</ul>`;
}

function people(crew) {
  if (!crew.length) return `<p class="empty">No one is listed for this day yet.</p>`;
  return `<ul class="cards">${crew.map(person => {
    const phone = String(person.phone || '').trim();
    const name = String(person.name || '').trim();
    const dial = phone.replace(/[^\d+]/g, '');
    const inner = `
      <strong>${escapeHtml(name || person.role)}</strong>
      <span>${escapeHtml(name ? person.role : 'Name not added')}</span>
      <span class="action">${phone ? escapeHtml(phone) : 'Number not added'}</span>`;
    if (!dial) return `<li><div class="row">${inner}</div></li>`;
    return `<li><a href="tel:${dial}">${inner}</a></li>`;
  }).join('')}</ul>`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}
