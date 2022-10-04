/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { join, resolve } from "path";

// Export Method
export default (args: string): string => join(resolve(), args);