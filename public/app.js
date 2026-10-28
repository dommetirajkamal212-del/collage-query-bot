/* -------------------------------------------------------------
   St Mary's Institutions — AI Query Bot & Client Application
------------------------------------------------------------- */

// Embedded fallback knowledge base in case backend is loading or client is offline
const LOCAL_DATA = {
  institutes: [
    {
      id: "smec",
      short: "SMEC",
      name: "St Mary's Engineering College",
      type: "Autonomous Engineering College",
      badges: ["Est. 1996", "JNTUH Affiliated", "AICTE Approved"],
      meta: "Autonomous engineering college, established <b>1996</b> · Affiliated to <b>JNTU Hyderabad</b> · <b>AICTE</b> approved",
      about: "St Mary's Engineering College (SMEC) was established in 1996 and is an autonomous institution affiliated to JNTU Hyderabad. Situated at Deshmukhi near Ramoji Film City, SMEC has educated thousands of engineers with strong focus on industry alignment, modern computing labs, and holistic student development.",
      coursesHtml: `<ul>
        <li><b>B.Tech (4 Yrs):</b> Computer Science & Engineering (CSE), AI & Machine Learning, AI & Data Science, Cyber Security, IoT</li>
        <li><b>M.Tech (2 Yrs):</b> Computer Science & Engineering</li>
        <li><b>Postgraduate:</b> MBA (2 Yrs), MCA (3 Yrs)</li>
        <li><b>Diploma / Polytechnic (3 Yrs):</b> Computer Science & Engineering, Embedded Systems</li>
      </ul>
      <p style="margin-top:8px;"><em>Admissions via TS EAMCET / AP EAMCET (B.Tech), TS PGECET (M.Tech), TS ICET (MBA/MCA), and TS POLYCET (Diploma).</em></p>`,
      feesHtml: `<table class="data-table">
        <thead><tr><th>Programme</th><th>Approx. Total Fee</th></tr></thead>
        <tbody>
          <tr><td>B.Tech (All Branches)</td><td>₹1.80 – ₹2.00 Lakhs</td></tr>
          <tr><td>MBA</td><td>₹54,000</td></tr>
          <tr><td>MCA</td><td>₹81,000</td></tr>
          <tr><td>Diploma / Polytechnic</td><td>₹46,500</td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px; font-size:12px; color:var(--text-faint);"><em>Figures are aggregator-reported totals for the full course duration — confirm exact category-wise fees with the admissions office.</em></p>`,
      admissionsHtml: `<p><b>Eligibility:</b> 10+2 with minimum 45% aggregate in Physics, Mathematics & Chemistry for B.Tech; 10th standard for Diploma; and recognized Bachelor's degree (min 50% or 45% reserved) for PG programmes.</p>
      <p style="margin-top:8px;"><b>Counselling:</b> Admissions follow the TS/AP state counselling calendar (TS EAMCET for B.Tech, TS ICET for MBA/MCA). Management quota seats (Category B) can be applied for directly at the campus office.</p>`,
      facilitiesHtml: `<ul>
        <li>Modern JNTUH-aligned Computer Science & AI laboratories with high-speed fiber internet</li>
        <li>Central Library with over 30,000 volumes, DELNET access, and quiet study suites</li>
        <li>Separate secure on-campus hostels for boys and girls with hygienic mess facilities</li>
        <li>Sports complex: cricket ground, volleyball, basketball, and indoor gaming halls</li>
        <li>Active Training & Placement Cell — reported highest CTC ~₹10 LPA</li>
        <li>Fleet of college buses covering major routes in Hyderabad & Secunderabad</li>
      </ul>`,
      contactsHtml: `<p><b>Address:</b><br>Batasingaram Main Road, Pochampally Mandal, Near Ramoji Film City, Deshmukhi, Yadadri Bhuvanagiri District, Telangana – 508284</p>
      <p style="margin-top:10px;"><b>Phone Numbers:</b> 90104 55590 / 96666 91040</p>
      <p><b>Affiliation:</b> JNTU Hyderabad (AICTE Approved)</p>`
    },
    {
      id: "smgi",
      short: "SMGI",
      name: "St Mary's Group of Institutions",
      type: "Integrated Technical & Professional Campus",
      badges: ["Est. 1996", "Multi-Programme", "NCTE · AICTE · PCI"],
      meta: "Umbrella group running Engineering, Pharmacy and Diploma programmes on the same campus · <b>NCTE / AICTE / PCI</b> recognised",
      about: "St Mary's Group of Institutions is the umbrella administration running engineering, pharmacy and diploma programmes together on the Deshmukhi campus, under the same educational trust as SMEC. It is recognised by NCTE, AICTE and the Pharmacy Council of India (PCI).",
      coursesHtml: `<ul>
        <li><b>B.Pharmacy (4 Yrs):</b> Pharmacy Council of India (PCI) approved degree</li>
        <li><b>B.Tech:</b> Computer Science & Engineering, Artificial Intelligence & Machine Learning</li>
        <li><b>Polytechnic Diploma:</b> Computer Science & Engineering</li>
      </ul>`,
      feesHtml: `<table class="data-table">
        <thead><tr><th>Programme</th><th>Approx. Total Fee</th></tr></thead>
        <tbody>
          <tr><td>B.Pharmacy</td><td>₹2.40 Lakhs</td></tr>
          <tr><td>B.Tech</td><td>₹1.80 Lakhs</td></tr>
          <tr><td>Diploma in CSE</td><td>₹46,500</td></tr>
        </tbody>
      </table>`,
      admissionsHtml: `<p>Admissions to B.Pharmacy occur through <b>TS EAMCET</b> (BiPC / MPC streams) state counselling. B.Tech and Diploma seats adhere to TS EAMCET and TS POLYCET calendars respectively.</p>`,
      facilitiesHtml: `<ul>
        <li>State-of-the-art Pharmaceutics, Pharmacognosy, and Pharmacology laboratories</li>
        <li>PCI-compliant machine room, quality control and aseptic formulation suites</li>
        <li>Shared 120-acre campus sports amenities, multi-cuisine cafeteria, and medical clinic</li>
        <li>Hostels with residential wardens and 24x7 security surveillance</li>
      </ul>`,
      contactsHtml: `<p><b>Address:</b><br>Batasingaram Main Road, Pochampally Mandal, Near Ramoji Film City, Deshmukhi, Yadadri Bhuvanagiri District, Telangana – 508284</p>
      <p style="margin-top:10px;"><b>Phone:</b> 90104 55590 / 96666 91040</p>`
    },
    {
      id: "smru",
      short: "SMRU",
      name: "St Mary's Rehabilitation University",
      type: "Private State University",
      badges: ["UGC Recognised", "Est. 2026", "120-acre Campus", "70+ Programs"],
      meta: "UGC-recognised private university, established by <b>Telangana Act No. 10 of 2026</b> · 120-acre purpose-built campus",
      about: "St Mary's Rehabilitation University (SMRU) is a UGC-recognised private university established by Telangana Act No. 10 of 2026, on a 120-acre campus at the same Deshmukhi location near Ramoji Film City. It offers 70+ programmes across six schools, with an emphasis on rehabilitation, health and allied sciences.",
      coursesHtml: `<p><b>Six Autonomous Schools (UG, PG, Integrated & Ph.D.):</b></p>
      <ul>
        <li><b>School of Rehabilitation Sciences:</b> B.P.T, M.P.T, Rehabilitation Therapy</li>
        <li><b>School of Health & Allied Health Sciences:</b> B.Sc Allied Health, M.Sc</li>
        <li><b>School of Psychology:</b> B.Sc, M.Sc, Clinical Psychology</li>
        <li><b>School of Nursing Sciences:</b> B.Sc & M.Sc Nursing</li>
        <li><b>School of Engineering & Emerging Technologies:</b> B.Tech, M.Tech, Ph.D.</li>
        <li><b>School of Law:</b> B.A. LL.B, B.B.A. LL.B, LL.M.</li>
      </ul>`,
      feesHtml: `<p>Fee structure is programme-specific and set by the university each academic year. You can check current fees and apply directly at <a href="https://apply.smru.edu.in" target="_blank" rel="noopener"><b>apply.smru.edu.in</b></a> or contact the admissions office directly.</p>`,
      admissionsHtml: `<p>Admissions for UG, PG and Diploma programmes are actively open for the 2026–27 session. Apply online directly at <a href="https://apply.smru.edu.in" target="_blank" rel="noopener"><b>apply.smru.edu.in</b></a>.</p>
      <p style="margin-top:8px;">Helpline: <b>73311 19432 / 90104 55591</b></p>`,
      facilitiesHtml: `<ul>
        <li>120-acre purpose-built master campus near Ramoji Film City</li>
        <li>Discipline-specific laboratories with clinical simulation and rehabilitation exposure</li>
        <li>High-end hostel accommodation with study suites and security</li>
        <li>Mentoring, counselling, and residential wellbeing support</li>
        <li>Statutory Anti-ragging cell, grievance redressal, and Ombudsperson office</li>
      </ul>`,
      contactsHtml: `<p><b>Address:</b><br>Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Telangana – 508284</p>
      <p style="margin-top:10px;"><b>Phone Helpline:</b> 73311 19432 / 90104 55591 / 90104 55590</p>
      <p><b>General Email:</b> <a href="mailto:Reach@smru.edu.in">Reach@smru.edu.in</a></p>
      <p><b>Admissions Portal:</b> <a href="https://apply.smru.edu.in" target="_blank" rel="noopener">apply.smru.edu.in</a></p>
      <p><b>Official Website:</b> <a href="https://smru.edu.in" target="_blank" rel="noopener">smru.edu.in</a></p>`
    }
  ]
};

