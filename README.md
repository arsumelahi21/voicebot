
# Tasca do Miradouro – AI Restaurant Voicebot

AI-powered restaurant voicebot built for Tasca do Miradouro, Lisboa.

The assistant handles:
- Table reservations
- Availability validation
- Alternative slot suggestions
- Menu recommendations
- FAQ responses
- English and Portuguese conversations

The solution uses a mock booking layer designed to be easily replaceable with a live ResOS API integration in future production deployments.

---

# Features

- Reservation handling with availability validation
- 30-minute booking slot management
- Closed-day validation
- Maximum party size enforcement
- Fully booked Saturday evening simulation
- Alternative booking slot suggestions
- Contextual menu recommendations
- Portuguese and English conversation support
- FAQ handling
- Service-based backend architecture

---


# Setup

## Clone Repository

```bash
git clone https://github.com/arsumelahi21/voicebot.git

cd voicebot
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root:

```env
PORT=4000
```

---

# Run Development Server

```bash
npm run dev
```

---

# Deployment

The backend is deployed on Render.

The voice assistant is configured through Vapi and communicates with the backend through public HTTPS endpoints.

---

# API Endpoints

## Health Check

```http
GET /health
```

---

## Create Booking

```http
POST /booking
```

---

## Check Availability

```http
POST /booking/check
```

---

## Menu Recommendations

```http
POST /menu/recommendations
```

---

## Full Menu

```http
GET /menu
```

---

## Restaurant FAQs

```http
GET /faq
```

---

# Booking Logic

The availability system:

* Validates operating hours
* Blocks bookings outside valid slots
* Prevents duplicate bookings
* Simulates fully booked Saturday evening slots
* Suggests nearest alternative slots automatically

The mock booking layer is isolated behind services to allow future replacement with a live ResOS API integration without modifying conversation logic.

---

# Recommendation Logic

The assistant provides contextual recommendations based on:

* Lunch hours
* Evening bookings
* Weekend specials
* Monthly specials

Menu recommendations are implemented using a category-driven structure for scalability and maintainability.

---

# Multilingual Support

The assistant supports:

* English
* Portuguese

The conversation language adapts automatically based on caller input.

---

# Live Demo

The assistant is accessible through a Vapi web-call interface.

---

# Future Improvements

* ResOS API integration
* Persistent database storage
* Admin dashboard
* Dynamic menu CMS
* Reservation analytics
* Customer history tracking
