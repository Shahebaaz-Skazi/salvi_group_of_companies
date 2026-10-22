const fs = require('fs');

const content = fs.readFileSync('src/content/firms.ts', 'utf-8');
const draftMatches = content.match(/name: "(.*?)",[\s\S]*?status: "(DRAFT_CLIENT_APPROVAL|PLACEHOLDER_DRAFT)"/g);

if (draftMatches) {
  console.log('Firms requiring client approval before launch:');
  draftMatches.forEach(match => {
    const name = match.match(/name: "(.*?)"/)[1];
    const status = match.match(/status: "(.*?)"/)[1];
    console.log(`- ${name} (${status})`);
  });
} else {
  console.log('All firms approved!');
}
