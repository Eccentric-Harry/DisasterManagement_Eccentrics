# 🌍 Real-Time Natural Disaster Management System

An intelligent, real-time disaster monitoring and response system powered by Apache Kafka, BERT-based NLP models, and the MERN stack. This project aims to automate the classification and analysis of social media/web content related to natural disasters to support faster and smarter emergency response.

---

## 🚀 Features

- 🌐 **Real-time data streaming** with Apache Kafka and Zookeeper
- 🧠 **AI-powered classification** using BERT/RoBERTa transformer models
- 💬 **Sentiment analysis** with `nlptown/bert-base-multilingual-uncased-sentiment`
- 🧾 **Structured storage** in MongoDB with disaster metadata
- 💻 **Interactive frontend** built using MERN stack (Next.js)
- 📊 **Visual dashboard** for insights into disaster trends and public sentiment

---

## 🧩 Tech Stack

- **Frontend:** React.js (Next.js), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Models:** Hugging Face Transformers (BERT, RoBERTa, Sentiment Models)
- **Streaming:** Apache Kafka, Zookeeper
- **Containerization:** Docker & Docker Compose (optional)

---

## 🔁 Data Flow

1. **Web Scraping**: Collects real-time social media or web data
2. **Kafka Producer**: Sends raw data into Kafka topics
3. **Kafka Consumer with AI Models**: 
   - Classifies disaster type
   - Performs sentiment analysis
4. **MongoDB Storage**: Saves structured output (`text`, `category`, `date`, `time`, `sentiment`)
5. **Frontend Dashboard**: Visualizes processed data for monitoring and response

---



