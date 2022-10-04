/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

import { readFileSync } from 'fs';
import { parse } from 'ini';
import absolutePath from './tool/path.js';

interface GetSecurityLicense {
	key: string;
	cert: string;
}

interface Config {
	[key: string]: any;
}

// Read Configuration Data
function getConfig(index: string, key: string, file?: string): (Config | null) {
	return parse(readFileSync(absolutePath(`./config/${file ? file : 'default'}.ini`), 'utf-8'))[index][key] ?? null;
}

// Verify The Certificate
const getSecurityLicense: GetSecurityLicense = {
	key: readFileSync(absolutePath('./config/server.key'), 'utf-8'),
	cert: readFileSync(absolutePath('./config/server.cert'), 'utf-8')
};

// Export Api
export type { Config };
export {
	getConfig,
	getSecurityLicense
};

