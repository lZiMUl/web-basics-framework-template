'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { createReadStream } from 'fs';
import { join } from 'path';

// Read View File
const getView = (name, path) => createReadStream(join(path ?? './public/html/', `${name}.html`));

// Export View
export default getView;