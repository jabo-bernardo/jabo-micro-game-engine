const docsContent = "(nav-grp) / Hello Micro Engine! (end) (nav-child) // intro-to-engine.html Introduction (end) // installengine.html Installing The Engine (end) // setupengine.html Setting up (end) // usinglib.html Using Libraries (end) (nav-child-end) (nav-grp-end) (nav-grp) / Built-in Libraries (end) (nav-child) // introlibrary.html Introduction (end) (nav-child-end) (nav-grp-end)";

let goTo = link => {
	location.href = link;
}

let read = content => {
	nav = document.querySelector('.navigator');
	cont = content.split(' ');
	output = '';
	for (var i = 0; i < cont.length; i++) {
		if(cont[i] == '(nav-grp)') {
			output += '<div class="nav-group">';
		}
		if (cont[i] == '/') {
			j = i + 1;
			out = ''
			while(cont[j] != '(end)') {
				out += cont[j] + ' ';
				j++;
			}
			output += '<p class="headline">' + out + '</p>';
			i = j;
		}
		if(cont[i] == '(nav-child)')
			output += '<div class="nav-group-child">';
		if (cont[i] == '//') {
			link = cont[i+1];
			j = i + 2;
			out = ''
			while(cont[j] != '(end)') {
				out += cont[j] + ' ';
				j++;
			}
			output += '<a href="' + link + '" class="child">' + out + '</a>';
			i = j;
		}
		if(cont[i] == '(nav-child-end)') {
			output += '</div>';
		}
		if(cont[i] == '(nav-grp-end)') {
			output += '</div>';
		}
	}
	div = document.createElement('div');
	div.innerHTML = output;
	nav.appendChild(div);
}

read(docsContent);