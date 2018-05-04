const baseUrl = 'https://newsapi.org/v2/top-headlines?';
const apiKey = 'b9c8cf1cf6654d4781c581c5e07654d4';
const countryInput = document.querySelector('#country');
let country = countryInput.value || 'ng';
const button = document.querySelector('#selectCountry');
const articlesDiv = document.querySelector('.articles');
let url = `${baseUrl}country=${country}`;
let req = new Request(url);
let articles;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
        console.log('service worker registered!');
    }).catch(function(err) {
        console.log('registration failed with error', err);
    });
}

    fetch(req, {
        headers: new Headers({ 
            'X-Api-Key': `${apiKey}`,
        }),
        mode: 'cors'
    })
    .then(res => res.json())
    .then(data => {
        articles = data.articles; 
        return articles;
    })
    .catch(err => console.error('error:', err));

    function populateNews() {
        if (articles === undefined || null) {
            const errorText = document.createElement('h3');
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error_message');
            let errorMessage = document.createTextNode('Something happened, please refresh your browser!')
            errorText.appendChild(errorMessage);
            errorDiv.appendChild(errorText);
            articlesDiv.appendChild(errorDiv);
            return;
        }

        articles.forEach(article => {
            // create a div for each article and give it a class
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            // create headings for the title and author of each article
            const articleTitle = document.createElement('h3');
            const articleSource = document.createElement('h4');

            //create a time stamp,link and image tag for each content of the article
            const articleTime = document.createElement('h5');
            const articleLink = document.createElement('a');
            const articleImage = document.createElement('img');
            articleImage.classList.add('article_image');
            // get the title, author,time of article, links etc from endpoint
            const articleTitleText = document.createTextNode(article.title);
            const articleSourceCaption = document.createTextNode('source: ')
            const articleSourceText = document.createTextNode(article.source['name']);
            const articleLinkLink = document.createTextNode(article.url);
            const articleLinkText = document.createTextNode('link here');
            const articleImageText = document.createTextNode(article.urlToImage);
            const articleTimeStamp = document.createTextNode(article.publishedAt);

            
            // attach each property to their respective tags
            articleTitle.appendChild(articleTitleText);
            articleSource.appendChild(articleSourceCaption);
            articleSource.appendChild(articleSourceText);
            articleLink.href = articleLinkLink.textContent;
            articleLink.appendChild(articleLinkText);
            articleImage.setAttribute('src', articleImageText.textContent);
            articleImage.setAttribute('alt', articleImageText.textContent);
            articleTime.appendChild(articleTimeStamp);

            const articleDivChildren = [articleImage, articleTitle, articleSource, articleLink, articleTime]
            //attach each tag and their content to the main div;
            articleDivChildren.forEach(child => {
                articleDiv.appendChild(child);
            })

            //attach the div to the articles container
            articlesDiv.appendChild(articleDiv);
        });
    }

    
    setTimeout(populateNews, 	3000);
    
    // filter out headlines by country on click
    button.addEventListener('click', (e) => {
        // prevent the form from submitting on click
        e.preventDefault();
        
        // set new country value
        country = countryInput.value;
        
        // change the url to reflect new country
        url = `${baseUrl}country=${country}`;
        req = new Request(url);
        
        articlesDiv.innerHTML = '';

        //fetch new data
        fetch(req, {
            headers: new Headers({ 
                'X-Api-Key': `${apiKey}`,
            }),
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            articles = data.articles;
            return articles;
        })
        .catch(err => console.error('error:', err));

        setTimeout(populateNews, 3000);
    });

    // window.onload = populateNews;