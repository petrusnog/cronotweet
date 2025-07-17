const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const tweetsPath = './tweets.json';
let tweets = require(tweetsPath);
const hashtags = require('./hashtags.json');
const links = require('./links.json');

// Verifica tweets disponíveis
if (tweets.length === 0) {
  console.log('⚠️ No more tweets available.');
  process.exit(0);
}

// Seleciona aleatoriamente um tweet
const tweetIndex = Math.floor(Math.random() * tweets.length);
const rawTweet = tweets[tweetIndex];

// Seleciona hashtags e links aleatórios
const selectedHashtags = hashtags
  .sort(() => 0.5 - Math.random())
  .slice(0, Math.floor(Math.random() * 3) + 3) // entre 3 e 5
  .map(tag => `#${tag}`)
  .join(' ');

const selectedLink = links[Math.floor(Math.random() * links.length)];

// Seleciona uma imagem aleatória da pasta /images
const imagesPath = path.join(__dirname, 'images');
const imageFiles = fs.readdirSync(imagesPath).filter(file => /\.(jpe?g|png)$/i.test(file));

if (imageFiles.length === 0) {
  console.log('No images found in /images folder.');
  process.exit(0);
}

const selectedImage = path.join(imagesPath, imageFiles[Math.floor(Math.random() * imageFiles.length)]);

// Monta o tweet final
const footer = `\n\n${fs.readFileSync('footer.txt', 'utf8').trim()}`;
const tweet = `${rawTweet}${footer}\n 🔗 ${selectedLink}\n${selectedHashtags}`;

// Autenticação
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

(async () => {
  try {
    // Upload da imagem
    const mediaId = await client.v1.uploadMedia(selectedImage);

    // Envia o tweet com imagem
    await client.v2.tweet({
      text: tweet,
      media: { media_ids: [mediaId] }
    });

    console.log('✅ Tweeted with image:\n', tweet);
    console.log('📷 Image used:', selectedImage);

    // Remove tweet usado
    tweets.splice(tweetIndex, 1);
    fs.writeFileSync(tweetsPath, JSON.stringify(tweets, null, 2));
    console.log(`🧪 Remaining tweets: ${tweets.length}`);
  } catch (err) {
    console.error('❌ Error tweeting:', err);
  }
})();
