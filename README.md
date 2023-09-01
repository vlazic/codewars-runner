# Codewars Runner

`codewars-runner` is a utility designed to streamline the development and testing process for CodeWars katas. Instead of writing and testing your code directly on the CodeWars website, this tool automatically scrapes example test cases from the specified kata and generates corresponding local files, allowing you to implement and test your solution in your preferred code editor.

## Features

1. **Automatic Test Case Generation**: Provide a CodeWars kata URL or ID, and the script will generate a `tests.spec.js` file with example test cases and a `work.js` file with the kata function template.

2. **Local Development**: Implement your kata solution locally in the `work.js` file using your favorite code editor.

3. **Continuous Testing**: Run Jest in watch mode to continuously monitor your code changes and update the test results in real-time.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/vlazic/codewars-runner.git
```

2. Install the required packages:

```bash
npm install
```

## Usage

1. Generate the test files by providing a CodeWars kata URL or ID as an argument:

```bash
npm run test <KATA_URL>
```

Example:

```bash
npm run test https://www.codewars.com/kata/5b1b27c8f60e99a467000041
# or
npm run test 5b1b27c8f60e99a467000041
```

2. Open the `work.js` file in your preferred code editor and start implementing your solution.

3. Monitor the test results in the terminal and refine your solution until all tests pass.

## Dependencies

- Playwright
- Jest
- Axios
- @codewars/test-compat

## Author

Vladimir Lazić <contact@vlazic.com> (https://vlazic.com/)

## License

This project is licensed under the MIT License.
