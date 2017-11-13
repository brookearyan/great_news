// Page Elements

const engadget = document.getElementById('engadget');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const main = document.getElementsByTagName('main')[0];

// News API Data

const apiKey = 'da8f768c619e4244a9dc5a9dd5a799a3';
const engadgetUrl = 'https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=da8f768c619e4244a9dc5a9dd5a799a3';
const recodeUrl = 'https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=da8f768c619e4244a9dc5a9dd5a799a3';
const nytUrl = 'https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=da8f768c619e4244a9dc5a9dd5a799a3';

async function getNews(url) {
	let response = await fetch(url);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0, 5);
	return articlesArray;
}

// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      '   <a href="https://twitter.com/brookearyan" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>';

    main.innerHTML += articleRow;
  });
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      Twitter.postStatus(newsObjects[i].url)
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

engadget.addEventListener('click', function() {
  main.innerHTML = ' ';
		getNews(engadgetUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(newsObjects))
}, false);

recode.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(recodeUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(newsObjects))
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = ' ';
	getNews(nytUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(newsObjects))
}, false);
