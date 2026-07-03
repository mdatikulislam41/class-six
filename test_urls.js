const https = require('https');

const chapters = [
  { id: 1, title: "স্বাভাবিক সংখ্যা ও ভগ্নাংশ" },
  { id: 2, title: "অনুপাত ও শতকরা" },
  { id: 2, title: "অনুপাতে ও শতকরা" },
  { id: 3, title: "পূর্ণসংখ্যা" },
  { id: 4, title: "বীজগণিতীয় রাশি" },
  { id: 5, title: "সরল সমীকরণ" },
  { id: 6, title: "জ্যামিতির মৌলিক ধারণা" },
  { id: 7, title: "ব্যবহারিক জ্যামিতি" },
  { id: 8, title: "তথ্য ও উপাত্ত" }
];

const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function toBengaliNumber(num) {
  return num
    .toString()
    .split("")
    .map((digit) => bengaliNumerals[parseInt(digit, 10)] || digit)
    .join("");
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode);
    });
    req.on('error', () => resolve(500));
    req.end();
  });
}

async function run() {
  for (const c of chapters) {
    const titles = [c.title, c.title.normalize('NFC'), c.title.normalize('NFD')];
    // Also try alternative spelling for Yya (য়):
    // In Bengali, য় can be U+09DF or U+09AF + U+09BC.
    const alternativeTitle = c.title.replace(/\u09DF/g, '\u09AF\u09BC').replace(/\u09AF\u09BC/g, '\u09DF');
    titles.push(alternativeTitle);
    
    // Check clean titles
    const uniqueTitles = [...new Set(titles)];
    for (const title of uniqueTitles) {
      for (const isBengaliNum of [true, false]) {
        const num = isBengaliNum ? toBengaliNumber(c.id) : c.id;
        const filename = `অধ্যায় ${num}_ ${title}.pdf`;
        const encoded = encodeURIComponent(filename);
        const url = `https://scared-chocolate-jvsmjwyi.edgeone.dev/${encoded}`;
        const code = await checkUrl(url);
        if (code === 200) {
          console.log(`FOUND: id=${c.id}, title="${c.title}", url="${url}"`);
        }
      }
    }
  }
  console.log("Done checking.");
}

run();
