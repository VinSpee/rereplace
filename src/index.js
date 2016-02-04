import fs from 'fs-jetpack';
const createRegexFromString = (str) => {
	const regParts = str.match(/^\/(.*?)\/([gim]*)$/);
	let regexp;
	if (regParts) {
		regexp = new RegExp(regParts[1], regParts[2]);
	} else {
		regexp = new RegExp(str);
	}
	return regexp;
};

const getFile = file => {
	if (fs.exists(file) !== 'file') {
		throw new Error(`Output file doesn't exist`);
	}
	return fs.read(file);
};

const getModifiedOutput = (pattern, modifier, output) => {
	const tokenToReplace = pattern.exec(output)[1];
	if (!tokenToReplace) {
		throw new Error('The pattern was not found in the file.');
	}
	return output.replace(tokenToReplace, modifier);
};

const rereplace = (input = []) => {
	let inFile;
	let outFile;
	if (!input || input.length !== 3) {
		return '';
	}
	try {
		inFile = getFile(input[1]);
		outFile = getFile(input[2]);
	} catch (e) {
		return e;
	}

	const params = {
		pattern: createRegexFromString(input[0]),
		input: inFile,
		output: outFile,
	};

	let modifiedOutput;
	try {
		modifiedOutput = getModifiedOutput(params.pattern, params.input, params.output);
	} catch (e) {
		throw e;
	}
	fs.write(input[2], modifiedOutput, { atomic: true });
	console.log(modifiedOutput);
	console.log(`injected ${input[1]} to ${input[2]}`);
	return modifiedOutput;
};

export default rereplace;