// Application State
let activeInstitute = 'smec';
let activeTopic = 'about';
let speechEnabled = true;
let isRecognizing = false;

// DOM Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const ttsToggleBtn = document.getElementById('ttsToggleBtn');
const ttsIcon = document.getElementById('ttsIcon');
const navTabs = document.querySelectorAll('.nav-tab');
const viewPanels = document.querySelectorAll('.view-panel');

// Chat Elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const micBtn = document.getElementById('micBtn');
const quickChips = document.querySelectorAll('.chip');

// Directory Elements
const instSelector = document.getElementById('instSelector');
const instBannerCard = document.getElementById('instBannerCard');
const topicGrid = document.getElementById('topicGrid');
const detailPanel = document.getElementById('detailPanel');

// Filter Elements
const courseFilterInput = document.getElementById('courseFilterInput');
const instFilterSelect = document.getElementById('instFilterSelect');
const courseCardsGrid = document.getElementById('courseCardsGrid');

/* -------------------------------------------------------------
   Theme Management
------------------------------------------------------------- */
function initTheme() {
  const saved = localStorage.getItem('sm_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  themeIcon.textContent = saved === 'dark' ? '🌙' : '📜';
}

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'parchment' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('sm_theme', next);
  themeIcon.textContent = next === 'dark' ? '🌙' : '📜';
});

