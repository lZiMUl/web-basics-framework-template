/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import absolutePath from './path.js'

// Read View File
const getView = (name: string, path = absolutePath('./public/html/')): ReadStream => createReadStream(join(path, `${name}.html`));

// Export View
export default getView;