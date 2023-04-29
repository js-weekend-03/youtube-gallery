const key = 'AIzaSyBMYWEfZOCgkS3kcTBkz-shsPAQmfENdZU';
const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`;
const main = document.querySelector('main');

//미션 - 각 썸네일 클릭시 링크의 기본 기능 막고 href값의 고유 영상 아이디값 콘솔출력
fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.forEach((item) => {
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
	});

//이벤트 위임으로 동적생성된 요소에 이벤트 연결
//이벤트 위임 (event delegate) - 현재 없는 요소에 이벤트를 전달하기 위해 항상 있는 상위 요소에 이벤트를 위임 (이벤트 버블링 활용)
main.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.parentNode.nodeName !== 'A') return;
	const vidId = e.target.closest('a').getAttribute('href');
	console.log(vidId);
});
