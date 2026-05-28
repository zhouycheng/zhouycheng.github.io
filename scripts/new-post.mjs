import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'src', 'content', 'blog');

async function readScriptedAnswers() {
	let text = '';
	input.setEncoding('utf8');
	for await (const chunk of input) {
		text += chunk;
	}
	return text.split(/\r?\n/);
}

const scriptedAnswers = input.isTTY ? null : await readScriptedAnswers();
const rl = input.isTTY ? readline.createInterface({ input, output }) : null;

async function ask(question) {
	if (scriptedAnswers) {
		const answer = scriptedAnswers.shift() ?? '';
		output.write(question);
		output.write(`${answer}\n`);
		return answer;
	}

	return rl.question(question);
}

function pad2(value) {
	return String(value).padStart(2, '0');
}

function formatDateParts(year, month, day) {
	return {
		compact: `${year}${pad2(month)}${pad2(day)}`,
		dashed: `${year}-${pad2(month)}-${pad2(day)}`,
	};
}

function assertRealDate(year, month, day, raw) {
	const date = new Date(year, month - 1, day);
	if (
		date.getFullYear() !== year ||
		date.getMonth() !== month - 1 ||
		date.getDate() !== day
	) {
		throw new Error(`日期无效：${raw}`);
	}
}

function parseDateInput(value, today = new Date()) {
	const raw = value.trim();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const currentCentury = String(currentYear).slice(0, 2);

	if (raw === '') {
		return formatDateParts(currentYear, currentMonth, today.getDate());
	}

	if (!/^\d{1,8}$/.test(raw)) {
		throw new Error('日期只能输入数字，格式为 YYYYMMDD、YYMMDD、MMDD、DD 或 D。');
	}

	let year = currentYear;
	let month = currentMonth;
	let day;

	if (/^\d{8}$/.test(raw)) {
		year = Number(raw.slice(0, 4));
		month = Number(raw.slice(4, 6));
		day = Number(raw.slice(6, 8));
	} else if (/^\d{6}$/.test(raw)) {
		year = Number(`${currentCentury}${raw.slice(0, 2)}`);
		month = Number(raw.slice(2, 4));
		day = Number(raw.slice(4, 6));
	} else if (/^\d{4}$/.test(raw)) {
		month = Number(raw.slice(0, 2));
		day = Number(raw.slice(2, 4));
	} else if (/^\d{1,2}$/.test(raw)) {
		day = Number(raw);
	} else {
		throw new Error('日期格式应为 YYYYMMDD、YYMMDD、MMDD、DD 或 D。');
	}

	assertRealDate(year, month, day, raw);
	return formatDateParts(year, month, day);
}

function slugify(value) {
	const slug = value
		.trim()
		.normalize('NFKD')
		.toLowerCase()
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');

	return slug || 'untitled';
}

function yamlString(value) {
	return JSON.stringify(value);
}

async function promptRequired(label) {
	while (true) {
		const value = (await ask(`${label}: `)).trim();
		if (value) return value;
		console.log(`${label}不能为空。`);
	}
}

async function promptDate() {
	while (true) {
		const value = await ask('日期 (YYYYMMDD/YYMMDD/MMDD/DD/D，默认今天): ');
		try {
			return parseDateInput(value);
		} catch (error) {
			console.log(error.message);
		}
	}
}

async function promptKind() {
	while (true) {
		const value = (await ask('类型 (article/log，默认 log): ')).trim().toLowerCase();
		if (value === '') return 'log';
		if (value === 'article' || value === 'log') return value;
		console.log('类型只能是 article 或 log。');
	}
}

async function fileExists(filePath) {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const title = await promptRequired('标题');
	const description = await promptRequired('摘要');
	const date = await promptDate();
	const kind = await promptKind();
	const slugInput = (
		await ask(`文件名标题 (可空，默认 ${slugify(title)}): `)
	).trim();
	const slug = slugify(slugInput || title);
	const filename = `${date.compact}-${slug}.md`;
	const filePath = path.join(blogDir, filename);

	if (await fileExists(filePath)) {
		throw new Error(`文件已存在：${path.relative(rootDir, filePath)}`);
	}

	const content = `---\ntitle: ${yamlString(title)}\ndescription: ${yamlString(description)}\npubDate: ${date.dashed}\nkind: ${kind}\ndraft: false\n---\n\n`;

	await mkdir(blogDir, { recursive: true });
	await writeFile(filePath, content, 'utf8');
	console.log(`已创建：${path.relative(rootDir, filePath)}`);
}

try {
	await main();
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
} finally {
	rl?.close();
}
