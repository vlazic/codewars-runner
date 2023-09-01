const { chromium } = require("playwright");
const fs = require("fs");

const kata = process.argv[2];

if (!kata) {
  console.log("Please provide a kata url or kata id as first argument");
  process.exit(1);
}

let kataId;
try {
  const url = new URL(kata);
  const pathSegments = url.pathname.split("/");
  kataId = pathSegments[2];
} catch (error) {
  // catch Uncaught TypeError [ERR_INVALID_URL]: Invalid URL
  if (error.code === "ERR_INVALID_URL" && kata.length === 24) {
    kataId = kata;
  } else {
    console.log("Please provide a valid kata url or kata id as first argument");
    process.exit(1);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
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

      console.log(`Kata ${kataId} created! :)`);
      process.exit(0);
    }
  });

  await page.goto(`https://www.codewars.com/kata/${kataId}/train/javascript`, {
    waitUntil: "networkidle",
  });
})();