/* -------------------------------------------------------------
   Voice / Text-to-Speech (TTS)
------------------------------------------------------------- */
ttsToggleBtn.addEventListener('click', () => {
  speechEnabled = !speechEnabled;
  ttsIcon.textContent = speechEnabled ? '🔊' : '🔇';
  ttsToggleBtn.querySelector('.btn-text').textContent = speechEnabled ? 'Voice On' : 'Voice Off';
  if (!speechEnabled && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
});

function speakText(text) {
  if (!speechEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  // Strip Markdown characters for clean speech
  const clean = text.replace(/[*#_`[\]]/g, '').replace(/https?:\/\/\S+/g, '');
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.rate = 1.05;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

/* -------------------------------------------------------------
   Speech Recognition (STT Microphone)
------------------------------------------------------------- */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isRecognizing = true;
    micBtn.classList.add('listening');
    micBtn.setAttribute('title', 'Listening... Speak your query');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    submitQuery(transcript);
  };

  recognition.onerror = () => {
    isRecognizing = false;
    micBtn.classList.remove('listening');
  };

  recognition.onend = () => {
    isRecognizing = false;
    micBtn.classList.remove('listening');
  };

  micBtn.addEventListener('click', () => {
    if (isRecognizing) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });
} else {
  micBtn.style.opacity = '0.5';
  micBtn.setAttribute('title', 'Speech recognition not supported in this browser');
}

/* -------------------------------------------------------------
   Navigation View Switching
------------------------------------------------------------- */
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetView = tab.getAttribute('data-view');
    navTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    viewPanels.forEach(panel => {
      if (panel.id === `view-${targetView}`) {
        panel.classList.add('active');
        panel.hidden = false;
      } else {
        panel.classList.remove('active');
        panel.hidden = true;
      }
    });
  });
});

/* -------------------------------------------------------------
   Markdown to HTML Helper
------------------------------------------------------------- */
function formatMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/^### (.*$)/gim, '<h4 style="color:var(--accent-gold);margin:8px 0 4px;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="color:var(--accent-gold);margin:10px 0 6px;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n• /g, '<br>• ');
  return `<p>${html}</p>`;
}

