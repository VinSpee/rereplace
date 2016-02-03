#!/usr/bin/env node

import meow from 'meow';
import rereplace from './index.js';

// const config = require('../package.json');

const cli = meow(`
		Usage
			$ rereplace '/regex(as|a|string)/' ./infile ./outfile
		Options
			-v, --version  Shows current version
			-i, --info     Shows info about this module
		Examples
			$ rereplace /^foo/ bar.html dest.html
`);


rereplace(cli.input, cli.flags);
