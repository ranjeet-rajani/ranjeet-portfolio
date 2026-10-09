import { useState, useRef } from 'react';
import { X, Download, Printer, Copy, Check, Calendar, Clock, ExternalLink, Camera, UploadCloud, RefreshCw, Image as ImageIcon, Link as LinkIcon, Linkedin, Github, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_PILLARS, EDUCATION, PORTRAIT_PRESETS } from '../data/portfolioData';
import { ProjectItem, KpiMetric } from '../types';
import { recordCtaClick } from '../utils/analyticsTracker';
import { downloadResumePdf } from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function ResumeModal({ isOpen, onClose, onShowToast }: ResumeModalProps) {
  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    recordCtaClick('resume', 'Downloaded PDF Resume');
    onShowToast('Resume PDF downloaded successfully!');
  };

  const handlePrint = () => {
    recordCtaClick('resume', 'Resume Print / PDF Exported');
    window.print();
  };

  const handleCopyText = () => {
    recordCtaClick('resume', 'Resume Full Text Copied');
    const text = `
${PERSONAL_INFO.name}
${PERSONAL_INFO.title}
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}
GitHub: ${PERSONAL_INFO.socials.github}
Kaggle: ${PERSONAL_INFO.socials.kaggle}

PROFESSIONAL SUMMARY:
${PERSONAL_INFO.bio}

CORE EXPERIENCE:
${EXPERIENCES.map((e) => `${e.role} - ${e.company} (${e.period})\n${e.bullets.map((b) => `• ${b}`).join('\n')}`).join('\n\n')}

EDUCATION & CERTIFICATIONS:
${EDUCATION.map((ed) => `${ed.degree} - ${ed.institution}\n${ed.description}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    onShowToast('Resume text copied to clipboard!');
  };

  return (
    <div id="resume-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto resume-modal-backdrop">
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-[#2563eb]/40 rounded-lg shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col resume-modal-dialog">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326] resume-modal-no-print">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
            <span className="font-heading font-bold text-sm text-white">
              Professional Resume
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/Ranjeet_Kumar_Rajani_Resume.pdf"
              download="Ranjeet_Kumar_Rajani_Resume.pdf"
              onClick={handleDownloadPdf}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Resume</span>
            </a>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-mono text-[#c3c6d7] hover:text-white bg-[#171f33] border border-[#334155] rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 text-xs font-mono text-[#c3c6d7] hover:text-white bg-[#171f33] border border-[#334155] rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Text</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8d90a0] hover:text-white rounded hover:bg-[#171f33] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content Container */}
        <div className="p-8 overflow-y-auto space-y-7 bg-[#0b1326]/90 text-[#dae2fd] resume-print-content">
          {/* Header */}
          <div className="text-center pb-4 border-b border-[#1e293b] resume-header-block space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#7bd0ff] font-heading tracking-wide">
              RANJEET KUMAR RAJANI
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#c3c6d7]">
              Commercial & Sales Analytics | Pharma Commercial Operations | Business Intelligence
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[#8d90a0]">
              <span>Fairfield, IA</span>
              <span>•</span>
              <a href="tel:+16412339348" className="hover:text-white transition-colors">+1 (641) 233-9348</a>
              <span>•</span>
              <a href="mailto:ranjeetkumarrajanii@gmail.com" className="hover:text-white transition-colors">ranjeetkumarrajanii@gmail.com</a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordCtaClick('social', 'Resume: Visited LinkedIn Profile')}
                className="text-[#7bd0ff] hover:underline transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <Linkedin className="w-3 h-3" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordCtaClick('social', 'Resume: Visited GitHub Profile')}
                className="text-[#7bd0ff] hover:underline transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="resume-section">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mb-2.5 resume-section-title">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-[13px] text-[#c3c6d7] leading-relaxed">
              Commercial leader with 15+ years running sales teams, territories, and revenue performance at leading companies in Pakistan. Now pairing that frontline commercial judgment with a modern analytics toolkit - Power BI, SQL, R, and AI-assisted workflows - and an MBA in ERP & SAP at Maharishi International University (Fairfield, Iowa) to turn commercial data into decisions that grow revenue. Directed 40+ person field forces, delivered a 450% segment revenue turnaround, and traced a $4.34M revenue shortfall to its root causes using a 45-measure Power BI model.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="resume-section">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mb-2.5 resume-section-title">
              CORE COMPETENCIES
            </h2>
            <div className="space-y-2 text-xs sm:text-[13px] text-[#c3c6d7]">
              <div>
                <span className="font-bold text-white">Commercial & Sales Analytics: </span>
                <span>Sales-vs-Target Performance Management, KPI Reporting & Dashboards, Revenue & Territory Analysis, Sales Forecasting, Quota Attainment Analysis, Customer Targeting & Segmentation</span>
              </div>
              <div>
                <span className="font-bold text-white">Data & Business Intelligence: </span>
                <span>Power BI (DAX, Power Query, Star Schema Modeling), SQL, R (Tidyverse), Advanced Excel (PivotTables, KPI Dashboards), Data Cleaning & Visualization</span>
              </div>
              <div>
                <span className="font-bold text-white">AI & Process Acceleration: </span>
                <span>AI-assisted analytics workflows - accelerating dashboard development, data validation, and insight documentation; applying AI to speed commercial reporting, root-cause analysis, and decision-making</span>
              </div>
              <div>
                <span className="font-bold text-white">Commercial Operations: </span>
                <span>CRM / SFA (MRep, Azure cloud-hosted) - Call Reporting, Territory Management, Distribution Tracking; Patient Support Programs; Cross-Functional Collaboration (Medical, Marketing, Supply Chain); Stakeholder Reporting; Hospital Tenders & Formularies</span>
              </div>
              <div>
                <span className="font-bold text-white">ERP & Leadership (supporting): </span>
                <span>SAP S/4HANA (FI/CO, MM, PP), Procure-to-Pay Configuration, Business Process Mapping; Team Leadership (40+), Training & Coaching</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="resume-section">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mb-3 resume-section-title">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-5">
              {/* Ferozsons 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Ferozsons Laboratories Ltd. | Karachi, Pakistan
                  </h3>
                </div>
                <p className="text-[11px] italic text-[#8d90a0]">
                  Leading Pakistani pharmaceutical manufacturer specializing in gastroenterology and hepatology therapeutics
                </p>
                <div className="flex justify-between items-baseline flex-wrap text-xs">
                  <span className="font-semibold text-white">Regional Patients Support Manager</span>
                  <span className="text-[#7bd0ff] font-mono text-[11px]">Jul 2024 - Oct 2024</span>
                </div>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Built weekly Excel KPI dashboards tracking revenue-vs-target, stock availability, and territory coverage to guide data-driven resource allocation across the regional portfolio.</li>
                  <li>Directed a team of Zonal Sales Managers, aligning field execution and reporting with revenue targets and compliance standards.</li>
                  <li>Oversaw MRep call reporting and territory data across the regional portfolio, ensuring consistent KPI tracking and data quality across zones ahead of leadership reviews.</li>
                </ul>
              </div>

              {/* Ferozsons 2 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Ferozsons Laboratories Ltd. | Karachi, Pakistan
                  </h3>
                </div>
                <div className="flex justify-between items-baseline flex-wrap text-xs">
                  <span className="font-semibold text-white">Senior Zonal Sales Manager</span>
                  <span className="text-[#7bd0ff] font-mono text-[11px]">Aug 2023 - Jul 2024</span>
                </div>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Audited sales-vs-target, forecast, and distribution data through the MRep CRM platform, turning reports into Power BI and Excel presentations that guided resource allocation and beat quarterly revenue targets.</li>
                  <li>Partnered with medical, marketing, and supply chain teams, using product-availability data to eliminate stockouts; analyzed competitor and prescription data monthly to protect key-account share.</li>
                </ul>
              </div>

              {/* Ferozsons 3 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Ferozsons Laboratories Ltd. | Karachi, Pakistan
                  </h3>
                </div>
                <div className="flex justify-between items-baseline flex-wrap text-xs">
                  <span className="font-semibold text-white">Zonal Sales Manager</span>
                  <span className="text-[#7bd0ff] font-mono text-[11px]">Feb 2022 - Aug 2023</span>
                </div>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Directed a 40-person field sales force, reallocating effort across territories using MRep performance data - exceeded annual quota at 116% in both 2022 and 2023.</li>
                  <li>Built a territory performance tracker across 30+ healthcare institutions, expanding regional coverage by 25%.</li>
                  <li>Led the national launch of Prulevity (Prucalopride), prioritizing high-potential accounts through account and territory analysis to capture 40% market share within 12 months.</li>
                  <li>Implemented a client satisfaction scoring system, lifting customer retention scores by 20%.</li>
                </ul>
              </div>

              {/* CCL Pharmaceuticals */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    CCL Pharmaceuticals | Karachi, Pakistan
                  </h3>
                </div>
                <p className="text-[11px] italic text-[#8d90a0]">
                  Pakistani pharmaceutical company known for its hepatology and gastroenterology product portfolio
                </p>
                <div className="flex justify-between items-baseline flex-wrap text-xs">
                  <span className="font-semibold text-white">Sales Manager - Speciality Therapeutics</span>
                  <span className="text-[#7bd0ff] font-mono text-[11px]">Feb 2018 - Feb 2021</span>
                </div>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Delivered a 450% revenue turnaround in the Hepatology segment in Year 1 by diagnosing an underperforming territory through dashboard reporting, then expanding HCP coverage and call quality; led a 12-person team across Sindh and Baluchistan.</li>
                  <li>Sustained 175% and 150% year-over-year growth in Gastroenterology in Years 2 and 3 through ongoing territory performance tracking.</li>
                  <li>Designed a monthly SKU-level performance dashboard across four cities, cutting issue-detection time by two weeks.</li>
                  <li>Delivered monthly Best Practices in Sales & Service (BPSS) training, upskilling 12 representatives in consultative selling, CRM/call-reporting data usage, and sales-vs-target tracking.</li>
                </ul>
              </div>

              {/* Getz Pharma */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Getz Pharma | Karachi, Pakistan
                  </h3>
                </div>
                <p className="text-[11px] italic text-[#8d90a0]">
                  Pakistan's leading pharmaceutical company, with a strong specialty care and cardiology portfolio
                </p>
                <div className="flex justify-between items-baseline flex-wrap text-xs">
                  <span className="font-semibold text-white">Area Sales Manager - Key Institutional Accounts</span>
                  <span className="text-[#7bd0ff] font-mono text-[11px]">Jan 2013 - Feb 2018</span>
                </div>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Led 5 Territory Managers across premier institutions (Aga Khan University Hospital, NICVD, JPMC), growing market share by 20% through account and tender data analysis.</li>
                  <li>Secured multi-year government hospital tenders through quarterly territory data analysis; lifted team productivity 30% with weekly KPI reviews and structured coaching.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Analytics Projects */}
          <div className="resume-section">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mb-3 resume-section-title">
              KEY ANALYTICS PROJECTS
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Pharma Commercial Analytics Command Center - Power BI, DAX, SQL, Star Schema (2026)
                </h3>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Built a 7-page Power BI report on a 9-table star schema (4 fact tables, 5 dimensions) spanning 24 months, 20 territories, 128 healthcare accounts, and 6 brands, with 45 DAX measures reconciled line-by-line to source data.</li>
                  <li>Traced 30% of a $4.34M revenue shortfall ($1.31M) to inventory stockouts rather than sales execution, classifying all 20 territories by root cause - supply, competitive, or execution - each mapped to an accountable function; built a month-index key enabling month-over-month and rolling analysis.</li>
                  <li>Accelerated delivery with AI-assisted workflows across DAX development, data validation, and documentation - from raw data to business decisions, faster.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Cyclistic Bikeshare Capstone, Google Data Analytics - R, Tidyverse (2026)
                </h3>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Cleaned and analyzed 4.3M+ trip records in R, applying documented rules to remove zero-duration and over-24-hour rides; found casual riders average 22.8-minute rides vs. 12.1 for members, with 8x seasonal variation against under 3x for members.</li>
                  <li>Delivered five ggplot2 visualizations and three data-backed marketing recommendations, including seasonal membership promotions and e-bike incentives.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  SAP S/4HANA Procure-to-Pay Implementation - SAP MM, FI/CO, IDES Sandbox (2026)
                </h3>
                <ul className="space-y-1 text-xs text-[#c3c6d7] list-disc list-inside">
                  <li>Configured end-to-end procure-to-pay in the IDES sandbox (purchase requisition through vendor payment and GL posting); redesigned approvals to cut simulated procurement cycle time by 18%.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mb-2.5 resume-section-title">
              EDUCATION
            </h2>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="font-bold text-white">MBA, Enterprise Resource Planning (ERP) & SAP</span>
                <span className="text-[#c3c6d7]"> - Maharishi International University, Fairfield, IA (Feb 2026 - Oct 2028)</span>
              </div>
              <div>
                <span className="font-bold text-white">MA Economics (2009); BSc (2003)</span>
                <span className="text-[#c3c6d7]"> - Shah Abdul Latif University, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Certifications & Additional */}
          <div className="resume-section">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mb-2.5 resume-section-title">
              CERTIFICATIONS
            </h2>
            <ul className="space-y-1.5 text-xs text-[#c3c6d7] list-disc list-inside">
              <li>
                <a
                  href="https://www.coursera.org/account/accomplishments/professional-cert/65B5WJ48NS4C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#7bd0ff] underline decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
                >
                  Google Data Analytics Professional Certificate
                </a>{' '}
                - SQL, R, Tableau, Data Cleaning & Visualization (2026)
              </li>
              <li>Sales Management Development Program (Part I & II), TSF (2024)</li>
              <li>Advanced Pharmaceutical Selling Skills, Ferozsons (2023)</li>
              <li>Leadership Development Program, Getz Pharma (2013)</li>
            </ul>

            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mt-4 mb-2.5 resume-section-title">
              AWARDS
            </h2>
            <ul className="space-y-1.5 text-xs text-[#c3c6d7] list-disc list-inside">
              <li>Best Regional Manager, Ferozsons (2023)</li>
              <li>Long Outstanding Service Award, Getz Pharma (2015)</li>
            </ul>

            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7bd0ff] uppercase pb-1 border-b border-[#334155]/60 mt-4 mb-2.5 resume-section-title">
              LANGUAGES
            </h2>
            <ul className="space-y-1.5 text-xs text-[#c3c6d7] list-disc list-inside">
              <li>English, Urdu, Hindi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function ScheduleModal({ isOpen, onClose, onShowToast }: ScheduleModalProps) {
  const [topic, setTopic] = useState('Commercial Analytics & BI Architecture');
  const [duration, setDuration] = useState('30 min');
  const [selectedDate, setSelectedDate] = useState('Next Tuesday');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordCtaClick('schedule', `Drafted Email Request (${topic} - ${duration})`);

    const subject = encodeURIComponent("Commercial Analytics Discussion Request");
    const bodyContent = [
      `Hi Ranjeet,`,
      ``,
      `I would like to connect with you regarding:`,
      ``,
      `Name & Company: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic}`,
      `Duration: ${duration}`,
      `Preferred Window: ${selectedDate}`,
      ``,
      `Looking forward to speaking with you!`,
    ].join('\n');

    const mailtoUrl = `mailto:ranjeetkumarrajanii@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;

    setIsBooked(true);
    onShowToast('Opening your email client to send request to ranjeetkumarrajanii@gmail.com');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-[#00a572]/40 rounded-lg shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4edea3]" />
            <span className="font-heading font-bold text-sm text-white">
              Contact & Schedule via Email
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-[#8d90a0] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#00a572]/20 border border-[#00a572] flex items-center justify-center mx-auto text-[#4edea3]">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Email Client Opened
            </h3>
            <p className="text-xs text-[#c3c6d7] leading-relaxed">
              If your email app did not open automatically, click below to send your request directly to ranjeetkumarrajanii@gmail.com.
            </p>
            <div className="bg-[#171f33] p-3.5 rounded text-xs text-[#dae2fd] border border-[#334155]/60 text-left space-y-1.5 font-mono text-[11px]">
              <div><span className="text-[#8d90a0]">To:</span> ranjeetkumarrajanii@gmail.com</div>
              <div><span className="text-[#8d90a0]">Subject:</span> Commercial Analytics Discussion Request</div>
              <div><span className="text-[#8d90a0]">Topic:</span> {topic} ({duration})</div>
              <div><span className="text-[#8d90a0]">Preferred Window:</span> {selectedDate}</div>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={`mailto:ranjeetkumarrajanii@gmail.com?subject=${encodeURIComponent("Commercial Analytics Discussion Request")}&body=${encodeURIComponent(
                  `Hi Ranjeet,\n\nI would like to connect with you regarding:\n\nName & Company: ${name}\nEmail: ${email}\nTopic: ${topic}\nDuration: ${duration}\nPreferred Window: ${selectedDate}\n\nLooking forward to speaking with you!`
                )}`}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#00a572] hover:bg-[#008f62] rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Send via Email Client</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-[#c3c6d7] hover:text-white bg-[#171f33] border border-[#334155] rounded hover:bg-[#222a3d] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <p className="text-xs text-[#8d90a0]">
              This will create a pre-filled email draft directly to <span className="text-[#4edea3] font-mono">ranjeetkumarrajanii@gmail.com</span> with your meeting focus and availability.
            </p>
            <div>
              <label className="block font-mono text-[#8d90a0] mb-1 uppercase tracking-wider text-[10px]">
                Discussion Focus Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#171f33] border border-[#334155] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00a572]"
              >
                <option value="Commercial Analytics & BI Architecture">Commercial Analytics & BI Architecture</option>
                <option value="SAP S/4HANA & ERP Optimization">SAP S/4HANA & ERP Optimization</option>
                <option value="Field Force & Territory Leadership">Field Force & Territory Leadership</option>
                <option value="Full-Time US Opportunity">Full-Time US Opportunity</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[#8d90a0] mb-1 uppercase tracking-wider text-[10px]">
                  Meeting Duration
                </label>
                <div className="flex gap-1.5">
                  {['15 min', '30 min', '45 min'].map((dur) => (
                    <button
                      type="button"
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`flex-1 py-1.5 rounded font-mono text-[10px] border ${
                        duration === dur
                          ? 'bg-[#00a572]/20 border-[#00a572] text-[#4edea3] font-bold'
                          : 'bg-[#171f33] border-[#334155] text-[#8d90a0]'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#8d90a0] mb-1 uppercase tracking-wider text-[10px]">
                  Preferred Window
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#171f33] border border-[#334155] rounded px-2 py-1.5 text-white focus:outline-none focus:border-[#00a572]"
                >
                  <option value="Next Business Day (Morning)">Next Business Day (Morning)</option>
                  <option value="Next Business Day (Afternoon)">Next Business Day (Afternoon)</option>
                  <option value="Within 48 Hours">Within 48 Hours</option>
                  <option value="This Friday">This Friday</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[#8d90a0] mb-1 uppercase tracking-wider text-[10px]">
                Your Name & Company
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins, VP Commercial Operations"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#171f33] border border-[#334155] rounded px-3 py-2 text-white placeholder-[#64748b] focus:outline-none focus:border-[#00a572]"
              />
            </div>

            <div>
              <label className="block font-mono text-[#8d90a0] mb-1 uppercase tracking-wider text-[10px]">
                Work Email Address
              </label>
              <input
                type="email"
                required
                placeholder="sarah@enterprisepharma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171f33] border border-[#334155] rounded px-3 py-2 text-white placeholder-[#64748b] focus:outline-none focus:border-[#00a572]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#00a572] hover:bg-[#008f62] rounded flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Create Email Draft</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0f172a] border border-[#2563eb]/40 rounded-lg shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326]">
          <div>
            <div className="font-mono text-[10px] text-[#7bd0ff] uppercase tracking-wider">
              {project.categoryTag} • {project.platformBadge}
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              {project.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#8d90a0] hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 bg-[#0b1326]/80 text-[#c3c6d7] text-xs sm:text-sm">
          {/* Business Problem */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#7bd0ff] uppercase tracking-wider mb-2">
              Business Challenge & Context
            </h4>
            <p className="leading-relaxed bg-[#0f172a] p-4 rounded border border-[#1e293b]">
              {project.deepDive.businessContext}
            </p>
          </div>

          {/* Architecture Overview */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#7bd0ff] uppercase tracking-wider mb-2">
              Architecture & Modeling Strategy
            </h4>
            <p className="leading-relaxed bg-[#0f172a] p-4 rounded border border-[#1e293b]">
              {project.deepDive.architectureOverview}
            </p>
          </div>

          {/* Technical Highlights */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#7bd0ff] uppercase tracking-wider mb-2">
              Technical Implementation Highlights
            </h4>
            <ul className="space-y-2 bg-[#0f172a] p-4 rounded border border-[#1e293b]">
              {project.deepDive.technicalHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold">›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet if present */}
          {project.deepDive.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-mono text-xs font-bold text-[#4edea3] uppercase tracking-wider">
                  {project.deepDive.codeSnippet.title}
                </h4>
                <span className="font-mono text-[10px] text-[#8d90a0] uppercase">
                  {project.deepDive.codeSnippet.language}
                </span>
              </div>
              <pre className="bg-[#060e20] p-4 rounded border border-[#1e293b] font-mono text-[11px] text-[#dae2fd] overflow-x-auto leading-relaxed">
                <code>{project.deepDive.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Audited Outcomes */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#7bd0ff] uppercase tracking-wider mb-2">
              Quantitative Results & Impact
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {project.deepDive.results.map((r, i) => (
                <div key={i} className="p-3 bg-[#00a572]/10 border border-[#00a572]/30 rounded text-[#dae2fd] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4edea3] shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1e293b] bg-[#0b1326] flex justify-between items-center">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordCtaClick('project', `DeepDive Repo: ${project.title}`)}
            className="text-xs font-mono text-[#7bd0ff] hover:text-white flex items-center gap-1.5 transition-colors"
            title="View verified GitHub repository (opens in new tab)"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View Source Repository</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2563eb] rounded hover:bg-[#1d4ed8]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface MetricDetailModalProps {
  metric: KpiMetric | null;
  onClose: () => void;
}

export function MetricDetailModal({ metric, onClose }: MetricDetailModalProps) {
  if (!metric) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-[#2563eb]/40 rounded-lg shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326]">
          <div>
            <div className="font-mono text-[10px] text-[#8d90a0] uppercase tracking-wider">
              {metric.category}
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              {metric.title} ({metric.value})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#8d90a0] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs bg-[#0b1326]/80 text-[#c3c6d7]">
          <div>
            <h4 className="font-mono text-[10px] font-bold text-[#7bd0ff] uppercase tracking-wider mb-1">
              Audit Scope
            </h4>
            <p className="bg-[#0f172a] p-3 rounded border border-[#1e293b]">
              {metric.details?.auditScope}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-bold text-[#7bd0ff] uppercase tracking-wider mb-1">
              Verification Methodology
            </h4>
            <p className="bg-[#0f172a] p-3 rounded border border-[#1e293b]">
              {metric.details?.methodology}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-bold text-[#4edea3] uppercase tracking-wider mb-1">
              Quantitative Data Points
            </h4>
            <ul className="space-y-1.5 bg-[#0f172a] p-3 rounded border border-[#1e293b]">
              {metric.details?.dataPoints.map((dp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4edea3] shrink-0 mt-0.5" />
                  <span>{dp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-[#1e293b] bg-[#0b1326] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2563eb] rounded hover:bg-[#1d4ed8]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProfilePhotoModalProps {
  isOpen: boolean;
  avatarUrl: string;
  onClose: () => void;
  onUpdateAvatar: (newUrl: string) => void;
  onResetAvatar: () => void;
  onShowToast: (msg: string) => void;
}

export function ProfilePhotoModal({
  isOpen,
  avatarUrl,
  onClose,
  onUpdateAvatar,
  onResetAvatar,
  onShowToast,
}: ProfilePhotoModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');
  if (!isOpen || !isAdmin) return null;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      onShowToast('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onShowToast('Image exceeds 5MB size limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImgError(false);
        onUpdateAvatar(result);
        onShowToast('Profile picture updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setImgError(false);
    onUpdateAvatar(urlInput.trim());
    onShowToast('Profile picture URL applied!');
    setUrlInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-[#2563eb]/40 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Profile Photo Manager
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#8d90a0] hover:text-white rounded hover:bg-[#171f33]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#0b1326]/90 text-[#dae2fd]">
          {/* Main Portrait Showcase */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-xl overflow-hidden border-2 border-[#2563eb]/60 shadow-[0_0_24px_rgba(37,99,235,0.35)] bg-[#060e20]">
              {!imgError ? (
                <img
                  src={avatarUrl}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-3">
                  <span className="font-mono text-3xl font-extrabold text-[#7bd0ff]">
                    {PERSONAL_INFO.initials}
                  </span>
                  <span className="text-[10px] text-[#8d90a0] mt-1 font-mono">
                    Default Portrait
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs py-1 text-center">
                <span className="text-[10px] font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                  VERIFIED PROFILE
                </span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#171f33] text-[10px] font-mono text-[#7bd0ff] border border-[#2563eb]/30">
                <span>COMMERCIAL ANALYTICS & SAP S/4HANA</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs font-semibold text-[#b4c5ff]">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-xs text-[#8d90a0] font-mono">
                📍 {PERSONAL_INFO.location}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded flex items-center gap-1.5 transition-colors"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload My Picture</span>
                </button>
                <button
                  onClick={onResetAvatar}
                  className="px-3 py-1.5 text-xs font-mono text-[#c3c6d7] hover:text-white bg-[#171f33] hover:bg-[#222a3d] border border-[#334155] rounded flex items-center gap-1.5 transition-colors"
                  title="Reset to default portrait"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Photo Management Tabs */}
          <div className="space-y-3">
            <div className="flex border-b border-[#1e293b]">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 text-xs font-mono font-medium flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-[#2563eb] text-white bg-[#171f33]/40'
                    : 'border-transparent text-[#8d90a0] hover:text-white'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload From Computer</span>
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`px-4 py-2 text-xs font-mono font-medium flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'url'
                    ? 'border-[#2563eb] text-white bg-[#171f33]/40'
                    : 'border-transparent text-[#8d90a0] hover:text-white'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Image Web URL</span>
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                className={`px-4 py-2 text-xs font-mono font-medium flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'presets'
                    ? 'border-[#2563eb] text-white bg-[#171f33]/40'
                    : 'border-transparent text-[#8d90a0] hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
            </div>

            {/* Tab 1: Upload from Computer with Drag & Drop */}
            {activeTab === 'upload' && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#2563eb] bg-[#2563eb]/10'
                    : 'border-[#334155] hover:border-[#2563eb]/60 bg-[#0f172a]/70 hover:bg-[#0f172a]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileProcess(file);
                  }}
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#171f33] border border-[#2563eb]/40 flex items-center justify-center text-[#7bd0ff]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Drag & drop your photo here, or click to browse
                </h4>
                <p className="text-xs text-[#8d90a0] max-w-sm mx-auto">
                  Supports JPG, PNG, WEBP, or GIF up to 5MB. Your picture is saved locally in your browser so it persists across reloads.
                </p>
              </div>
            )}

            {/* Tab 2: Custom URL */}
            {activeTab === 'url' && (
              <form onSubmit={handleApplyUrl} className="space-y-3 bg-[#0f172a] p-4 rounded-xl border border-[#1e293b]">
                <label className="block text-xs font-mono text-[#c3c6d7]">
                  Paste direct image URL (e.g., LinkedIn photo, Google Drive public link, or personal website):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.example.com/ranjeet-photo.jpg"
                    className="flex-1 px-3 py-2 text-xs bg-[#0b1326] border border-[#334155] rounded text-white placeholder-[#64748b] focus:outline-none focus:border-[#2563eb]"
                  />
                  <button
                    type="submit"
                    disabled={!urlInput.trim()}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed rounded"
                  >
                    Apply URL
                  </button>
                </div>
              </form>
            )}

            {/* Tab 3: Presets */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0f172a] p-4 rounded-xl border border-[#1e293b]">
                {PORTRAIT_PRESETS.map((preset) => {
                  const isSelected = avatarUrl === preset.url;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setImgError(false);
                        onUpdateAvatar(preset.url);
                        onShowToast(`Applied ${preset.label} portrait!`);
                      }}
                      className={`flex flex-col items-center p-2.5 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'border-[#2563eb] bg-[#2563eb]/20 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                          : 'border-[#334155] bg-[#0b1326] hover:border-[#64748b] hover:bg-[#171f33]'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border border-[#334155]">
                        <img
                          src={preset.url}
                          alt={preset.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-white line-clamp-1">
                        {preset.label}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono text-[#4edea3] mt-0.5">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Verification Credentials Card */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b] text-xs space-y-2 font-mono">
            <div className="flex justify-between text-[#8d90a0] border-b border-[#1e293b]/70 pb-1.5">
              <span>TENURE:</span>
              <span className="text-white font-semibold">15+ Years Pharmaceutical Sales Leadership</span>
            </div>
            <div className="flex justify-between text-[#8d90a0] border-b border-[#1e293b]/70 pb-1.5">
              <span>ACADEMIC:</span>
              <span className="text-white font-semibold">MBA in ERP & SAP (MIU, USA)</span>
            </div>
            <div className="flex justify-between text-[#8d90a0]">
              <span>CORE DISCIPLINE:</span>
              <span className="text-[#4edea3] font-semibold">Pharma Commercial Ops & Business Intelligence</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#1e293b] bg-[#0b1326] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8d90a0]">
            Photo changes persist locally across sessions
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function CertificateModal({ isOpen, onClose, onShowToast }: CertificateModalProps) {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const certData = {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google Career Certificates via Coursera',
    recipient: 'Ranjeet Kumar Rajani',
    credentialId: '65B5WJ48NS4C',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/65B5WJ48NS4C',
    issuedDate: '2026',
    status: '100% Verified Authentic',
    courses: [
      { id: 1, name: 'Foundations: Data, Data, Everywhere', focus: 'Data ecosystems, analytical thinking, spreadsheets, SQL basics' },
      { id: 2, name: 'Ask Questions to Make Data-Driven Decisions', focus: 'Structured thinking, stakeholder requirements, metrics definition' },
      { id: 3, name: 'Prepare Data for Exploration', focus: 'Data ethics, security, database structure, data integrity' },
      { id: 4, name: 'Process Data from Dirty to Clean', focus: 'Data hygiene, SQL transformation, verification & documentation' },
      { id: 5, name: 'Analyze Data to Answer Questions', focus: 'Complex SQL queries, joins, subqueries, aggregations, calculations' },
      { id: 6, name: 'Share Data Through the Art of Visualization', focus: 'Tableau dashboards, visual design best practices, storytelling' },
      { id: 7, name: 'Data Analysis with R Programming', focus: 'RStudio, Tidyverse, dplyr data manipulation, ggplot2 graphics' },
      { id: 8, name: 'Google Data Analytics Capstone: Complete a Case Study', focus: 'End-to-end analysis of 4.3M Cyclistic bike-share trips with documented deliverables' }
    ],
    skills: [
      'SQL (BigQuery / PostgreSQL)',
      'R & Tidyverse',
      'Tableau',
      'Spreadsheets (Advanced)',
      'Data Cleaning & Validation',
      'ETL Pipelines',
      'Data Storytelling & Dashboards',
      'Business Question Formulation'
    ]
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certData.verificationUrl);
    setCopiedLink(true);
    onShowToast('Verification URL copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(certData.credentialId);
    setCopiedId(true);
    onShowToast('Credential ID copied to clipboard!');
    setTimeout(() => setCopiedId(false), 2500);
  };

  return (
    <div id="certificate-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0f172a] border border-[#00a572]/40 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0b1326]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00a572]/15 border border-[#00a572]/30 flex items-center justify-center text-[#4edea3]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-white">
                  Official Google Credential Verification
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-[#8d90a0]">
                Cryptographically authentic digital certificate issued by Google & Coursera
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8d90a0] hover:text-white rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Certificate Hero Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#0c1f28] via-[#0f172a] to-[#0b1326] border border-[#00a572]/30 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                  <span className="text-xs font-mono font-bold text-[#8d90a0] uppercase tracking-wider ml-1">
                    Google Career Certificate
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-tight mb-1">
                  {certData.title}
                </h3>
                <p className="text-xs text-[#b4c5ff]">
                  Issued to <strong className="text-white">{certData.recipient}</strong> by {certData.issuer}
                </p>
              </div>

              <div className="shrink-0 bg-[#0b1326] p-3 rounded-lg border border-[#1e293b] text-center min-w-[140px]">
                <div className="text-[10px] font-mono text-[#8d90a0] mb-0.5">STATUS</div>
                <div className="text-xs font-bold text-[#4edea3] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Authentic</span>
                </div>
                <div className="text-[10px] font-mono text-[#8d90a0] mt-1 border-t border-[#1e293b] pt-1">
                  Issued: 2026
                </div>
              </div>
            </div>

            {/* Credential ID and Link Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1e293b]/80">
              <div className="flex items-center justify-between bg-[#0b1326]/70 p-2.5 rounded border border-[#1e293b] text-xs font-mono">
                <span className="text-[#8d90a0]">Credential ID:</span>
                <div className="flex items-center gap-2">
                  <code className="text-[#4edea3] font-semibold">{certData.credentialId}</code>
                  <button
                    onClick={handleCopyId}
                    className="p-1 text-[#8d90a0] hover:text-white transition-colors cursor-pointer"
                    title="Copy Credential ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#0b1326]/70 p-2.5 rounded border border-[#1e293b] text-xs font-mono">
                <span className="text-[#8d90a0]">Registry:</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 text-[#7bd0ff] hover:underline cursor-pointer"
                >
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Verification URL'}</span>
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-[#1e293b]/60">
              <a
                href={certData.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-[#00875a] hover:bg-[#00a572] rounded transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Verify on Official Coursera Registry</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 text-xs font-mono text-[#c3c6d7] hover:text-white bg-[#171f33] border border-[#334155] rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Share Credential Link'}</span>
              </button>
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#7bd0ff] uppercase mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#4edea3]" />
              <span>Full 8-Course Rigorous Curriculum Completed</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {certData.courses.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-[#0b1326] border border-[#1e293b] text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#171f33] border border-[#334155] text-[#4edea3] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {c.id}
                    </span>
                    <h5 className="font-semibold text-white leading-tight">{c.name}</h5>
                  </div>
                  <p className="text-[11px] text-[#8d90a0] pl-7">{c.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Badges */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#8d90a0] uppercase mb-2.5">
              Validated Tools & Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {certData.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#171f33] border border-[#222a3d] text-xs text-[#c3c6d7] font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Industry Best Practice Note */}
          <div className="p-4 rounded-lg bg-[#0b1326]/60 border border-[#1e293b] text-xs text-[#8d90a0] space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4edea3]" />
              <span>RECRUITER & EMPLOYER NOTE:</span>
            </div>
            <p>
              In accordance with modern tech industry hiring standards, cryptographic verification via the official Coursera/Google accomplishment registry provides 100% tamper-proof proof of identity, completion, and assessment integrity. You can also download or print the official certificate document directly from the Coursera verification page.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#1e293b] bg-[#0b1326] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8d90a0]">
            Credential ID: {certData.credentialId}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#171f33] hover:bg-[#1e293b] border border-[#334155] rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
