# 📊 Customer Spend Segmentation Dashboard

[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.30+-red.svg)](https://streamlit.io/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E.svg)](https://scikit-learn.org/)
[![Pandas](https://img.shields.io/badge/pandas-150458.svg)](https://pandas.pydata.org/)

An interactive data science dashboard built with Streamlit and Scikit-Learn that implements Unsupervised Machine Learning (K-Means Clustering) to segment customers based on annual incomes and spending indexes. This application serves as a business intelligence tool to extract custom consumer profiles and optimize marketing targets.

---

## 🎯 Key Features

- **Interactive Sidebar Filtering**: Easily filter records by multiselecting annual income levels.
- **Automated Caching**: Utilizes `@st.cache_data` to ensure dataset reloads are fast and do not lag on re-renders.
- **K-Means Clustering Engine**: Partitions raw shopper statistics into optimized clusters based on income vs. spend patterns.
- **Responsive Visual Graphs**: Displays clear data plots (Scatter plots) mapping out consumer target segments.
- **Data Tables Explorer**: Direct interactive dataframe viewer displaying raw and grouped customer datasets.

---

## 🛠️ Technology Stack

- **Framework**: Streamlit
- **Machine Learning**: Scikit-Learn (K-Means Clustering)
- **Data Manipulation**: Pandas, NumPy
- **Development Environment**: VS Code / DevContainers supported

---

## 📂 Project Directory Structure

```
├── app.py                 # Main Streamlit application file
├── dataset.csv            # Target customer transaction log dataset
├── README.md              # Project documentation
└── .devcontainer/         # DevContainer settings for containerized execution
    └── devcontainer.json
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Python 3.8+ installed on your system.

### Steps to Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ATHITHYAN-S-developer/streamlit-app.git
   cd streamlit-app
   ```

2. **Set Up Python Virtual Environment:**
   ```bash
   python -m venv venv
   # Activate on Windows:
   venv\Scripts\activate
   # Activate on macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Required Libraries:**
   ```bash
   pip install streamlit pandas scikit-learn numpy
   ```

4. **Launch the Streamlit App:**
   ```bash
   streamlit run app.py
   ```

5. **Interact with the App:**
   - The application will automatically launch in your default web browser at `http://localhost:8501`.
   - Use the sidebar multiselect menu to select income levels to run clustering segmentation metrics.

---

## 📈 Dataset Columns Format

The clustering model requires a `dataset.csv` with at least the following column headers:
- `INCOME`: The annual income of the customer (used as X-axis coordinate).
- `SPEND`: The spending score or index rating of the customer (used as Y-axis coordinate).

---

## 🤝 Contributing

Contributions, feedback, and enhancements (such as testing other clustering algorithms like DBSCAN or Hierarchical clustering) are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.
