const main = document.querySelector('main');

//event binding
getData();

main.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.parentNode.nodeName !== 'A') return;
	const vidId = e.target.closest('a').getAttribute('href');
	createPop(vidId);
});

document.body.addEventListener('click', (e) => {
	if (e.target.nodeName !== 'SPAN') return;
	removePop(e);
});

//data fetching
async function getData() {
	const key = 'AIzaSyBMYWEfZOCgkS3kcTBkz-shsPAQmfENdZU';
	const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`;

	fetch(url);
	const data = await fetch(url);
	const json = await data.json();
	createList(json.items);
}

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

//creating Pop
function createPop(id) {
	document.body.style.overflow = 'hidden';
	const pop = document.createElement('aside');
	pop.innerHTML = `
    <div class='con'>
      <iframe src='https://www.youtube.com/embed/${id}' frameBorder=0 width='100%' height='100%'>
      </iframe>
    </div>

    <span class='close'>close</span>
  `;

	//기존의 메인 컨텐츠 내용을 유지하면서 새롭게 pop요소를 추가해야 되므로 append메서드 호출
	//append메서드의 인수로는 문자열이 아닌 nodeElement 객체만 들어갈 수 있으므로
	//pop자체를 createElemet로 생성
	document.body.append(pop);

	//promise객체 생성하지 않더라도 setTimeout을 이용해 강제적으로 callstack에서 실행해야 될 코드를 web api에 넘겼다가 콜스택의 마지막 순번으로 등록되도록 처리
	setTimeout(() => document.querySelector('aside').classList.add('on'), 0);
}

//removing Pop
function removePop(e) {
	document.body.style.overflow = 'auto';
	const pop = document.querySelector('aside');
	pop.classList.remove('on');
	setTimeout(() => e.target.closest('aside').remove(), 1000);
}
