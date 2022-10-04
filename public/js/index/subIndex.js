'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

class App extends React.Component {
	constructor(configs) {
		super (configs);
	}
	
	toAuthor() {
		location.href = 'https://b23.tv/vUMYbj';
	}

	render() {
		return (
			<p onClick={this.toAuthor}>😂 😂 😂 😂 😂</p>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));