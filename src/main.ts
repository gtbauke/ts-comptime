import {readFile} from 'node:fs/promises';
import {parse} from '@typescript-eslint/typescript-estree';
import {inspect} from 'util';
import path from 'node:path';

function ts(args: TemplateStringsArray): string {
	return args.join();
}

function comptime(subs: Map<string, string>, fn: (() => unknown) | string) {
	const sourceCode = String(fn);
	console.log(sourceCode);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const result = parse(sourceCode);
	console.log(inspect(result, {depth: Infinity, colors: true}));
}

async function main() {
	const subs = new Map<string, string>(Object.entries({
		// eslint-disable-next-line @typescript-eslint/naming-convention
		T: 'number',
	}));

	const content = await readFile(path.join(__dirname, 'test.ts'), {encoding: 'utf-8'});
	comptime(subs, content);
}

main()
	.then(() => 'Done')
	.catch(err => {
		console.error(err);
	});
