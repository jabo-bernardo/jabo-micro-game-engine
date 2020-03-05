var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("top_bar").style.top = "0";
  } else {
    document.getElementById("top_bar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

const docsContent = "(nav-grp) / Getting Started (end) (nav-child) // index.html Introduction (end) (nav-child) // installing.html Installing the Library (end) (nav-child) // setup.html Setting up JMGE (end) (nav-child-end) (nav-group-end)";

let read = () => {
	nav = document.querySelector('.navigation');
	cont = docsContent.split(' ');
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