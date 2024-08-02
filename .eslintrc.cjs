module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [
		{
			files: ['**/*.ts'],
		},
	],
	ignorePatterns: [],
	rules: {
		'no-useless-escape': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off'
	},
	env: {
		commonjs: true,
		node: true,
	},
};