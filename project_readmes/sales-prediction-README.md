# 🎯 Digital Advertisement Conversion Classifier (Sales Predictor)

[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E.svg)](https://scikit-learn.org/)
[![Pandas](https://img.shields.io/badge/pandas-150458.svg)](https://pandas.pydata.org/)
[![Jupyter Notebook](https://img.shields.io/badge/Jupyter-Notebook-orange.svg)](https://jupyter.org/)

A machine learning classification pipeline trained on digital advertisement demographics. It predicts whether a prospective consumer converts (purchases a product) based on their age and estimated salary characteristics, achieving a classification accuracy score of 80% on test splits.

---

## 🚀 Key Features

- **Binary Classification Pipeline**: Employs Scikit-Learn's **Logistic Regression** model as the core classifier.
- **Robust Feature Scaling**: Uses `StandardScaler` to normalize age and salary features, improving gradient descent convergence rates.
- **Detailed Evaluation Metrics**: Calculates accuracy classification ratings and prints predicted outputs against real historical values.
- **Interactive Prediction Function**: Sandbox code cell allows engineers to input new customer age and salary variables to test classification predictions in real-time.

---

## 🛠️ Technology Stack

- **Core Language**: Python
- **Machine Learning**: Scikit-Learn (Classification, Preprocessing, Splits)
- **Data Wrangling**: Pandas, NumPy
- **Interactive Environment**: Jupyter Notebook / Google Colab

---

## 📂 Project Directory Structure

```
├── DigitalAd_dataset.csv  # Customer demographic dataset (Age, Salary, Purchased)
├── Untitled0.ipynb        # Jupyter Notebook containing code, plots, and models
└── README.md              # Project documentation
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Python 3.8+ installed.
- Jupyter Notebook or JupyterLab installed.

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ATHITHYAN-S-developer/sales-prediction-using-machine-learning.git
   cd sales-prediction-using-machine-learning
   ```

2. **Set Up Python Virtual Environment:**
   ```bash
   python -m venv venv
   # Activate on Windows:
   venv\Scripts\activate
   # Activate on macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install notebook pandas scikit-learn numpy
   ```

4. **Launch Jupyter:**
   ```bash
   jupyter notebook
   ```
   *Select `Untitled0.ipynb` to open and run the model.*

---

## 🧠 ML Model Details

1. **Split Ratio**: The dataset is divided into training (80%) and testing (20%) splits.
2. **Preprocessing**: Age and Salary features are scaled to zero mean and unit variance.
3. **Training Model**: Logistic Regression classifier.
4. **Accuracy Score**: The model classifies target labels with **80% accuracy** on testing data.

---

## 🤝 Contributing

Contributions and modifications (such as implementing Random Forest or Support Vector Machine models to compare accuracy gains) are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.
