/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Interactive Transfer Station
export default (viewName: string): Promise<string> => new Promise(async callback => callback(await(await fetch(`/view/${viewName}.html`)).text()));
