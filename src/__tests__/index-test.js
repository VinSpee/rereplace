import test from 'tape';
import rereplace from '../index.js';
import fs from 'fs-jetpack';

test('rereplace', t => {
	t.test('type', assert => {
		const expected = 'function';
		const actual = typeof rereplace;
		assert.equal(actual, expected,
			`it's a function`
		);
		assert.end();
	});
	t.test('return type', assert => {
		const expected = 'string';
		const actual = typeof rereplace();
		assert.equal(actual, expected,
			`given no arguments, returns an empty string`
		);
		assert.end();
	});
	t.test('insufficient parameters', assert => {
		const oneexpected = '';
		const oneactual = rereplace('/dude/');
		assert.equal(oneactual, oneexpected,
			`given 1 argument, returns an empty string`
		);
		const twoexpected = '';
		const twoactual = rereplace('/dude/', 'foo');
		assert.equal(twoactual, twoexpected,
			`given 2 arguments, returns an empty string`
		);
		assert.end();
	});
	t.test('insufficient array params', assert => {
		const oneexpected = '';
		const oneactual = rereplace([]);
		assert.equal(oneactual, oneexpected,
			`given an empty array, returns an empty string`
		);
		const twoexpected = '';
		const twoactual = rereplace(['/dude/']);
		assert.equal(twoactual, twoexpected,
			`given 1 array argument, returns an empty string`
		);
		const threeexpected = '';
		const threeactual = rereplace(['/dude/', 'foo']);
		assert.equal(threeactual, threeexpected,
			`given 2 array argument, returns an empty string`
		);
		assert.end();
	});
	t.test('file existence', assert => {
		const outactual = rereplace([
			'/dude([^]+)dude/',
			'./src/__tests__/doesntexist',
			'./src/__tests__/dudefoodude',
		]);

		const inactual = rereplace([
			'/dude([^]+)dude/',
			'./src/__tests__/dudefoodude',
			'./src/__tests__/doesntexist',
		]);

		assert.throws(
			() => {
				inactual();
			},
			'throws when input file doesnt exist'
		);
		assert.throws(
			() => {
				outactual();
			},
			'throws when input file doesnt exist'
		);
		assert.end();
	});
	t.test('replaces pattern with contents', assert => {
		rereplace([
			'/dude([^]+)dude/',
			'./src/__tests__/bar',
			'./src/__tests__/dudefoodude',
		]);
		const expected = 'dudebar\ndude\n';
		const actual = fs.read('./src/__tests__/dudefoodude');
		assert.equal(actual, expected,
			`Injects one file into another over a pattern`
		);
		assert.end();
	});
});
