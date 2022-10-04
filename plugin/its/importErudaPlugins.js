'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

class ImportErudaPlugins {
	constructor(moduleName) {
		this.readMain(moduleName);
	};
	
	async readMain(moduleName) {
		const script = document.createElement('script');
		const { main } = await this.readPackage(moduleName);
		script.setAttribute('src', `/node_modules/eruda-${moduleName}/${main}`);
		script.addEventListener('load', () => eruda.add(eval(`eruda${moduleName.split('').map((value, index) => index === 0? value.toUpperCase(): value).join('')}`)));
		document.head.appendChild(script);
	};
	
	readPackage(moduleName) {
		return new Promise(async callback => callback((await fetch(`/node_modules/eruda-${moduleName}/package.json`)).json()));
	};
};

export default ImportErudaPlugins;