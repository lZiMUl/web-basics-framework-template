'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

import { navigatorApiVerify } from './apiVerify.js';

const {
	log,
	info,
	warn,
	error
} = console;

class Alert {
	static list = [];
	static init = true

	constructor({content, title, close}) {
		const [FRAME, DIV, TITLE, TITLEDIV, CONTENT, CONTENTDIV, DONE, Extract] = [this.ce('div'), this.ce('div'), this.ce('h3'), this.ce('div'), this.ce('div'), this.ce('div'), this.ce('button'), this.ce('div')];
		
		this.ssa(FRAME, `position: absolute;
		top: 32.1%;
		left: 12%;
		right: 12%;
		border: 1px solid #000;
		border-radius: 9px;
		font-size: 16px;
		box-shadow: 5.5px 5.5px 13px #006400;
		background-image: linear-gradient(to right, #00FA9A, #7B68EE);`);
		this.ssa(DIV, `height: 192.5px;
		text-align: center;
		border-radius: 8px;`);
		this.ssa(TITLEDIV, `margin-top: 4.5px;
		margin-left: 5px;
		margin-right: 5px;
		border: 1px solid #000;
		border-radius: 5px;`);
		this.ssa(TITLE, `margin: 4.3px 4.3px;
		font-size: 16px;`);
		this.ssa(CONTENTDIV, `height: 118px;
		text-align: center;
		overflow: scroll;
		margin-top: 3px;
		margin-left: 5px;
		margin-right: 5px;
		border:1px solid #000;
		border-radius: 5px;`)
		this.ssa(CONTENT, `margin-top: 8px;
		font-size: 16px;`);
		this.ssa(DONE, `width: 88.5%;
		height: 25px;
		margin-top: 5.5px;
		border-radius: 5px;
		boder-style: solid;
		border-color: red;
		background-image: linear-gradient(to right, #00FA9A, #7B68EE);`);
		TITLE.innerText = title? title: window.location.toString().concat(' Say:');
		CONTENT.innerHTML = content? content: '';
		if (CONTENT.innerHTML) {
			for (let index = 0; index < CONTENT.getElementsByTagName("script").length; index++) {
				const script = this.ce('script');
				script.setAttribute('type', 'text/javascript');
				const subScript = CONTENT.getElementsByTagName("script").item(index);
				if (subScript.src)
				script.src = subScript.src;
				else
				script.innerHTML = subScript.innerHTML;
				document.getElementsByTagName("head").item(0).appendChild(script);
			}
		};
		DONE.innerText = close? close: 'Close';
		DONE.addEventListener('click', event => {
			FRAME.remove();
			this.de();
			new navigatorApiVerify('vibrate', () => navigator.vibrate(200), warn);
		});
		this.ac(TITLEDIV, TITLE);
		this.ac(DIV, TITLEDIV);
		this.ac(CONTENTDIV, CONTENT);
		this.ac(DIV, CONTENTDIV);
		this.ac(DIV, DONE);
		this.ac(FRAME, DIV);
		Alert.list.push(FRAME);
		this.frame = FRAME;
		if (Alert.init) {
			this.de();
			Alert.init = false;
		};
	}
	
	ce(type) {
		return document.createElement(type);
	}
	
	ssa(ele, value) {
		ele.setAttribute('style', value);
	}
	
	ac(ele, doc) {
		ele.appendChild(doc);
	}
	
	de() {
		if (Alert.list.length)
		this.ac(document.body, Alert.list.shift());
	}
	
	addEventListener(event, callback) {
		this.frame.addEventListener(event, event => {
			callback(Object.assign(event, {
				Alert: this.frame
			}));
		}, false);
	}
}

export default Alert;