const fs = require('fs');
['localhost_3000-20260720T151943.json', 'mobile_localhost_3000-20260720T151830.json'].forEach(f => {
  if (!fs.existsSync(f)) { console.log('File not found: ' + f); return; }
  const d = JSON.parse(fs.readFileSync(f));
  console.log('\n=== Report: ' + f + ' ===');
  const cats = d.categories;
  for (const c in cats) {
    console.log(cats[c].title + ': ' + (cats[c].score * 100));
  }
  console.log('\nFailed/Suboptimal Audits:');
  for (const a in d.audits) {
    const audit = d.audits[a];
    if (audit.score !== null && audit.score < 1 && audit.score !== undefined) {
      if (audit.scoreDisplayMode === 'numeric' || audit.scoreDisplayMode === 'binary') {
        console.log('- [' + audit.id + '] ' + audit.title + ': score ' + audit.score);
        if(audit.details && audit.details.items && audit.details.items.length > 0) {
          console.log('  Items count: ' + audit.details.items.length);
          if (audit.details.items.length < 5) {
            console.log('  Items: ' + JSON.stringify(audit.details.items, null, 2));
          }
        }
      }
    }
  }
});
