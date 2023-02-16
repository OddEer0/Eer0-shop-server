module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': ['none', { endOfLine: 'auto', trailingComma: 'none', semi: false }],
		'no-tabs': 'off',
		'no-console': 'warn',
		'import/prefer-default-export': 'off',
		'arrow-parens': ['error', 'as-needed'],
		'no-underscore-dangle': 'off',
		'class-methods-use-this': 'off',
		'prefer-destructuring': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/lines-between-class-members': 'off'
	}
};