/* -------------------------------------------------------------
   Chat Assistant Engine
------------------------------------------------------------- */
function appendMessage(sender, text, suggestions = []) {
  const row = document.createElement('div');
  row.className = `msg-row ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = sender === 'bot' ? 'SM' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = formatMarkdown(text);

  // Bot response actions (Copy, Listen)
  if (sender === 'bot') {
    const actions = document.createElement('div');
    actions.className = 'msg-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'msg-action-btn';
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '✅ Copied!';
      setTimeout(() => copyBtn.innerHTML = '📋 Copy', 2000);
    });

    const speakBtn = document.createElement('button');
    speakBtn.className = 'msg-action-btn';
    speakBtn.innerHTML = '🔊 Read';
    speakBtn.addEventListener('click', () => speakText(text));

    actions.appendChild(copyBtn);
    actions.appendChild(speakBtn);

    // If suggestions exist, add chips
    if (suggestions && suggestions.length > 0) {
      const sugWrap = document.createElement('div');
      sugWrap.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;';
      suggestions.forEach(s => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.style.fontSize = '11px';
        chip.textContent = s;
        chip.addEventListener('click', () => submitQuery(s));
        sugWrap.appendChild(chip);
      });
      bubble.appendChild(sugWrap);
    }

    bubble.appendChild(actions);
  }

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (sender === 'bot') {
    speakText(text);
  }
}

function showTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'msg-row bot typing-row';
  row.id = 'typingIndicator';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = 'SM';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = '<div class="typing-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

async function submitQuery(queryText) {
  const q = queryText.trim();
  if (!q) return;

  appendMessage('user', q);
  chatInput.value = '';
  showTypingIndicator();

  try {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, instituteId: activeInstitute })
    });

    if (res.ok) {
      const data = await res.json();
      removeTypingIndicator();
      appendMessage('bot', data.answer, data.suggestions);
      return;
    }
  } catch (err) {
    console.warn('Backend /api/query error, falling back to client search engine:', err);
  }

  // Fallback client search if server is unreachable
  setTimeout(() => {
    removeTypingIndicator();
    const fallbackAnswer = clientFallbackQuery(q);
    appendMessage('bot', fallbackAnswer.answer, fallbackAnswer.suggestions);
  }, 400);
}

function clientFallbackQuery(query) {
  const q = query.toLowerCase();
  if (q.includes('fee') || q.includes('cost') || q.includes('tuition')) {
    return {
      answer: `**St Mary's Tuition & Fee Summary:**\n\n• **B.Tech (SMEC):** ₹1.80 – ₹2.00 Lakhs total\n• **B.Pharmacy (SMGI):** ₹2.40 Lakhs total\n• **MBA / MCA (SMEC):** ₹54,000 / ₹81,000 total\n• **Diploma / Polytechnic:** ₹46,500 total\n• **SMRU University:** School-wise fees at [apply.smru.edu.in](https://apply.smru.edu.in)`,
      suggestions: ["Admissions process", "Hostel facilities", "Contact office"]
    };
  }
  if (q.includes('course') || q.includes('branch') || q.includes('program')) {
    return {
      answer: `**Programs Offered:**\n\n• **SMEC:** B.Tech (CSE, AI & ML, AI & DS, Cyber Security, IoT), M.Tech, MBA, MCA, Polytechnic\n• **SMGI:** B.Pharmacy (PCI Approved), B.Tech, Diploma\n• **SMRU:** 70+ Degree Programs in Rehabilitation, Allied Health, Law, Psychology, and Engineering.`,
      suggestions: ["B.Tech fees", "SMRU 6 schools", "Eligibility"]
    };
  }
  if (q.includes('hostel') || q.includes('facil') || q.includes('campus')) {
    return {
      answer: `**Campus & Hostel Amenities:**\n\n• Separate boys and girls hostels on the 120-acre Deshmukhi campus\n• Nutritious multi-cuisine mess & dining hall\n• High-speed fiber internet and modern computer laboratories\n• Cricket ground, indoor sports, and college transport fleet across Hyderabad.`,
      suggestions: ["Contact desk", "Courses offered", "Fee structure"]
    };
  }
  return {
    answer: `**St Mary's Information Desk:**\n\nLocated at Deshmukhi near Ramoji Film City, Hyderabad. For direct admission enquiries, call **90104 55590 / 96666 91040** or SMRU Admissions at **73311 19432**.`,
    suggestions: ["B.Tech fees", "Hostel facilities", "Apply online"]
  };
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitQuery(chatInput.value);
});

quickChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const q = chip.getAttribute('data-query');
    submitQuery(q);
  });
});

