# 🗳️ Electoral Roll Voter Data Extractor (OCR for Tamil & English)

[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/flask-3.0-green.svg)](https://flask.palletsprojects.com/)
[![Tesseract OCR](https://img.shields.io/badge/Tesseract-OCR-orange.svg)](https://github.com/tesseract-ocr/tesseract)
[![License](https://img.shields.io/badge/license-MIT-purple.svg)](LICENSE)

An automated document processing system designed to parse, extract, and structure voter records from bilingual (Tamil & English) electoral roll PDF scans. Using custom computer vision thresholding, PyTesseract OCR, and regular expression models, it converts complex table layouts into a structured SQLite relational database.

---

## 🚀 Key Features

- **High-Capacity File Processing**: Handles large voter database documents (configured up to 100MB PDF uploads).
- **Dual-Language OCR Extraction**: Powered by pytesseract with custom language training configurations to recognize Tamil script and English text concurrently.
- **Robust Table Grids Detection**: Employs PyMuPDF (`fitz`) and image threshold transformations to isolate voter information card cells.
- **Intelligent Regex Parser**: Custom regular expression engines extract:
  - Voter Serial Number
  - EPIC Number (Voter Card ID)
  - Voter's Name
  - Father's/Husband's Name
  - House Number
  - Age & Gender
- **Relational Storage Logging**: Automatically creates and commits structured rows to a local SQLite database (`voters.db`).
- **Debugging Suites**: Includes layout analysis tools (`debug_layout.py`) and high-res contrast modifiers (`debug_highres.py`) to fine-tune extraction results on poor-quality print pages.

---

## 🛠️ Technology Stack

- **Backend API**: Python, Flask, Flask-CORS
- **Document Processing**: PyMuPDF (`fitz`), Pillow (`PIL`), NumPy
- **OCR Engine**: Tesseract OCR, Pytesseract wrapper
- **Database**: SQLite3
- **Frontend UI**: HTML5, CSS3, Vanilla JavaScript

---

## 📂 Project Directory Structure

```
├── app.py                  # Core Flask server hosting upload & extraction APIs
├── test_extract.py         # Sandbox script to test OCR extractions on single pages
├── ocr_experiment.py       # CV image thresholding and language tests
├── debug_layout.py         # Visualizes localized bounding boxes of extracted text
├── debug_regex.py          # Validates regular expressions on voter cards text
├── index.html              # Frontend portal to upload files and monitor streams
├── main.js                 # AJAX request scripts and progress displays
├── style.css               # Clean dashboard styles
└── voters.db               # SQLite database (auto-generated)
```

---

## ⚙️ Installation & Configuration

### Prerequisites
1. **Python 3.8+** installed on your system.
2. **Tesseract OCR Engine** installed.
   - For Windows: Download the installer and ensure the binary path is configured in `app.py` or added to system environment variables.
   - For Linux: `sudo apt-get install tesseract-ocr tesseract-ocr-tam` (installing both English and Tamil language packs).

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ATHITHYAN-S-developer/OCR-for-tamil-and-english-.git
   cd OCR-for-tamil-and-english-
   ```

2. **Set Up Python Virtual Environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   # If requirements.txt is not present:
   pip install Flask flask-cors pymupdf pytesseract pillow numpy
   ```

4. **Verify Tesseract Path:**
   Open `app.py` and ensure the `TESSERACT_PATH` variable points to your local `tesseract.exe` location.

---

## 💻 Running the Application

1. **Start the Flask Backend Server:**
   ```bash
   python app.py
   ```
   *The API will start running on `http://127.0.0.1:5000`.*

2. **Open the User Interface:**
   Simply double-click `index.html` to open it in a browser, or serve it locally.

3. **How to Process a Document:**
   1. Click **Choose File** and upload your bilingual Electoral Roll PDF.
   2. Click **Start Extraction**.
   3. The progress panel will display real-time text logs.
   4. Extracted entries will be saved to `voters.db`.

---

## 📝 SQLite Database Schema

Voters are registered in the `voters` table with the following attributes:

| Column Name | Data Type | Description |
|---|---|---|
| `id` | INTEGER | Auto-incrementing primary key |
| `serial_no` | INTEGER | Voter sequence serial number |
| `epic_number` | TEXT | Unique EPIC card identifier code |
| `name` | TEXT | Name of the voter |
| `father_name` | TEXT | Father's or Husband's name |
| `house_no` | TEXT | Registered residential house number |
| `age` | TEXT | Voter's age |
| `gender` | TEXT | Voter's gender (Male/Female/Other) |
| `source_file` | TEXT | Name of the processed source document |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements, such as enhancing OCR accuracy or adding multi-threading support for faster processing.

---

## 📄 License

This project is licensed under the MIT License.
