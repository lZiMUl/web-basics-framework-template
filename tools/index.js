'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Interactive Transfer Station
export default event => new Promise(async callback => callback(await(await fetch('/configs/default.ini')).text()));
