import { jsPDF } from 'jspdf';

export function createResumePdfDoc(): jsPDF {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter' // 612 x 792 pt
  });

  const pageWidth = 612;
  // Margins: 54 pt (0.75 in) matching standard professional layout
  const margin = 54;
  const contentWidth = pageWidth - margin * 2; // 504 pt

  // Colors matching user's original document
  const cTitle: [number, number, number] = [27, 60, 115];       // #1b3c73 - Bold Navy for Name & Section Headings
  const cBlack: [number, number, number] = [17, 24, 39];        // #111827 - Headings & Primary Text
  const cDark: [number, number, number] = [31, 41, 55];         // #1f2937 - Body Text & Descriptions
  const cItalic: [number, number, number] = [75, 85, 99];       // #4b5563 - Subtitles & descriptions
  const cLink: [number, number, number] = [29, 78, 216];        // #1d4ed8 - Clickable Hyperlink Blue
  const cRule: [number, number, number] = [148, 163, 184];      // #94a3b8 - Crisp horizontal section rule

  // Helper for Section Titles (Bold Navy + Full-width Rule)
  const drawSectionTitle = (title: string, curY: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...cTitle);
    doc.text(title.toUpperCase(), margin, curY);
    curY += 3.0;
    doc.setDrawColor(...cRule);
    doc.setLineWidth(0.75);
    doc.line(margin, curY, margin + contentWidth, curY);
    curY += 9.5;
    return curY;
  };

  // Helper for Bullet Points with Clean Hanging Indent
  const drawBullet = (text: string, curY: number, indent = 12, fontSize = 9.4, lineSpacing = 1.25, afterSpacing = 3.8): number => {
    const bulletX = margin + 3.5;
    const textX = margin + indent;
    const textWidth = contentWidth - indent;

    // Small crisp bullet circle
    doc.setFillColor(...cBlack);
    doc.circle(bulletX, curY - 3.0, 1.25, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(...cDark);

    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, textX, curY, { lineHeightFactor: lineSpacing });
    curY += lines.length * (fontSize * lineSpacing) + afterSpacing;
    return curY;
  };

  // Helper for Competencies (Bold prefix + Normal text with exact wrap)
  const drawCompetencyItem = (boldPrefix: string, normalText: string, curY: number, fontSize = 9.35, lineSpacing = 1.24): number => {
    const textX = margin;
    const textWidth = contentWidth;

    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    const prefixStr = boldPrefix + ' ';
    const prefixWidth = doc.getTextWidth(prefixStr);

    doc.setFont('helvetica', 'normal');
    const fullText = prefixStr + normalText;
    const lines = doc.splitTextToSize(fullText, textWidth);

    if (lines.length > 0) {
      const firstLine = lines[0];
      if (firstLine.startsWith(prefixStr)) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...cBlack);
        doc.text(prefixStr, textX, curY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...cDark);
        doc.text(firstLine.slice(prefixStr.length), textX + prefixWidth, curY);
      } else {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...cBlack);
        doc.text(prefixStr, textX, curY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...cDark);
        doc.text(normalText, textX + prefixWidth, curY);
      }

      for (let i = 1; i < lines.length; i++) {
        const lineY = curY + i * (fontSize * lineSpacing);
        doc.text(lines[i], textX, lineY);
      }

      curY += lines.length * (fontSize * lineSpacing) + 3.8;
    }

    return curY;
  };

  // ==================== PAGE 1 ====================
  let y = 42;

  // Candidate Name (Centered, Deep Navy, Bold)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(...cTitle);
  doc.text('RANJEET KUMAR RAJANI', pageWidth / 2, y, { align: 'center' });
  y += 14.5;

  // Subtitle line 1: Target Specialization
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.6);
  doc.setTextColor(...cDark);
  doc.text('Commercial & Sales Analytics  |  Pharma Commercial Operations  |  Business Intelligence', pageWidth / 2, y, { align: 'center' });
  y += 12.5;

  // Subtitle line 2: Contact info + Clickable LinkedIn & GitHub
  doc.setFontSize(8.9);
  const part1 = 'Fairfield, IA  •  +1 (641) 233-9348  •  ranjeetkumarrajanii@gmail.com  •  ';
  const linkedInText = 'LinkedIn';
  const part2 = '  •  ';
  const gitHubText = 'GitHub';

  const wPart1 = doc.getTextWidth(part1);
  const wLIn = doc.getTextWidth(linkedInText);
  const wPart2 = doc.getTextWidth(part2);
  const wGh = doc.getTextWidth(gitHubText);
  const totalContactWidth = wPart1 + wLIn + wPart2 + wGh;

  let startX = (pageWidth - totalContactWidth) / 2;

  doc.setTextColor(...cDark);
  doc.text(part1, startX, y);
  startX += wPart1;

  doc.setTextColor(...cLink);
  doc.textWithLink(linkedInText, startX, y, { url: 'https://www.linkedin.com/in/ranjeet-rajani/' });
  doc.link(startX, y - 7, wLIn, 9, { url: 'https://www.linkedin.com/in/ranjeet-rajani/' });
  doc.setDrawColor(...cLink);
  doc.setLineWidth(0.4);
  doc.line(startX, y + 1, startX + wLIn, y + 1);
  startX += wLIn;

  doc.setTextColor(...cDark);
  doc.text(part2, startX, y);
  startX += wPart2;

  doc.setTextColor(...cLink);
  doc.textWithLink(gitHubText, startX, y, { url: 'https://github.com/ranjeet-rajani' });
  doc.link(startX, y - 7, wGh, 9, { url: 'https://github.com/ranjeet-rajani' });
  doc.line(startX, y + 1, startX + wGh, y + 1);

  y += 18;

  // ---------- PROFESSIONAL SUMMARY ----------
  y = drawSectionTitle('PROFESSIONAL SUMMARY', y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.35);
  doc.setTextColor(...cDark);
  const summaryText =
    'Commercial leader with 15+ years running sales teams, territories, and revenue performance at leading companies in Pakistan. Now pairing that frontline commercial judgment with a modern analytics toolkit - Power BI, SQL, R, and AI-assisted workflows - and an MBA in ERP & SAP at Maharishi International University (Fairfield, Iowa) to turn commercial data into decisions that grow revenue. Directed 40+ person field forces, delivered a 450% segment revenue turnaround, and traced a $4.34M revenue shortfall to its root causes using a 45-measure Power BI model.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y, { lineHeightFactor: 1.25 });
  y += summaryLines.length * (9.35 * 1.25) + 10;

  // ---------- CORE COMPETENCIES ----------
  y = drawSectionTitle('CORE COMPETENCIES', y);

  const competencies = [
    {
      bold: 'Commercial & Sales Analytics:',
      text: 'Sales-vs-Target Performance Management, KPI Reporting & Dashboards, Revenue & Territory Analysis, Sales Forecasting, Quota Attainment Analysis, Customer Targeting & Segmentation'
    },
    {
      bold: 'Data & Business Intelligence:',
      text: 'Power BI (DAX, Power Query, Star Schema Modeling), SQL, R (Tidyverse), Advanced Excel (PivotTables, KPI Dashboards), Data Cleaning & Visualization'
    },
    {
      bold: 'AI & Process Acceleration:',
      text: 'AI-assisted analytics workflows - accelerating dashboard development, data validation, and insight documentation; applying AI to speed commercial reporting, root-cause analysis, and decision-making'
    },
    {
      bold: 'Commercial Operations:',
      text: 'CRM / SFA (MRep, Azure cloud-hosted) - Call Reporting, Territory Management, Distribution Tracking; Patient Support Programs; Cross-Functional Collaboration (Medical, Marketing, Supply Chain); Stakeholder Reporting; Hospital Tenders & Formularies'
    },
    {
      bold: 'ERP & Leadership (supporting):',
      text: 'SAP S/4HANA (FI/CO, MM, PP), Procure-to-Pay Configuration, Business Process Mapping; Team Leadership (40+), Training & Coaching'
    }
  ];

  competencies.forEach((comp) => {
    y = drawCompetencyItem(comp.bold, comp.text, y, 9.3, 1.24);
  });
  y += 6;

  // ---------- PROFESSIONAL EXPERIENCE ----------
  y = drawSectionTitle('PROFESSIONAL EXPERIENCE', y);

  // Experience 1: Ferozsons - Regional Patients Support Manager
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.6);
  doc.setTextColor(...cBlack);
  doc.text('Ferozsons Laboratories Ltd. | Karachi, Pakistan', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.4);
  doc.setTextColor(...cItalic);
  doc.text('Leading Pakistani pharmaceutical manufacturer specializing in gastroenterology and hepatology therapeutics', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Regional Patients Support Manager', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text('Jul 2024 - Oct 2024', margin + contentWidth, y, { align: 'right' });
  y += 10.5;

  y = drawBullet('Built weekly Excel KPI dashboards tracking revenue-vs-target, stock availability, and territory coverage to guide data-driven resource allocation across the regional portfolio.', y);
  y = drawBullet('Directed a team of Zonal Sales Managers, aligning field execution and reporting with revenue targets and compliance standards.', y);
  y = drawBullet('Oversaw MRep call reporting and territory data across the regional portfolio, ensuring consistent KPI tracking and data quality across zones ahead of leadership reviews.', y);
  y += 6;

  // Experience 2: Ferozsons - Senior Zonal Sales Manager
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.6);
  doc.setTextColor(...cBlack);
  doc.text('Ferozsons Laboratories Ltd. | Karachi, Pakistan', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Senior Zonal Sales Manager', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text('Aug 2023 - Jul 2024', margin + contentWidth, y, { align: 'right' });
  y += 10.5;

  y = drawBullet('Audited sales-vs-target, forecast, and distribution data through the MRep CRM platform, turning reports into Power BI and Excel presentations that guided resource allocation and beat quarterly revenue targets.', y);
  y = drawBullet('Partnered with medical, marketing, and supply chain teams, using product-availability data to eliminate stockouts; analyzed competitor and prescription data monthly to protect key-account share.', y);
  y += 6;

  // Experience 3: Ferozsons - Zonal Sales Manager
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.6);
  doc.setTextColor(...cBlack);
  doc.text('Ferozsons Laboratories Ltd. | Karachi, Pakistan', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Zonal Sales Manager', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text('Feb 2022 - Aug 2023', margin + contentWidth, y, { align: 'right' });
  y += 10.5;

  y = drawBullet('Directed a 40-person field sales force, reallocating effort across territories using MRep performance data - exceeded annual quota at 116% in both 2022 and 2023.', y);
  y = drawBullet('Built a territory performance tracker across 30+ healthcare institutions, expanding regional coverage by 25%.', y);
  y = drawBullet('Led the national launch of Prulevity (Prucalopride), prioritizing high-potential accounts through account and territory analysis to capture 40% market share within 12 months.', y);
  y = drawBullet('Implemented a client satisfaction scoring system, lifting customer retention scores by 20%.', y);

  // ==================== PAGE 2 ====================
  doc.addPage('letter');
  y = 42;

  // Experience 4: CCL Pharmaceuticals
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.6);
  doc.setTextColor(...cBlack);
  doc.text('CCL Pharmaceuticals | Karachi, Pakistan', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.4);
  doc.setTextColor(...cItalic);
  doc.text('Pakistani pharmaceutical company known for its hepatology and gastroenterology product portfolio', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Sales Manager - Speciality Therapeutics', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text('Feb 2018 - Feb 2021', margin + contentWidth, y, { align: 'right' });
  y += 10.5;

  y = drawBullet('Delivered a 450% revenue turnaround in the Hepatology segment in Year 1 by diagnosing an underperforming territory through dashboard reporting, then expanding HCP coverage and call quality; led a 12-person team across Sindh and Baluchistan.', y);
  y = drawBullet('Sustained 175% and 150% year-over-year growth in Gastroenterology in Years 2 and 3 through ongoing territory performance tracking.', y);
  y = drawBullet('Designed a monthly SKU-level performance dashboard across four cities, cutting issue-detection time by two weeks.', y);
  y = drawBullet('Delivered monthly Best Practices in Sales & Service (BPSS) training, upskilling 12 representatives in consultative selling, CRM/call-reporting data usage, and sales-vs-target tracking.', y);
  y += 6.5;

  // Experience 5: Getz Pharma
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.6);
  doc.setTextColor(...cBlack);
  doc.text('Getz Pharma | Karachi, Pakistan', margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.4);
  doc.setTextColor(...cItalic);
  doc.text("Pakistan's leading pharmaceutical company, with a strong specialty care and cardiology portfolio", margin, y);
  y += 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Area Sales Manager - Key Institutional Accounts', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text('Jan 2013 - Feb 2018', margin + contentWidth, y, { align: 'right' });
  y += 10.5;

  y = drawBullet('Led 5 Territory Managers across premier institutions (Aga Khan University Hospital, NICVD, JPMC), growing market share by 20% through account and tender data analysis.', y);
  y = drawBullet('Secured multi-year government hospital tenders through quarterly territory data analysis; lifted team productivity 30% with weekly KPI reviews and structured coaching.', y);
  y += 8.5;

  // ---------- KEY ANALYTICS PROJECTS ----------
  y = drawSectionTitle('KEY ANALYTICS PROJECTS', y);

  // Project 1: Pharma Command Center
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Pharma Commercial Analytics Command Center - Power BI, DAX, SQL, Star Schema (2026)', margin, y);
  y += 10;

  y = drawBullet('Built a 7-page Power BI report on a 9-table star schema (4 fact tables, 5 dimensions) spanning 24 months, 20 territories, 128 healthcare accounts, and 6 brands, with 45 DAX measures reconciled line-by-line to source data.', y);
  y = drawBullet('Traced 30% of a $4.34M revenue shortfall ($1.31M) to inventory stockouts rather than sales execution, classifying all 20 territories by root cause - supply, competitive, or execution - each mapped to an accountable function; built a month-index key enabling month-over-month and rolling analysis.', y);
  y = drawBullet('Accelerated delivery with AI-assisted workflows across DAX development, data validation, and documentation - from raw data to business decisions, faster.', y);
  y += 5.5;

  // Project 2: Cyclistic Bikeshare
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('Cyclistic Bikeshare Capstone, Google Data Analytics - R, Tidyverse (2026)', margin, y);
  y += 10;

  y = drawBullet('Cleaned and analyzed 4.3M+ trip records in R, applying documented rules to remove zero-duration and over-24-hour rides; found casual riders average 22.8-minute rides vs. 12.1 for members, with 8x seasonal variation against under 3x for members.', y);
  y = drawBullet('Delivered five ggplot2 visualizations and three data-backed marketing recommendations, including seasonal membership promotions and e-bike incentives.', y);
  y += 5.5;

  // Project 3: SAP P2P
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  doc.text('SAP S/4HANA Procure-to-Pay Implementation - SAP MM, FI/CO, IDES Sandbox (2026)', margin, y);
  y += 10;

  y = drawBullet('Configured end-to-end procure-to-pay in the IDES sandbox (purchase requisition through vendor payment and GL posting); redesigned approvals to cut simulated procurement cycle time by 18%.', y);
  y += 8.5;

  // ---------- EDUCATION ----------
  y = drawSectionTitle('EDUCATION', y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  const edu1Bold = 'MBA, Enterprise Resource Planning (ERP) & SAP';
  doc.text(edu1Bold, margin, y);
  const wEdu1Bold = doc.getTextWidth(edu1Bold);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text(' - Maharishi International University, Fairfield, IA (Feb 2026 - Oct 2028)', margin + wEdu1Bold, y);
  y += 12.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.35);
  doc.setTextColor(...cBlack);
  const edu2Bold = 'MA Economics (2009); BSc (2003)';
  doc.text(edu2Bold, margin, y);
  const wEdu2Bold = doc.getTextWidth(edu2Bold);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...cDark);
  doc.text(' - Shah Abdul Latif University, Pakistan', margin + wEdu2Bold, y);
  y += 10;

  // ---------- CERTIFICATIONS ----------
  y = drawSectionTitle('CERTIFICATIONS', y);

  y = drawBullet('Google Data Analytics Professional Certificate - SQL, R, Tableau, Data Cleaning & Visualization (2026)', y, 12, 9.3, 1.22, 3.5);
  y = drawBullet('Sales Management Development Program (Part I & II), TSF (2024)', y, 12, 9.3, 1.22, 3.5);
  y = drawBullet('Advanced Pharmaceutical Selling Skills, Ferozsons (2023)', y, 12, 9.3, 1.22, 3.5);
  y = drawBullet('Leadership Development Program, Getz Pharma (2013)', y, 12, 9.3, 1.22, 3.5);
  y += 2.5;

  // ---------- AWARDS ----------
  y = drawSectionTitle('AWARDS', y);

  y = drawBullet('Best Regional Manager, Ferozsons (2023)', y, 12, 9.3, 1.22, 3.5);
  y = drawBullet('Long Outstanding Service Award, Getz Pharma (2015)', y, 12, 9.3, 1.22, 3.5);
  y += 2.5;

  // ---------- LANGUAGES ----------
  y = drawSectionTitle('LANGUAGES', y);

  y = drawBullet('English, Urdu, Hindi', y, 12, 9.3, 1.22, 3.5);

  return doc;
}

export function downloadResumePdf(fileName = 'Ranjeet_Kumar_Rajani_Resume.pdf'): boolean {
  try {
    const doc = createResumePdfDoc();
    doc.save(fileName);
    return true;
  } catch (err) {
    console.error('Failed to generate PDF via jsPDF:', err);
    return false;
  }
}
