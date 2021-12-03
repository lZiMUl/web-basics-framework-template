'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

import { log } from 'console';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { getConfig } from './api.js';

const {
	Schema,
	model
} = mongoose;

const template = new Schema({
	nickname: String,
	username: String,
	password: String,
	email: String,
	date: Date
}, {
	versionKey: false
});

// Set Up A Mongodb Server
(async function (username, password, hostname, database) {
	if (username && password && hostname && database) {
		await mongoose.connect(`mongodb+srv://${hostname}/${database}?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			auth: {
				username,
				password
			}
		}, err => {
			if (!err)
			log(chalk.magenta('The MongoDB connection was successful'));
		});
	}
} (getConfig('mongodb', 'username'), getConfig('mongodb', 'password'), getConfig('mongodb', 'hostname'), getConfig('mongodb', 'database')));

// Export Database
export default model('template', template);