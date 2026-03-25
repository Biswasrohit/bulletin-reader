import { extractFromImage } from './src/lib/extractor';
import * as fs from 'fs';
import * as path from 'path';

const imagePath = process.argv[2];

if (!imagePath) {
  console.error('\nUsage: npx ts-node demo.ts <path-to-image>');
  console.error('Example: npx ts-node demo.ts ./flyer.png\n');
  process.exit(1);
}

const outputDir = path.join(path.dirname(imagePath), 'output');
const divider   = '─'.repeat(50);

async function run() {
  console.log('\n' + '═'.repeat(50));
  console.log('  SnapAction — Multi-Output Flexibility Demo');
  console.log('  Member B · AI-Powered Visual Extraction');
  console.log('═'.repeat(50));
  console.log(`\n  Input : ${path.resolve(imagePath)}`);
  console.log('  Status: scanning image...\n');

  const result = await extractFromImage(imagePath);

  fs.mkdirSync(outputDir, { recursive: true });

  if (result.ics) {
    const file = path.join(outputDir, 'event.ics');
    fs.writeFileSync(file, result.ics);
    console.log('📅  CALENDAR EVENT  →  saved as event.ics');
    console.log(divider);
    console.log(result.ics);
    console.log();
  }

  if (result.vcard) {
    const file = path.join(outputDir, 'contact.vcf');
    fs.writeFileSync(file, result.vcard);
    console.log('👤  CONTACT CARD  →  saved as contact.vcf');
    console.log(divider);
    console.log(result.vcard);
    console.log();
  }

  if (result.checklist) {
    const file = path.join(outputDir, 'checklist.md');
    fs.writeFileSync(file, result.checklist);
    console.log('✅  TASK CHECKLIST  →  saved as checklist.md');
    console.log(divider);
    console.log(result.checklist);
  }

  if (result.emailDraft) {
    const file = path.join(outputDir, 'email.txt');
    fs.writeFileSync(file, result.emailDraft);
    console.log('✉️   EMAIL DRAFT  →  saved as email.txt');
    console.log(divider);
    console.log(result.emailDraft);
    console.log();
  }

  const count = Object.keys(result).length;
  console.log('═'.repeat(50));
  console.log(`  ✓ ${count} outputs generated from 1 image`);
  console.log(`  ✓ Files saved to: ${path.resolve(outputDir)}/`);
  console.log('═'.repeat(50) + '\n');
}

run().catch((err) => {
  console.error('\n  Error:', err.message, '\n');
  process.exit(1);
});
