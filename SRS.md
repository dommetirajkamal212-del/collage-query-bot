# Software Requirements Specification (SRS)
## For St Mary's Institutions AI Information Desk & Campus Query Portal

**Document Version:** 1.0.0  
**Date:** October 28, 2026  
**Standard:** IEEE Std 830-1998 Compliant  
**Project Name:** College Query Bot (`collage-query-bot`)  
**Target Institutions:** St Mary's Engineering College (SMEC), St Mary's Group of Institutions (SMGI), St Mary's Rehabilitation University (SMRU)  
**Campus Location:** Deshmukhi, Near Ramoji Film City, Hyderabad, Telangana  

---

## Table of Contents
1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Document Conventions
   - 1.3 Intended Audience & Reading Suggestions
   - 1.4 Product Scope
   - 1.5 References
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Functions
   - 2.3 User Classes and Characteristics
   - 2.4 Operating Environment
   - 2.5 Design and Implementation Constraints
   - 2.6 User Documentation
   - 2.7 Assumptions and Dependencies
3. [External Interface Requirements](#3-external-interface-requirements)
   - 3.1 User Interfaces
   - 3.2 Hardware Interfaces
   - 3.3 Software Interfaces
   - 3.4 Communications Interfaces
4. [System Features & Functional Requirements](#4-system-features--functional-requirements)
   - 4.1 Natural Language Query Engine & Chatbot
   - 4.2 Voice Interaction (Speech-to-Text & Text-to-Speech)
   - 4.3 Multi-Institution Directory & Information Desk
   - 4.4 Institution Comparison Matrix
   - 4.5 Interactive Course & Fee Explorer
   - 4.6 Theme Management & Accessibility
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 Performance Requirements
   - 5.2 Safety and Security Requirements
   - 5.3 Software Quality Attributes (Availability, Reliability, Usability, Portability)
   - 5.4 Compliance & Verification Requirements
6. [System Architecture & Data Models](#6-system-architecture--data-models)
   - 6.1 Architectural Block Diagram
   - 6.2 Data Flow Diagram (DFD Level 0 & Level 1)
   - 6.3 API Specifications
7. [Appendix](#7-appendix)
   - 7.1 Acronyms and Abbreviations
   - 7.2 Requirements Traceability Matrix

---

## 1. Introduction

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) document is to delineate the functional, operational, and non-functional requirements for the **St Mary's Institutions AI Information Desk & Campus Query Portal**. This document provides the blueprint for developers, quality assurance testers, educational administrators, and cloud deployment operations teams.

### 1.2 Document Conventions
- This specification follows the **IEEE Std 830-1998** standard.
- Requirement priority levels are classified as:
  - **[M] Mandatory:** Core system capability required for initial deployment.
  - **[D] Desirable:** High-value enhancement.
  - **[O] Optional:** Future aesthetic or extensible capability.
- Requirements identifiers follow the format `REQ-<CATEGORY>-<NUMBER>`.

### 1.3 Intended Audience & Reading Suggestions
- **Project Stakeholders & College Administrators:** Review Sections 1.4 (Scope) and 2.2 (Functions).
- **Software Engineers & Developers:** Review Section 3 (Interfaces), Section 4 (Functional Requirements), and Section 6 (Architecture & API).
- **Quality Assurance & Testers:** Review Section 4 against Section 5 (Non-Functional Requirements) and the Traceability Matrix in Section 7.2.

### 1.4 Product Scope
The **College Query Bot** is a responsive, web-based conversational assistant and centralized digital kiosk designed for prospective students, parents, faculty, and current students seeking accurate academic, administrative, fee, and infrastructural information about the three institutions on the Deshmukhi Campus:
1. **St Mary's Engineering College (SMEC)** — Autonomous JNTUH-affiliated engineering college.
2. **St Mary's Group of Institutions (SMGI)** — Multidisciplinary campus offering Pharmacy (PCI-approved), Engineering, and Polytechnic programs.
3. **St Mary's Rehabilitation University (SMRU)** — UGC-recognized private state university established under Telangana Act No. 10 of 2026.

### 1.5 References
- IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications.
- Telangana State Act No. 10 of 2026 (SMRU Statutory Charter).
- JNTU Hyderabad Academic & Affiliation Guidelines.
- All India Council for Technical Education (AICTE) Approval Process Handbook.
- Pharmacy Council of India (PCI) Norms and Standards.

---

## 2. Overall Description

### 2.1 Product Perspective
The College Query Bot functions as a lightweight, cloud-deployable full-stack application. It acts as an autonomous tier-1 virtual information desk replacing static text PDFs with responsive natural language dialogue, searchable fee matrices, and direct multi-campus comparisons.

```
+--------------------------------------------------------------+
|                        Client Layer                          |
|  - Modern Web Browser (Desktop / Mobile / Tablet)            |
|  - HTML5 UI + Vanilla CSS3 + Web Speech API (STT & TTS)      |
+--------------------------------------------------------------+
                               |
                               | HTTPS / JSON
                               v
+--------------------------------------------------------------+
|                    Application Server Layer                  |
|  - Node.js & Express.js Engine (Port 3000 / Render PORT)    |
|  - Static Asset Delivery (`public/`)                         |
|  - Local NLP Keyword & Intent Matching Engine                |
|  - Health Monitoring Endpoint (`/healthz`)                   |
+--------------------------------------------------------------+
                               |
                               v
+--------------------------------------------------------------+
|                     Knowledge Base Layer                     |
|  - Structured In-Memory College Data (`data/colleges.js`)    |
|  - FAQ Taxonomy, Tuitions, Eligibility & Regulatory Records  |
+--------------------------------------------------------------+
```

### 2.2 Product Functions
1. **Conversational Question Answering:** Natural language processing of inquiries regarding courses, fees, admissions, facilities, placements, and campus contact records.
2. **Speech Recognition (Voice Input):** Real-time speech-to-text dictation using the Web Speech Recognition API.
3. **Speech Synthesis (Voice Readout):** Browser-driven audible reading of information desk responses.
4. **Campus Directory Explorer:** Categorized information browser for SMEC, SMGI, and SMRU.
5. **Multi-Institution Comparison:** Side-by-side parametric matrix contrasting affiliations, degrees, established years, and fee structures.
6. **Program & Fee Filter:** Real-time searchable database of 15+ academic degrees with eligibility filters and fee estimates.
7. **Direct Calling & Online Portals:** One-click integration with admissions hotlines and online application portals (`apply.smru.edu.in`).

### 2.3 User Classes and Characteristics
| User Class | Description | Technical Literacy | Frequency of Use |
|---|---|---|---|
| **Prospective Students** | High school / polytechnic graduates seeking admission routes (EAMCET, ICET, POLYCET). | Moderate | High during counselling season |
| **Parents & Guardians** | Individuals evaluating campus safety, hostel facilities, fee structure, and affiliations. | Low to Moderate | Seasonal |
| **Current Students** | Enrolled scholars querying department helplines, hostel regulations, and transport. | High | Periodic |
| **Campus Admin Staff** | Admissions office referencing standardized tuition figures and regulatory records. | High | Regular |

### 2.4 Operating Environment
- **Server Platform:** Node.js v18.0.0+ on Linux (Ubuntu 22.04 LTS / Alpine) containerized on Render Cloud Platform.
- **Client Platform:** Any ECMAScript 6+ compliant browser (Google Chrome 90+, Mozilla Firefox 88+, Apple Safari 14+, Microsoft Edge 90+, Mobile Safari, Android Webview).
- **Network Protocol:** HTTP/1.1 and HTTP/2 over TLS 1.3 (HTTPS).

### 2.5 Design and Implementation Constraints
- **Zero External Database Overhead:** In-memory structured knowledge base for instantaneous sub-10ms response latency without database connection pooling bottlenecks.
- **Zero Heavy UI Framework Dependencies:** Implemented in standard HTML5, Vanilla CSS3, and JavaScript to ensure zero build bundle lag, sub-second initial load, and maximum longevity.
- **Stateless Architecture:** Application server is completely stateless, enabling horizontal scaling across cloud nodes without session affinity requirements.

### 2.6 User Documentation
- Technical overview and deployment documentation are contained in `README.md`.
- Infrastructure specifications are defined in `render.yaml`.
- Inline source code commentary in `server.js`, `public/app.js`, and `data/colleges.js`.

### 2.7 Assumptions and Dependencies
- Client devices have audio input/output hardware for voice features.
- Network connectivity is available for loading web assets and fonts from Google Fonts CDN.
- Aggregator-reported fee estimates are subject to annual state admission convenor notifications.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
- **Header Section:** Features the St Mary's gold shield crest, brand identity, live status beacon, dark/parchment theme switcher, and voice toggle button.
- **Navigation Matrix:** Responsive tab navigation switching between:
  1. `AI Query Desk`
  2. `Campus Directory`
  3. `Institution Comparison`
  4. `Course & Fee Finder`
- **Chat Window (`#chatMessages`):** Dual-message stream styling with distinct bot avatars, markdown formatting, copy-to-clipboard buttons, and related question chips.
- **Interactive Action Bar:** Sticky helpline bar with click-to-call mobile integration (`tel:9010455590`) and external link out to `apply.smru.edu.in`.

### 3.2 Hardware Interfaces
- Microphone input device for voice transcription.
- Audio speakers or headset for voice synthesis playback.
- Display resolutions from 320px (smartphones) to 4K ultra-wide monitors.

### 3.3 Software Interfaces
- **Operating System:** Linux / POSIX compliant host.
- **Node.js Runtime Engine:** Version >= 18.0.0.
- **Express Framework:** Version 4.21.2+.
- **Web APIs:**
  - `window.SpeechRecognition` / `window.webkitSpeechRecognition`
  - `window.speechSynthesis` / `SpeechSynthesisUtterance`
  - `navigator.clipboard`

### 3.4 Communications Interfaces
- HTTPS RESTful JSON endpoints (`/api/query`, `/api/colleges`, `/healthz`).
- JSON message payloads encoded in standard UTF-8.

---

## 4. System Features & Functional Requirements

### 4.1 Natural Language Query Engine & Chatbot
- **REQ-CHAT-01 [M]:** The system shall process text inquiries from the user and respond within 200 milliseconds.
- **REQ-CHAT-02 [M]:** The system shall match user queries against pre-compiled FAQs, synonyms, and college entities (SMEC, SMGI, SMRU).
- **REQ-CHAT-03 [M]:** The system shall format answers in readable markdown including bullet points, bold highlights, fee tables, and hyperlinks.
- **REQ-CHAT-04 [M]:** The system shall provide contextually relevant query suggestion chips alongside each response.
- **REQ-CHAT-05 [D]:** The system shall offer a 1-click clipboard copy feature for every bot response.
- **REQ-CHAT-06 [M]:** If server communication fails, the client shall seamlessly fall back to the embedded client-side knowledge engine without breaking the user experience.

### 4.2 Voice Interaction
- **REQ-VOICE-01 [D]:** The system shall provide a microphone button enabling speech recognition for user query input.
- **REQ-VOICE-02 [D]:** The system shall parse spoken English audio into textual queries and automatically submit them to the query processor.
- **REQ-VOICE-03 [D]:** The system shall provide an audible readout toggle allowing answers to be spoken aloud.
- **REQ-VOICE-04 [M]:** The system shall gracefully degrade and disable voice buttons if the user's browser does not support the Web Speech API.

### 4.3 Multi-Institution Directory & Information Desk
- **REQ-DIR-01 [M]:** The system shall provide tabs to toggle between SMEC, SMGI, and SMRU.
- **REQ-DIR-02 [M]:** The system shall display verified accreditation badges (e.g., *Est. 1996*, *JNTUH Affiliated*, *AICTE Approved*, *Telangana Act 10 of 2026*, *PCI Approved*).
- **REQ-DIR-03 [M]:** The system shall partition institutional records into 6 core categories:
  1. *About*
  2. *Courses Offered*
  3. *Fee Structure*
  4. *Admissions*
  5. *Facilities & Campus*
  6. *Address & Contact*
- **REQ-DIR-04 [M]:** The system shall present fee tables with clear duration indicators and statutory notes.

### 4.4 Institution Comparison Matrix
- **REQ-COMP-01 [M]:** The system shall provide a comparison view presenting SMEC, SMGI, and SMRU side-by-side.
- **REQ-COMP-02 [M]:** The comparison matrix shall evaluate:
  - Regulatory Status (Autonomous College vs University)
  - Year of Establishment
  - Governing Bodies (UGC, AICTE, PCI, JNTUH, SBTET)
  - Flagship Program Offerings
  - Primary Entrance Exams (TS EAMCET, PGECET, ICET, POLYCET, SMRU Test)
  - Estimated Fee Range
  - Shared 120-acre Campus Infrastructure

### 4.5 Interactive Course & Fee Explorer
- **REQ-CALC-01 [M]:** The system shall render individual degree cards displaying course title, duration, entrance examination, eligibility criteria, and tuition fee estimate.
- **REQ-CALC-02 [M]:** The system shall provide a real-time instant text search filter that updates results as the user types.
- **REQ-CALC-03 [M]:** The system shall provide an institution dropdown filter (All, SMEC, SMGI, SMRU) that operates in conjunction with the search query.

### 4.6 Theme Management & Accessibility
- **REQ-UI-01 [M]:** The system shall default to a dark luxury academic theme with high contrast and gold/brass accents.
- **REQ-UI-02 [D]:** The system shall provide an alternate Parchment theme designed for high-contrast reading.
- **REQ-UI-03 [M]:** The user's theme selection shall persist across browser refreshes via `localStorage`.
- **REQ-UI-04 [M]:** The interface shall be fully responsive across viewport widths from 320px to 2560px.

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
- **NFR-PERF-01 (Latency):** Backend query processing (`/api/query`) shall have an average execution time of < 15ms.
- **NFR-PERF-02 (Page Load):** Initial page load (DOMContentLoaded) shall complete in < 1.0 second on standard 4G mobile connections.
- **NFR-PERF-03 (Payload Size):** Total application assets (HTML + CSS + JS) shall remain under 100 KB uncompressed.

### 5.2 Safety and Security Requirements
- **NFR-SEC-01 (Transport Security):** All external traffic must be encrypted over TLS 1.3.
- **NFR-SEC-02 (CORS):** Cross-Origin Resource Sharing (CORS) shall be enabled with configurable headers.
- **NFR-SEC-03 (Input Sanitization):** Client-side message rendering shall parse only authorized markdown syntax and prevent arbitrary `<script>` injection (XSS protection).
- **NFR-SEC-04 (Privacy):** No user queries or personal identifiers shall be recorded without user consent.

### 5.3 Software Quality Attributes
- **Availability:** 99.9% uptime target supported by automated health monitoring (`/healthz`).
- **Reliability:** Built-in client-side fallback query engine ensures functional query resolution even during intermittent network disconnects.
- **Usability:** Intuitive interface requiring zero prior training; primary actions reachable within 1 click.
- **Maintainability:** Modular architecture isolating data (`data/colleges.js`), server endpoints (`server.js`), presentation (`public/index.html`, `public/style.css`), and interaction logic (`public/app.js`).
- **Portability:** Zero OS-specific dependencies. Deploys seamlessly on Render, Railway, AWS EC2, Google Cloud Run, or on-premises Docker containers.

---

## 6. System Architecture & Data Models

### 6.1 Architectural Block Diagram
```
+-----------------------------------------------------------------+
|                       USER BROWSER CLIENT                       |
|                                                                 |
|   +---------------------+   +--------------------------------+  |
|   |  Speech Synthesis   |   |   Web Speech Recognition       |  |
|   |      (TTS Audio)    |   |         (Microphone)           |  |
|   +----------^----------+   +----------------^---------------+  |
|              |                               |                  |
|   +----------+-------------------------------+---------------+  |
|   |                   app.js Controller Layer                |  |
|   |  - View Routing   - DOM Renderer   - Theme Controller    |  |
|   +------------------------------------------^---------------+  |
|                                              |                  |
+----------------------------------------------|------------------+
                                               |
                                     HTTP POST /api/query
                                               |
+----------------------------------------------v------------------+
|                   EXPRESS.JS APPLICATION SERVER                 |
|                                                                 |
|   +----------------------------------------------------------+  |
|   |                      server.js Router                    |  |
|   |  - Static Middleware (`public/`)                         |  |
|   |  - Health Monitoring (`GET /healthz`)                    |  |
|   |  - Query Pipeline (`POST /api/query`)                   |  |
|   +--------------------------^-------------------------------+  |
|                              |                                  |
|   +--------------------------v-------------------------------+  |
|   |             Intent & Keyword Matching Engine             |  |
|   |  - Entity Identifier (SMEC / SMGI / SMRU)                |  |
|   |  - Category Classifier (Fees / Courses / Admissions)     |  |
|   |  - FAQ Scoring Matrix                                    |  |
|   +--------------------------^-------------------------------+  |
|                              |                                  |
|   +--------------------------v-------------------------------+  |
|   |               In-Memory Knowledge Base                   |  |
|   |               `data/colleges.js`                         |  |
|   +----------------------------------------------------------+  |
+-----------------------------------------------------------------+
```

### 6.2 Data Flow Diagram (DFD Level 1)
```
[User Input Query]
       |
       v
[Client Validation (app.js)] 
       |
       +---> [Network Available?]
                 |
                 +---> YES ---> [HTTP POST /api/query] ---> [Match Intent (server.js)]
                 |                                                     |
                 |                                                     v
                 |                                            [Query Knowledge Base]
                 |                                                     |
                 |                                                     v
                 |                                            [Generate Markdown Response]
                 |                                                     |
                 +---> NO  ---> [Run Client Local Engine]              |
                                           |                           |
                                           +<--------------------------+
                                           v
                             [Render Message Bubble]
                                           |
                                           +---> [Speak via TTS (if enabled)]
                                           +---> [Render Suggestion Chips]
```

### 6.3 API Specifications

#### Endpoint 1: Health Check
- **Route:** `GET /healthz`
- **Description:** Verifies service health and uptime for Render monitoring.
- **Response Format:**
```json
{
  "status": "ok",
  "uptime": 124.52,
  "timestamp": "2026-10-28T14:30:00.000Z"
}
```

#### Endpoint 2: Knowledge Retrieval
- **Route:** `GET /api/colleges`
- **Description:** Returns the entire structured knowledge object for offline caching and synchronization.
- **Response Format:**
```json
{
  "campus": { "name": "St Mary's Deshmukhi Campus", "location": "..." },
  "institutes": [ ... ],
  "faqs": [ ... ]
}
```

#### Endpoint 3: Natural Language Query Processor
- **Route:** `POST /api/query`
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "query": "What is the fee for B.Tech at SMEC?",
  "instituteId": "smec"
}
```
- **Response Body:**
```json
{
  "answer": "**St Mary's Engineering College (SMEC) Fee Structure:**\n\n• **B.Tech (All Branches):** Approx ₹1.80 – ₹2.00 Lakhs total...",
  "confidence": 0.94,
  "suggestions": [
    "B.Tech courses list",
    "Admissions process",
    "Hostel accommodation"
  ]
}
```

---

## 7. Appendix

### 7.1 Acronyms and Abbreviations
| Acronym | Definition |
|---|---|
| **AICTE** | All India Council for Technical Education |
| **API** | Application Programming Interface |
| **B.Tech** | Bachelor of Technology |
| **CORS** | Cross-Origin Resource Sharing |
| **EAMCET** | Engineering, Agricultural and Medical Common Entrance Test |
| **ICET** | Integrated Common Entrance Test (for MBA & MCA) |
| **JNTUH** | Jawaharlal Nehru Technological University, Hyderabad |
| **PCI** | Pharmacy Council of India |
| **POLYCET** | Polytechnic Common Entrance Test |
| **REST** | Representational State Transfer |
| **SMEC** | St Mary's Engineering College |
| **SMGI** | St Mary's Group of Institutions |
| **SMRU** | St Mary's Rehabilitation University |
| **SRS** | Software Requirements Specification |
| **STT** | Speech-to-Text |
| **TTS** | Text-to-Speech |
| **UGC** | University Grants Commission |

### 7.2 Requirements Traceability Matrix
| Requirement ID | Description | Source File(s) | Verification Method |
|---|---|---|---|
| **REQ-CHAT-01** | Sub-200ms query processing | `server.js` | Integration Test / Benchmark |
| **REQ-CHAT-02** | FAQ and keyword scoring | `server.js`, `data/colleges.js` | Unit Test |
| **REQ-CHAT-03** | Markdown format rendering | `public/app.js` | UI Inspection |
| **REQ-VOICE-01** | Speech-to-Text Dictation | `public/app.js` | Browser Audio Testing |
| **REQ-VOICE-02** | Text-to-Speech Audio Readout | `public/app.js` | Browser Audio Testing |
| **REQ-DIR-01** | Multi-institution switching | `public/index.html`, `public/app.js` | Functional Test |
| **REQ-COMP-01** | Parameter Comparison Matrix | `public/index.html`, `public/style.css` | UI Visual Test |
| **REQ-CALC-01** | Course & fee filter grid | `public/app.js` | Interactive Filter Test |
| **REQ-UI-01** | Dark and Parchment themes | `public/style.css` | Accessibility Contrast Check |
| **NFR-PERF-01** | High performance response | `server.js` | Latency Audit |
| **NFR-SEC-01** | Health monitoring endpoint | `server.js`, `render.yaml` | HTTP Status Verification |

---
*End of Software Requirements Specification (SRS) Document.*
