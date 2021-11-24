(() => setTimeout(() => {
	document.getElementById('test').addEventListener('click', ({ target }) => {
		alert('Look, I\'m not lying to you, am I.')
	})
}, 1000))();