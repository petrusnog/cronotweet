# 🐦 CronoTwitter — Automated Twitter Posting

A simple Node.js script that automates daily tweet posting using the Twitter API v2.

## ✨ Features

- Posts tweets once a day with rotating messages
- Randomly appends motivational hashtags
- Attaches a link (e.g. product, blog, or portfolio)
- Dynamically loads a custom footer from `footer.txt`
- Pulls content from external JSON files for modular updates

## 🔧 Requirements

- Node.js 20+
- Twitter Developer account with read/write permissions
- `.env` file with your Twitter credentials

## 🔍 .env Format

```
API_KEY=your-api-key
API_SECRET=your-api-secret
ACCESS_TOKEN=your-access-token
ACCESS_SECRET=your-access-secret
```

## 📦 Files

- `tweets.json` – Your tweet messages
- `hashtags.json` – List of hashtags (no # symbol)
- `links.json` – List of possible URLs to attach
- `footer.txt` – Message footer appended to each tweet

## 🚀 Run

```bash
node bot.js
```

Schedule this with GitHub Actions, cron, or PM2 to automate daily tweets.

---

Built for experimentation, learning and portfolio demonstration.