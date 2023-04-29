const key = 'AIzaSyBMYWEfZOCgkS3kcTBkz-shsPAQmfENdZU';
const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`;
const main = document.querySelector('main');

//data fetching
fetch(url)
	.then((data) => data.json())
	.then((json) => createList(json.items));

//creating DOM
function createList(data) {
	let tags = '';

	data.forEach((item) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		tit = tit.length > 50 ? tit.substr(0, 50) + '...' : tit;
		desc = desc.length > 200 ? desc.substr(0, 200) + '...' : desc;

		tags += `
        <article>          
          <a class='pic' href=${item.snippet.resourceId.videoId}>
            <img src=${item.snippet.thumbnails.standard.url} alt=${tit} />
          </a>

          <div class='con'>
            <h2>${tit}</h2>
            <p>${desc}</p>
            <span>${item.snippet.publishedAt.split('T')[0]}</span>
          </div>
        </article>
      `;
	});

	//동적으로 DOM이 생성되는 시점
	main.innerHTML = tags;
}

//binding Event
main.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.parentNode.nodeName !== 'A') return;
	const vidId = e.target.closest('a').getAttribute('href');
	console.log(vidId);
});
