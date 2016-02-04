![Travis](https://img.shields.io/travis/VinSpee/rereplace.svg)

# rereplace

rereplace simply takes a regex with a capture group, reads a file, and replaces
the capture group with the contents of another file.

## Origin

I switched an entire build over to using cli tools and npm scripts. I ran into
a problem with an svg spritesheet generating library – I needed to inject the
output into a template. I slammed my head against the wall with `sed` and `awk`
for a while, but finally decided to write a simple module that will do exactly
what I ask using JS-compatible regexes.

## Installation

`npm i -S rereplace`

## Use

### CLI

`rereplace '/your-regex-as-a-string/' infile.html outfile.txt`

### as a module

```js
import rereplace from 'rereplace';

rereplace('/your-regex-as-a-string/', './path/to/infile.html',
'./path/to/outfile.txt');
```

