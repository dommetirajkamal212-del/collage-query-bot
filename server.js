const express = require('express');
const cors = require('cors');
const path = require('path');
const collegesData = require('./data/colleges');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for Render and uptime monitoring
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// API endpoint to retrieve full college structured data
app.get('/api/colleges', (req, res) => {
  res.json(collegesData);
});

// Intelligent query processing engine
function processQuery(queryText, instituteId = null) {
  const q = (queryText || '').toLowerCase().trim();
  if (!q) {
    return {
      answer: "Please ask a question regarding courses, fees, admissions, facilities, or contact details for St Mary's Institutions.",
      confidence: 0,
      suggestions: ["What are B.Tech fees?", "Courses at SMEC", "How to apply to SMRU?", "Hostel facilities", "Campus contact number"]
    };
  }

  // Check direct FAQs
  for (const faq of collegesData.faqs) {
    const matchCount = faq.tags.filter(tag => q.includes(tag)).length;
    if (matchCount >= 2 || q.includes(faq.q.toLowerCase())) {
      return {
        answer: faq.a,
        confidence: 0.95,
        matchedFaq: faq.q,
        suggestions: ["B.Tech courses", "Hostel facilities", "Contact office", "Compare SMEC and SMRU"]
      };
    }
  }

  // Detect which institution is being referenced
  let targetInst = null;
  if (q.includes('smec') || q.includes('engineering college') || instituteId === 'smec') {
    targetInst = collegesData.institutes.find(i => i.id === 'smec');
  } else if (q.includes('smgi') || q.includes('group of institution') || q.includes('pharmacy') || instituteId === 'smgi') {
    targetInst = collegesData.institutes.find(i => i.id === 'smgi');
  } else if (q.includes('smru') || q.includes('rehabilitation university') || q.includes('university') || instituteId === 'smru') {
    targetInst = collegesData.institutes.find(i => i.id === 'smru');
  }

  // If asking about fees / tuition / cost
  if (q.includes('fee') || q.includes('cost') || q.includes('tuition') || q.includes('price') || q.includes('how much') || q.includes('amount')) {
    if (targetInst && targetInst.id === 'smru') {
      return {
        answer: `**St Mary's Rehabilitation University (SMRU) Fees:**\n\nTuition fees at SMRU vary by the specific school and degree program for the 2026–27 session. You can view program-specific fee structures and apply directly at [apply.smru.edu.in](https://apply.smru.edu.in) or call the admissions desk at **73311 19432 / 90104 55591**.`,
        confidence: 0.9,
        suggestions: ["SMRU schools list", "How to apply online", "SMEC B.Tech fee"]
      };
    }
    if (targetInst && targetInst.id === 'smgi') {
      return {
        answer: `**St Mary's Group of Institutions (SMGI) Fee Structure:**\n\n• **B.Pharmacy (4 Years):** Approx ₹2.40 Lakhs total\n• **B.Tech Programmes:** Approx ₹1.80 Lakhs total\n• **Polytechnic Diploma:** Approx ₹46,500 total\n\n*(Indicative totals for the full duration under state convenor quota).*`,
        confidence: 0.92,
        suggestions: ["Pharmacy eligibility", "SMEC engineering fee", "Hostel fees"]
      };
    }
    return {
      answer: `**St Mary's Engineering College (SMEC) Fee Structure:**\n\n• **B.Tech (CSE, AI&ML, AI&DS, Cyber Security, IoT):** Approx ₹1.80 – ₹2.00 Lakhs total\n• **MBA (2 Years):** Approx ₹54,000 total\n• **MCA (3 Years):** Approx ₹81,000 total\n• **Diploma / Polytechnic:** Approx ₹46,500 total\n\n*Note: Fees are state convenor quota estimates. For management quota or current cycle details, please verify with admissions.*`,
      confidence: 0.94,
      suggestions: ["B.Tech courses list", "Admissions process", "Hostel accommodation"]
    };
  }

  // If asking about courses / branches / degrees / schools
  if (q.includes('course') || q.includes('branch') || q.includes('program') || q.includes('degree') || q.includes('specialization') || q.includes('school')) {
    if (targetInst && targetInst.id === 'smru') {
      return {
        answer: `**St Mary's Rehabilitation University (SMRU) — 6 Schools & 70+ Programs:**\n\n1. **School of Rehabilitation Sciences** (BPT, MPT, Rehab Therapy)\n2. **School of Health & Allied Health Sciences** (B.Sc Allied Health, M.Sc)\n3. **School of Psychology** (B.Sc, M.Sc, Clinical Psychology)\n4. **School of Nursing Sciences** (B.Sc & M.Sc Nursing)\n5. **School of Engineering & Emerging Technologies** (B.Tech, M.Tech, Ph.D.)\n6. **School of Law** (B.A. LL.B, B.B.A. LL.B, LL.M.)\n\nApplications: [apply.smru.edu.in](https://apply.smru.edu.in)`,
        confidence: 0.92,
        suggestions: ["SMRU Admissions", "Engineering at SMEC", "Contact SMRU"]
      };
    }
    return {
      answer: `**Courses Offered at St Mary's Engineering College (SMEC):**\n\n• **B.Tech (4 Yrs):** CSE, AI & Machine Learning, AI & Data Science, Cyber Security, IoT\n• **M.Tech (2 Yrs):** Computer Science & Engineering\n• **Postgraduate:** MBA (2 Yrs), MCA (3 Yrs)\n• **Diploma / Polytechnic (3 Yrs):** CSE & Embedded Systems\n\n*All engineering programs are AICTE approved and affiliated to JNTUH.*`,
      confidence: 0.94,
      suggestions: ["Fee structure", "Eligibility for B.Tech", "Placement record"]
    };
  }

  // If asking about admissions / eligibility / entrance exam
  if (q.includes('admiss') || q.includes('apply') || q.includes('eligib') || q.includes('eamcet') || q.includes('entrance') || q.includes('cutoff')) {
    return {
      answer: `**Admissions & Eligibility Overview:**\n\n• **B.Tech:** 10+2 with Physics, Chemistry & Math (min 45%). Admission via **TS EAMCET / AP EAMCET** convenor counselling or Category-B management seats.\n• **B.Pharmacy:** 10+2 with BiPC / MPC via **TS EAMCET**.\n• **MBA / MCA:** Recognized degree with min 50% (45% reserved) via **TS ICET**.\n• **SMRU University Programs:** Open now for 2026–27! Apply online at [apply.smru.edu.in](https://apply.smru.edu.in).\n• **Polytechnic:** 10th / SSC pass via **TS POLYCET**.`,
      confidence: 0.9,
      suggestions: ["How much is the fee?", "Hostel facilities", "Contact admissions office"]
    };
  }

  // If asking about placements / packages / companies / salary
  if (q.includes('place') || q.includes('package') || q.includes('salary') || q.includes('job') || q.includes('recruiter') || q.includes('ctc') || q.includes('highest')) {
    return {
      answer: `**Placement Highlights at St Mary's:**\n\n• **Highest CTC:** Reported offers up to **₹10 LPA**.\n• **Dedicated Placement Cell:** Provides pre-placement training in data structures, algorithms, aptitude, and mock technical interviews from the 3rd year onward.\n• **Recruiters:** Tech consulting, IT services, and core engineering firms recruit graduates each year.`,
      confidence: 0.9,
      suggestions: ["B.Tech courses", "Hostel facilities", "Address & location"]
    };
  }

  // If asking about facilities / hostel / campus / transport / library
  if (q.includes('facil') || q.includes('hostel') || q.includes('campus') || q.includes('bus') || q.includes('transport') || q.includes('mess') || q.includes('library') || q.includes('sports')) {
    return {
      answer: `**Campus Infrastructure & Facilities (120-Acre Campus):**\n\n• **Hostels:** Separate, secure on-campus hostels for boys & girls with Wi-Fi, dining mess, and 24/7 security.\n• **Computing & Labs:** Modern JNTUH and PCI-approved specialized labs with high-speed fiber internet.\n• **Transport:** Extensive fleet of college buses serving Hyderabad and Secunderabad.\n• **Library:** Over 30,000 reference volumes, digital e-journals, and quiet study suites.\n• **Recreation:** Cricket grounds, volleyball, basketball, cafeteria, and student wellbeing mentoring.`,
      confidence: 0.9,
      suggestions: ["B.Tech fee structure", "Contact details", "Campus location"]
    };
  }

  // If asking about contact / phone / email / address / location
  if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('email') || q.includes('address') || q.includes('where') || q.includes('location')) {
    return {
      answer: `**Campus Address & Contact Directory:**\n\n📍 **Location:** Batasingaram Main Road, Pochampally Mandal, Near Ramoji Film City, Deshmukhi, Yadadri Bhuvanagiri District, Telangana – 508284\n\n📞 **Phone:** **90104 55590** / **96666 91040** / **73311 19432**\n📧 **SMRU Enquiries:** Reach@smru.edu.in\n🌐 **Admissions Portal:** [apply.smru.edu.in](https://apply.smru.edu.in)\n🏛️ **SMEC Affiliation:** JNTU Hyderabad (AICTE Approved)`,
      confidence: 0.95,
      suggestions: ["Apply online", "Courses offered", "Fee structure"]
    };
  }

  // If asking about difference between SMEC and SMRU
  if ((q.includes('smec') && q.includes('smru')) || q.includes('difference') || q.includes('compare')) {
    return {
      answer: `**SMEC vs SMRU Comparison:**\n\n• **SMEC (St Mary's Engineering College):** Established in 1996, affiliated to **JNTU Hyderabad** and approved by **AICTE**. Focuses specifically on engineering (B.Tech/M.Tech), MBA, MCA, and Polytechnic diplomas.\n• **SMRU (St Mary's Rehabilitation University):** Established under **Telangana State Act No. 10 of 2026** as a UGC-recognized private university. Operates 6 distinct schools covering Rehabilitation Sciences, Allied Health, Psychology, Law, and Emerging Technologies across a 120-acre campus.`,
      confidence: 0.95,
      suggestions: ["SMEC B.Tech courses", "SMRU 6 schools", "Contact number"]
    };
  }

  // Default fallback response
  return {
    answer: `Here is information regarding **St Mary's Institutions, Deshmukhi Campus**:\n\nThe campus houses **St Mary's Engineering College (SMEC)**, **St Mary's Group of Institutions (SMGI)**, and **St Mary's Rehabilitation University (SMRU)**.\n\nCould you clarify what you'd like to know? You can ask about:\n• **Courses Offered** (B.Tech, B.Pharm, MBA, Law, Rehabilitation, etc.)\n• **Fee Structures** & Scholarship Quotas\n• **Admissions & Entrance Exams** (TS EAMCET, ICET, POLYCET)\n• **Campus Facilities & Hostels**\n• **Phone Numbers & Directions**`,
    confidence: 0.6,
    suggestions: ["B.Tech courses & fees", "SMRU admissions", "Hostel accommodation", "Contact numbers"]
  };
}

// Conversational query API endpoint
app.post('/api/query', (req, res) => {
  const { query, instituteId } = req.body;
  const result = processQuery(query, instituteId);
  res.json(result);
});

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 College Query Bot server running on http://0.0.0.0:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
});
