'use strict';

// Import Basic Dependencies
import { createReadStream } from 'fs';
import { join } from 'path';

// Read View File
const getView = name => createReadStream(join('./public/html/', `${name}.html`));

// Export View
export default getView;