import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export function generateResumePdf() {
  const htmlTemplatePath = path.resolve(process.cwd(), 'scripts/resume-template.html');
  const outPathPublic = path.resolve(process.cwd(), 'public/Ranjeet_Kumar_Rajani_Resume.pdf');
  const outPathDist = path.resolve(process.cwd(), 'dist/Ranjeet_Kumar_Rajani_Resume.pdf');

  // Verify wkhtmltopdf is available
  try {
    const cmd = `wkhtmltopdf --disable-smart-shrinking --page-size Letter --margin-top 12mm --margin-bottom 12mm --margin-left 18mm --margin-right 18mm --enable-local-file-access "${htmlTemplatePath}" "${outPathPublic}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Generated 100% exact layout resume PDF with wkhtmltopdf: ${outPathPublic}`);
  } catch (err) {
    if (fs.existsSync(outPathPublic)) {
      console.warn('wkhtmltopdf not found in environment; using existing pre-generated resume PDF:', outPathPublic);
    } else {
      console.error('Error running wkhtmltopdf and no existing PDF found:', err);
      throw err;
    }
  }

  // If dist exists and public PDF exists, copy to dist as well
  if (fs.existsSync(outPathPublic) && fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
    fs.copyFileSync(outPathPublic, outPathDist);
    console.log(`Copied resume PDF to dist: ${outPathDist}`);
  }
}

generateResumePdf();
