'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

class App extends React.Component {
	constructor(configs) {
		super (configs);
		this.state = {
			value: 2,
			defaults: 2
		};
		this.add = this.add.bind(this);
	}

	add() {
		if(this.state.value < 0) {
			this.state.value = this.state.defaults;
		};
		
		this.state.value += Math.floor(this.state.value <= 1000? Math.random() * this.state.value: -Math.sqrt(this.state.value * new Date().getTime().toString().substring(0, new Array(1, 2, 3, 4, 5, 6, 7)[Math.random() * 6])));
		this.setState({
			value: this.state.value
		});
	}
	
	render() {
		return (
			<div>
				<h2>{this.state.value}</h2>
				<p onClick={this.add}>Click me of add up number value</p>
				<br/>
				<a href="/">gotoback</a>
				<br/>
				<a href="/api">Watch the html-json-highlight</a>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));