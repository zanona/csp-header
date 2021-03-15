#!/usr/bin/env node
import {cosmiconfig} from 'cosmiconfig';
import {getCSP} from './';

cosmiconfig('csp').search().then(result => {
	if (!result) {
		throw new Error('could not find config file');
	}
	const {reportUri, ...presets} = result.config;
	delete presets.false;
	const csp = getCSP({ presets, reportUri });
	process.stdout.write(csp);
}).catch((error) => {
	process.stderr.write(`\x1b[33m[CSP] ${error.message}\x1b[0m\n`);
});
