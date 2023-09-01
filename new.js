const { chromium } = require("playwright");
const fs = require("fs");

const kata = process.argv[2];

if (!kata) {
  console.log("Please provide a kata as first argument");
  process.exit(1);
}

const kataId = kata.match(/kata\/(.*)?\/train/)[1];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on("response", async (response) => {
    if (response.url().includes("session")) {
      const data = await response.body();
      const res = JSON.parse(Buffer.from(data).toString());

      const func = res.exampleFixture.match(/assert.*?\((.*?)\(/)[1] || "func";

      fs.writeFileSync(
        `${__dirname}/tests.spec.js`,
        res.exampleFixture
          ? `const ${func} = require('./work');
const Test = require("@codewars/test-compat");

${res.exampleFixture}`
          : "",
      );
      fs.writeFileSync(`${__dirname}/work.js`, `module.exports = ${res.setup}`);

      await browser.close();
      console.log(`Kata ${kataId} created! :)`);
      process.exit(0);
    }
  });

  await page.goto(`https://www.codewars.com/kata/${kataId}/train/javascript`);
})();
