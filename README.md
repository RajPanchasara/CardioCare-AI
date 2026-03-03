<h1 align="center">
  <img src="https://img.shields.io/badge/CardioCare-AI-red?style=for-the-badge&logo=heart&logoColor=white" alt="CardioCare-AI" />
</h1>

<p align="center">
  <b>AI-Driven Cardiovascular Risk Prediction Platform</b><br/>
  Merging advanced Machine Learning with compassionate healthcare to protect your most vital organ.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/Flask-3.0-blue?style=flat-square&logo=flask" />
  <img src="https://img.shields.io/badge/Python-3.10+-yellow?style=flat-square&logo=python" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Scikit--Learn-GBM-orange?style=flat-square&logo=scikitlearn" />
  <img src="https://img.shields.io/badge/Deployed-Render%20%2B%20Vercel-success?style=flat-square" />
</p>

<p align="center">
  <a href="https://cardio-care-ai-18.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-cardio--care--ai--18.vercel.app-red?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [ML Model](#-ml-model)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🫀 Overview

**CardioCare-AI** is a full-stack web application that predicts cardiovascular disease risk using a trained **Gradient Boosting Machine (GBM)** model. Users input clinical features such as age, blood pressure, cholesterol, and lifestyle habits to receive an instant, probability-based risk assessment along with personalized health tips and feature explainability.

The platform is designed with **ethical AI principles** — providing a transparent risk profile, not a diagnosis — and is deployed as a production-grade system with rate limiting, audit logging, CORS, and security headers.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔮 **AI Risk Prediction** | Gradient Boosting model with 73% accuracy trained on 70,000+ patient records |
| 📊 **3-Tier Risk Classification** | Low / Moderate / High risk based on probability thresholds |
| 💡 **Personalized Health Tips** | Dynamic recommendations based on individual inputs (BMI, BP, lifestyle) |
| 🧪 **Feature Explainability** | Feature importance scores shown per prediction |
| 📈 **Analytics Dashboard** | ROC Curve, Confusion Matrix, Classification Report, Correlation Heatmap |
| 🏥 **Prediction History** | Paginated history log with per-record detail view and deletion |
| 📉 **System Stats** | Live visit counts, prediction trends, daily breakdown charts |
| 🛡️ **Security & Rate Limiting** | Flask-Talisman (security headers), Flask-Limiter (30 req/min on predict), CORS |
| 🪵 **Audit Logging** | 3 rotating log files: `app.log`, `error.log`, `prediction.log` |
| 🔄 **Model Hot-Reload** | Reload the model at runtime via `POST /api/model/reload` without restart |
| 📱 **Responsive UI** | Mobile sidebar, bottom navigation, and adaptive layouts |
| 🌙 **Dark / Light Mode** | Theme toggle via ThemeProvider |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14 | React framework with App Router |
| TypeScript | 5 | Type-safe frontend code |
| Tailwind CSS | 3 | Utility-first styling |
| Chart.js + react-chartjs-2 | 4 | Analytics charts (ROC, Confusion Matrix, etc.) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Flask | 3.0 | Python REST API |
| Flask-SQLAlchemy | 3.1.1 | ORM + SQLite/PostgreSQL |
| Scikit-Learn | 1.4.2 | GBM model + preprocessing |
| Flask-Talisman | 1.1.0 | Security headers (CSP, HSTS) |
| Flask-Limiter | 3.5.0 | Rate limiting |
| Flask-CORS | 4.0.1 | Cross-origin request handling |
| Flask-Compress | 1.14 | Response compression |
| Gunicorn | 22.0 | Production WSGI server |
| psutil | 5.9.8 | System monitoring |

---

## 📁 Project Structure

