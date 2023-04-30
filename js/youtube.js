class Youtube {
	constructor(selector, option) {
		const def_opt = {
			playlistId: 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu',
			num: 4,
		};
		const result_opt = { ...def_opt, ...option };
		this.main = document.querySelector(selector);
		this.playlistId = result_opt.playlistId;
		this.num = result_opt.num;
		this.getData();

		this.main.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.parentNode.nodeName !== 'A') return;
			const vidId = e.target.closest('a').getAttribute('href');
			this.createPop(vidId);
		});

		document.body.addEventListener('click', (e) => {
			if (e.target.nodeName !== 'SPAN') return;
			this.removePop(e);
		});
	}
	async getData() {
		const key = 'AIzaSyBMYWEfZOCgkS3kcTBkz-shsPAQmfENdZU';
		const list = this.playlistId;
		const num = this.num;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`;

		fetch(url);
		const data = await fetch(url);
		const json = await data.json();
		this.createList(json.items);
	}
	createList(data) {
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
		this.main.innerHTML = tags;
	}
	createPop(id) {
		document.body.style.overflow = 'hidden';
		const pop = document.createElement('aside');
		pop.innerHTML = `
    <div class='con'>
      <iframe src='https://www.youtube.com/embed/${id}' frameBorder=0 width='100%' height='100%'>
      </iframe>
    </div>

    <span class='close'>close</span>
  `;
		document.body.append(pop);
		setTimeout(() => document.querySelector('aside').classList.add('on'), 0);
	}
	removePop(e) {
		document.body.style.overflow = 'auto';
		const pop = document.querySelector('aside');
		pop.classList.remove('on');
		setTimeout(() => e.target.closest('aside').remove(), 1000);
	}
}
