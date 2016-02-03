import fs from 'fs-jetpack';
const createRegexFromString = (str) => {
	const regParts = str.match(/^\/(.*?)\/([gim]*)$/);
	let regexp;
	if (regParts) {
		regexp = new RegExp(regParts[1], regParts[2]);
	} else {
		regexp = new RegExp(inputString);
	}
	return regexp;
};

const getOutputFile = file => {
	if (fs.exists(file) !== 'file') {
		throw new TypeError(`Output file doesn't exist`);
	} else {
		return fs.read(file);
	}
};

const getModifiedOutput = (pattern, modifier, output) => {
	const tokenToReplace = pattern.exec(output)[1];
	if (!tokenToReplace) {
		throw new Error('The pattern was not found in the file.');
	} else {
		return output.replace(tokenToReplace, modifier)
	}
};

const rereplace = input => {
	try {
		getOutputFile(input[2]);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}

	const params = {
		pattern: createRegexFromString(input[0]),
		input: fs.read(input[1]),
		output: fs.read(input[2]),
	};

	let modifiedOutput;
	try {
		modifiedOutput = getModifiedOutput(params.pattern, params.input, params.output);
	} catch (e) {
		console.log(e);
		console.exit(1);
	}
	fs.write(input[2], modifiedOutput, { atomic: true });
	console.log(`injected ${input[1]} to ${input[2]}`);
	process.exit(0);
};

export default rereplace;