```
CardioCare-AI/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing / home page
│   ├── predict/page.tsx        # Prediction form & results
│   ├── analytics/page.tsx      # Analytics dashboard
│   ├── model/page.tsx          # Model transparency info
│   ├── about/page.tsx          # About page
│   ├── guidance/page.tsx       # Health guidance
│   ├── caution/page.tsx        # Disclaimer page
│   ├── contact/page.tsx        # Contact page
│   ├── layout.tsx              # Root layout (AppShell)
│   └── globals.css             # Global styles & design tokens
│
├── components/                 # Reusable React components
│   ├── AppShell.tsx            # Layout wrapper (sidebar + navbar)
│   ├── Navbar.tsx              # Desktop navigation
│   ├── MobileSidebar.tsx       # Mobile slide-out menu
│   ├── MobileFooter.tsx        # Mobile bottom navigation bar
│   ├── MobileHeader.tsx        # Mobile top header
│   ├── StatsCounter.tsx        # Animated stats counters
│   ├── ThemeProvider.tsx       # Dark/light mode context
│   └── analytics/             # Chart components
│       ├── BodyAnalysis.tsx    # User body metrics visualization
│       ├── ClassificationReport.tsx
│       ├── ConfusionMatrix.tsx
│       ├── CorrelationHeatmap.tsx
│       ├── HealthRadar.tsx
│       ├── ModelMetrics.tsx
│       ├── RocCurve.tsx
│       ├── SeverityMonitor.tsx
│       └── VitalsCards.tsx
│
├── backend/                    # Flask ML API
│   ├── app.py                  # Main Flask application (all endpoints)
│   ├── config.py               # Centralized configuration
│   ├── evaluate_and_report.py  # Offline model evaluation script
│   ├── verify_db.py            # DB verification utility
│   ├── model.pkl               # Trained GBM model (joblib)
│   ├── scaler.pkl              # StandardScaler (joblib)
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile                # Render/Heroku process config
│   ├── .env                    # Backend environment variables
│   └── instance/cardio.db     # SQLite database (auto-created)
│
├── utils/                      # Shared frontend utilities
├── public/                     # Static assets
├── package.json                # Node.js dependencies
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🤖 ML Model

### Model Details
| Property | Value |
|---|---|
| **Algorithm** | Gradient Boosting Classifier (GBM) |
| **Training Dataset** | Cardiovascular Disease Dataset (`cardio_train.csv`) |
| **Dataset Size** | 70,000 patient records |
| **Test Split** | 30% (21,000 samples) |
| **Accuracy** | ~73% |
| **AUC-ROC** | ~0.80 |
| **Model Version** | v1.0 |

### Input Features (11 clinical features)
| Feature | Type | Range / Values | Description |
|---|---|---|---|
| `age` | int | 18 – 100 | Age in years |
| `gender` | int | 1 (Female), 2 (Male) | Biological sex |
| `height` | int | 120 – 250 cm | Height |
| `weight` | float | 30 – 300 kg | Weight |
| `ap_hi` | int | 60 – 250 mmHg | Systolic blood pressure |
| `ap_lo` | int | 30 – 200 mmHg | Diastolic blood pressure |
| `cholesterol` | int | 1 (Normal), 2 (Above Normal), 3 (Well Above Normal) | Cholesterol level |
| `gluc` | int | 1 (Normal), 2 (Above Normal), 3 (Well Above Normal) | Glucose level |
| `smoke` | int | 0 (No), 1 (Yes) | Smoking status |
| `alco` | int | 0 (No), 1 (Yes) | Alcohol intake |
| `active` | int | 0 (No), 1 (Yes) | Physical activity |

### Risk Thresholds
| Risk Level | Probability |
|---|---|
| 🟢 Low Risk | < 40% |
| 🟡 Moderate Risk | 40% – 65% |
| 🔴 High Risk | ≥ 65% |

---

## 📡 API Reference

Base URL: `https://cardiocare-backend.onrender.com` (production) or `http://localhost:5000` (local)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API info & available endpoints |
| GET | `/api/health` | Health check (model status, uptime) |
| POST | `/api/predict` | Run a cardiovascular risk prediction |
| GET | `/api/history` | Paginated prediction history |
| GET | `/api/history/<id>` | Single prediction detail |
| DELETE | `/api/history/<id>` | Delete a prediction record |
| GET | `/api/stats` | Prediction statistics & daily trends |
| GET | `/api/metrics` | Model performance metrics (ROC, CM, report) |
| GET | `/api/system` | CPU, memory, disk, uptime monitoring |
| POST | `/api/explain` | Feature importance for a given input |
| POST | `/api/model/reload` | Hot-reload the model from disk |

### Example: Prediction Request

```bash
curl -X POST https://cardiocare-backend.onrender.com/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "gender": 2,
    "height": 175,
    "weight": 80,
    "ap_hi": 130,
    "ap_lo": 85,
    "cholesterol": 2,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  }'
```

### Example: Prediction Response

```json
{
  "status": "success",
  "result": "High Risk",
  "risk_level": "Moderate Risk",
  "probability": 52.34,
  "bmi": 26.1,
  "bmi_category": "Overweight",
  "tips": [
    { "icon": "⚖️", "text": "Your BMI is 26.1 (Overweight). Weight management can improve heart health." },
    { "icon": "💓", "text": "Blood pressure is elevated. Monitor dietary sodium and consult a doctor." }
  ],
  "feature_importance": [...],
  "model_version": "v1.0",
  "response_time_ms": 12.4
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.10+
- **Git**

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create the .env file (see Environment Variables section)
cp .env.example .env   # or create manually

# 5. Run the development server
python app.py
```

The backend will start at `http://localhost:5000`.

---

### Frontend Setup

```bash
# 1. From the root of the project
npm install

# 2. Create the .env.local file
# Set NEXT_PUBLIC_API_URL to your backend URL

# 3. Start the development server
npm run dev
```

The frontend will start at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
SECRET_KEY=your_secure_secret_key_here
DATABASE_URL=sqlite:///instance/cardio.db   # or PostgreSQL URL
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

> **Generate a secret key:**
> ```bash
> python -c "import secrets; print(secrets.token_hex(32))"
> ```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000   # or your Render backend URL
```

---

## ☁️ Deployment

### Backend → [Render](https://render.com)

1. Push `backend/` to a GitHub repo (or the same repo)
2. Create a new **Web Service** on Render
3. Set **Build Command**: `pip install -r requirements.txt`
4. Set **Start Command**: `gunicorn app:app` (as in `Procfile`)
5. Add environment variables: `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_ORIGINS`

### Frontend → [Vercel](https://vercel.com)

1. Import the repository to Vercel
2. Set **Framework Preset**: Next.js
3. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com`
4. Deploy

---

## 📸 Screenshots

> _Screenshots of the Prediction Page, Analytics Dashboard, and History view can be added here._

---

## ⚠️ Disclaimer

CardioCare-AI is an **educational and research tool** and is **not a substitute for professional medical advice, diagnosis, or treatment**. Always consult a qualified healthcare provider for medical decisions.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Made with ❤️ for cardiovascular health awareness.<br/>
  <b>CardioCare-AI &mdash; Designed to Care, Built to Predict.</b>
</p>