/* -------------------------------------------------------------
   Campus Directory Renderer
------------------------------------------------------------- */
const TOPICS = [
  { id: 'about', label: 'About', icon: '🏛️' },
  { id: 'courses', label: 'Courses Offered', icon: '📚' },
  { id: 'fees', label: 'Fee Structure', icon: '💰' },
  { id: 'admissions', label: 'Admissions', icon: '📝' },
  { id: 'facilities', label: 'Facilities & Hostel', icon: '🏢' },
  { id: 'contacts', label: 'Address & Contact', icon: '📞' }
];

function renderDirectory() {
  // Render Institute Selector
  instSelector.innerHTML = '';
  LOCAL_DATA.institutes.forEach(inst => {
    const btn = document.createElement('button');
    btn.className = `inst-card-btn ${inst.id === activeInstitute ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="inst-tag">${inst.short}</span>
      <span class="inst-title">${inst.name}</span>
    `;
    btn.addEventListener('click', () => {
      activeInstitute = inst.id;
      renderDirectory();
    });
    instSelector.appendChild(btn);
  });

  // Current active institute data
  const current = LOCAL_DATA.institutes.find(i => i.id === activeInstitute) || LOCAL_DATA.institutes[0];

  // Render Banner Card
  instBannerCard.innerHTML = `
    <div class="banner-meta">${current.meta}</div>
    <div class="banner-badges">
      ${current.badges.map(b => `<span class="badge">${b}</span>`).join('')}
    </div>
  `;

  // Render Topic Grid
  topicGrid.innerHTML = '';
  TOPICS.forEach(top => {
    const btn = document.createElement('button');
    btn.className = `topic-btn ${top.id === activeTopic ? 'active' : ''}`;
    btn.innerHTML = `<span>${top.icon}</span> <span>${top.label}</span>`;
    btn.addEventListener('click', () => {
      activeTopic = top.id;
      renderDirectory();
    });
    topicGrid.appendChild(btn);
  });

  // Render Detail Panel
  const topicObj = TOPICS.find(t => t.id === activeTopic);
  let content = '';
  if (activeTopic === 'about') content = `<p>${current.about}</p>`;
  else if (activeTopic === 'courses') content = current.coursesHtml;
  else if (activeTopic === 'fees') content = current.feesHtml;
  else if (activeTopic === 'admissions') content = current.admissionsHtml;
  else if (activeTopic === 'facilities') content = current.facilitiesHtml;
  else if (activeTopic === 'contacts') content = current.contactsHtml;

  detailPanel.innerHTML = `
    <span class="detail-header">${current.name} · ${topicObj.label}</span>
    <div class="detail-content">${content}</div>
  `;
}

