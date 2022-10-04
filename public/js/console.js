'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Dependencies
import '../../node_modules/eruda/eruda.js';
import ImportErudaPlugins from '../../plugin/its/importErudaPlugins.js';

// Use Plugins
new ImportErudaPlugins('fps');
new ImportErudaPlugins('features');
new ImportErudaPlugins('timing');
new ImportErudaPlugins('memory');
new ImportErudaPlugins('code');
new ImportErudaPlugins('benchmark');
new ImportErudaPlugins('geolocation');
new ImportErudaPlugins('dom');
new ImportErudaPlugins('orientation');
new ImportErudaPlugins('touches');

// Initialization
eruda.init();