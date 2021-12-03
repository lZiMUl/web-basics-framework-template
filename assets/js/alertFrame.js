(() => setTimeout(() => {
	document.getElementById('test').addEventListener('click', () => {
		alert('Look, I\'m not lying to you, am I.');
	})
}, 1000))();