/* -------------------------------------------------------------
   Course & Fee Finder Grid
------------------------------------------------------------- */
const ALL_COURSES = [
  { instId: 'smec', instName: 'SMEC', name: 'B.Tech in Computer Science & Engineering', duration: '4 Years', exam: 'TS EAMCET', fee: '₹1.80 – ₹2.00 Lakhs', elig: '10+2 with PCM (Min 45%)' },
  { instId: 'smec', instName: 'SMEC', name: 'B.Tech in AI & Machine Learning', duration: '4 Years', exam: 'TS EAMCET', fee: '₹1.80 – ₹2.00 Lakhs', elig: '10+2 with PCM (Min 45%)' },
  { instId: 'smec', instName: 'SMEC', name: 'B.Tech in AI & Data Science', duration: '4 Years', exam: 'TS EAMCET', fee: '₹1.80 – ₹2.00 Lakhs', elig: '10+2 with PCM (Min 45%)' },
  { instId: 'smec', instName: 'SMEC', name: 'B.Tech in Cyber Security & IoT', duration: '4 Years', exam: 'TS EAMCET', fee: '₹1.80 – ₹2.00 Lakhs', elig: '10+2 with PCM (Min 45%)' },
  { instId: 'smec', instName: 'SMEC', name: 'M.Tech in Computer Science & Engineering', duration: '2 Years', exam: 'TS PGECET / GATE', fee: 'Approx ₹1.14 Lakhs', elig: 'B.Tech / B.E. in relevant discipline' },
  { instId: 'smec', instName: 'SMEC', name: 'MBA (Master of Business Administration)', duration: '2 Years', exam: 'TS ICET', fee: '₹54,000 Total', elig: "Recognized Bachelor's Degree" },
  { instId: 'smec', instName: 'SMEC', name: 'MCA (Master of Computer Applications)', duration: '3 Years', exam: 'TS ICET', fee: '₹81,000 Total', elig: 'Degree with Math at 10+2/Degree' },
  { instId: 'smec', instName: 'SMEC', name: 'Polytechnic Diploma in CSE', duration: '3 Years', exam: 'TS POLYCET', fee: '₹46,500 Total', elig: '10th / SSC Pass' },
  { instId: 'smgi', instName: 'SMGI', name: 'B.Pharmacy (Bachelor of Pharmacy)', duration: '4 Years', exam: 'TS EAMCET (BiPC/MPC)', fee: '₹2.40 Lakhs Total', elig: '10+2 with Science (PCI Approved)' },
  { instId: 'smru', instName: 'SMRU', name: 'School of Rehabilitation Sciences (BPT/MPT)', duration: '4.5 Yrs / 2 Yrs', exam: 'University Merit', fee: 'Refer to apply.smru.edu.in', elig: '10+2 PCB / BPT Degree' },
  { instId: 'smru', instName: 'SMRU', name: 'School of Health & Allied Health Sciences', duration: '3 - 4 Years', exam: 'University Merit', fee: 'Refer to apply.smru.edu.in', elig: '10+2 Science Stream' },
  { instId: 'smru', instName: 'SMRU', name: 'School of Psychology (B.Sc / M.Sc)', duration: '3 - 5 Years', exam: 'University Test', fee: 'Refer to apply.smru.edu.in', elig: '10+2 Any Stream / UG Psychology' },
  { instId: 'smru', instName: 'SMRU', name: 'School of Nursing Sciences (B.Sc Nursing)', duration: '4 Years', exam: 'Nursing Entrance', fee: 'Refer to apply.smru.edu.in', elig: '10+2 with PCB (Min 45%)' },
  { instId: 'smru', instName: 'SMRU', name: 'School of Law (B.A. LL.B / B.B.A. LL.B)', duration: '5 Years Integrated', exam: 'CLAT / TS LAWCET / Test', fee: 'Refer to apply.smru.edu.in', elig: '10+2 with min 45%' },
  { instId: 'smru', instName: 'SMRU', name: 'School of Engineering & Emerging Technologies', duration: '4 Years', exam: 'National / State / SMRU', fee: 'Refer to apply.smru.edu.in', elig: '10+2 with PCM' }
];

function renderCourseCards() {
  const query = (courseFilterInput.value || '').toLowerCase().trim();
  const selectedInst = instFilterSelect.value;

  const filtered = ALL_COURSES.filter(c => {
    const matchInst = selectedInst === 'all' || c.instId === selectedInst;
    const matchQuery = !query || c.name.toLowerCase().includes(query) || c.exam.toLowerCase().includes(query) || c.instName.toLowerCase().includes(query);
    return matchInst && matchQuery;
  });

  courseCardsGrid.innerHTML = '';
  if (filtered.length === 0) {
    courseCardsGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-faint);">No courses match your search criteria. Try a different term or select all institutions.</div>';
    return;
  }

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div>
        <div class="course-card-header">
          <span class="course-inst-tag">${c.instName}</span>
          <span style="font-size:11px;font-family:var(--font-mono);color:var(--text-faint);">${c.duration}</span>
        </div>
        <h3>${c.name}</h3>
        <div class="course-meta-item"><b>Entrance:</b> ${c.exam}</div>
        <div class="course-meta-item"><b>Eligibility:</b> ${c.elig}</div>
      </div>
      <div class="course-fee-pill">
        💰 Approx. Fee: <strong>${c.fee}</strong>
      </div>
    `;
    courseCardsGrid.appendChild(card);
  });
}

courseFilterInput.addEventListener('input', renderCourseCards);
instFilterSelect.addEventListener('change', renderCourseCards);

/* -------------------------------------------------------------
   Initialization
------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderDirectory();
  renderCourseCards();

  // Initial bot greeting
  appendMessage(
    'bot',
    `**Welcome to St Mary's Institutions Virtual Information Desk!** 🏛️\n\nI can assist you with comprehensive details regarding **St Mary's Engineering College (SMEC)**, **St Mary's Group of Institutions (SMGI)**, and **St Mary's Rehabilitation University (SMRU)** at Deshmukhi Campus, Hyderabad.\n\nAsk any question or click a quick suggestion below to begin!`,
    ["What are B.Tech CSE fees?", "How to apply for SMRU?", "Hostel facilities", "Compare SMEC and SMRU"]
  );
});
