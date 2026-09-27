import { KpiMetric, ProjectItem, ExperienceItem, SkillPillar, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Ranjeet Kumar Rajani",
  initials: "RKR",
  title: "Commercial & Sales Analytics • Pharma Commercial Operations • Business Intelligence",
  tagline: "COMMERCIAL & ANALYTICS",
  bio: "Pharmaceutical commercial leader with 15+ years driving high-velocity sales growth, regional field force operations, and territory strategy and field force effectiveness across Pakistan's leading pharmaceutical companies. Translates deep commercial domain expertise into analytics using Power BI, SQL, R, and SAP S/4HANA to uncover bottom-line revenue opportunities — including uncovering an unfulfilled $1.31M regional stockout gap through Star Schema BI modeling and spearheading a +450% therapeutic portfolio turnaround. Currently an MBA candidate in Enterprise Resource Planning (ERP) & SAP at Maharishi International University in Fairfield, Iowa.",
  email: "ranjeetkumarrajanii@gmail.com",
  phone: "+1 641-233-9348",
  location: "Fairfield, IA, USA",
  statusBanner: "",
  domains: "Commercial & Sales Analytics • Pharma Commercial Operations • Business Intelligence",
  workAuthorization: "",
  avatarUrl: "/ranjeet-headshot.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/ranjeet-rajani/",
    github: "https://github.com/ranjeet-rajani",
    kaggle: "https://www.kaggle.com/ranjeetkumarrajani"
  }
};

export const PORTRAIT_PRESETS = [
  {
    id: "github-verified",
    label: "Verified Profile Photo",
    url: "https://avatars.githubusercontent.com/u/311255447?v=4",
  },
];

export const KPI_METRICS: KpiMetric[] = [
  {
    id: "tenure",
    category: "COMMERCIAL TENURE",
    value: "15+ Years",
    title: "Pharma Sales Leadership",
    description: "Enterprise sales governance, multi-regional operational oversight, and territory commercial orchestration across specialized therapeutics.",
    tags: ["REGIONAL STRATEGY", "PROVEN RECORD"],
    iconType: "growth",
    details: {
      methodology: "Longitudinal commercial leadership across top pharmaceutical corporations (Ferozsons, CCL, Getz Pharma).",
      auditScope: "15+ consecutive calendar years managing multi-tier field hierarchies, P&L budgets, and go-to-market distribution chains.",
      dataPoints: [
        "Led 40+ member cross-functional commercial teams",
        "Managed hospital institutional formularies across major metropolitan hubs",
        "Orchestrated launch of Prulevity gaining 40% initial market share"
      ],
      keyDeliverables: [
        "Commercial P&L ownership and territory quota forecasting",
        "KOL advisory board governance and institutional tender bidding",
        "Field force SFA compliance tracking and incentives modeling"
      ]
    }
  },
  {
    id: "turnaround",
    category: "TURNAROUND EXECUTION",
    badge: "+450% YoY",
    value: "450%",
    title: "Segment P&L Turnaround",
    description: "Turned around a declining hepatology drug portfolio across 4 primary metropolitan areas via clinician micro-targeting and stock velocity modeling.",
    tags: ["HEPATOLOGY DIVISION", "REVERSED DECLINE"],
    iconType: "percent",
    details: {
      methodology: "Data-driven prescriber decile realignment combined with daily distributor inventory replenishment monitoring.",
      auditScope: "Chronically declining hepatology portfolio evaluated over a 12-month turnaround window.",
      dataPoints: [
        "Optimized territory routing and account allocation for 4 primary urban sectors",
        "Zeroed out distributor stockouts using sell-in vs sell-out delta tracking",
        "Surpassed target quota attainment reaching 4.5x historical baseline run-rate"
      ],
      keyDeliverables: [
        "Physician decile classification matrix based on prescription frequency",
        "Weekly distributor inventory buffer optimization model",
        "Sales incentive recalibration boosting tier-1 key account visits"
      ]
    }
  },
  {
    id: "team",
    category: "FIELD FORCE GOVERNANCE",
    value: "40+ Reps",
    title: "Sales Team Management",
    description: "Direct commercial leadership of sales managers and medical representatives. Daily SFA / CRM call coverage alignment and incentive target design.",
    tags: ["MRep SFA SYSTEM", "100% VISIBILITY"],
    iconType: "team",
    details: {
      methodology: "Rigorous operational cadence tracking using mobile SFA/CRM geolocation and electronic call verification.",
      auditScope: "4 Area Sales Managers and 36 Medical Representatives across specialized medical divisions.",
      dataPoints: [
        "Attained 116% annual quota target across 4 regional territories",
        "100% real-time GPS-logged doctor call reporting compliance",
        "Developed structured continuous capability-building curriculum for field teams"
      ],
      keyDeliverables: [
        "Custom Tour Plan scheduling algorithms minimizing inter-hospital transit time",
        "Dynamic bonus calculation framework aligned with SKU-level profitability",
        "Weekly sales performance debriefs and clinician engagement audits"
      ]
    }
  },
  {
    id: "data",
    category: "DATA MODELED & ANALYZED",
    value: "4.3M+",
    title: "Rows Modeled & Mined",
    description: "High-volume data pipelines engineered via Power BI Star Schemas, DAX calculations, SQL relational joins, and R/Tidyverse behavioral engines.",
    tags: ["STAR SCHEMA (9 TBLS)", "45 MEASURES"],
    iconType: "database",
    details: {
      methodology: "Normalized transactional data modeling adhering to Kimball Star Schema principles and vectorized R pipelines.",
      auditScope: "Enterprise sales, supply chain, and transit datasets totaling 4,320,119 records.",
      dataPoints: [
        "Engineered 9-table dimensional model with 45 specialized DAX measures",
        "Eliminated month-indexing gaps using custom Power Query transformation keys",
        "Processed multi-year bikeshare rides isolating 2x duration variance in leisure riders"
      ],
      keyDeliverables: [
        "Automated Power BI commercial dashboard with drill-through anomaly alerts",
        "High-performance SQL queries with CTEs and window functions for MoM analytics",
        "Reproducible R Markdown / Tidyverse data analysis scripts"
      ]
    }
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "pharma-bi",
    title: "Pharma Commercial Analytics Command Center",
    categoryTag: "COMMERCIAL INTELLIGENCE",
    platformBadge: "Power BI",
    categoryType: "powerbi",
    highlightLabel: "-18.4% Variance Identified",
    highlightMetric: "Territory Velocity Index (20 Territories)",
    techStack: ["Power BI", "DAX (45 Measures)", "Star Schema (9 Tables)", "SQL", "Supply Chain BI"],
    bullets: [
      "Reconciled a 7-page commercial report combining target quotas, distributor billing, and inventory velocity across regional depots.",
      "Traced 30% of a $4.34M revenue shortfall ($1.31M) to inventory stockouts rather than sales execution across 20 territories (128 healthcare accounts, 6 brands).",
      "Engineered custom continuous month-index indexing keys in Power Query to eliminate calendar gaps in MoM calculations."
    ],
    githubUrl: "https://github.com/ranjeet-rajani/pharma-commercial-analytics-command-center",
    caseStudyAvailable: true,
    visualType: "chart",
    deepDive: {
      businessContext: "Regional pharmaceutical distribution channels suffered from opaque reporting where management teams could not isolate whether revenue deficits were caused by rep underperformance or regional depot stockouts.",
      architectureOverview: "Constructed a high-performance Star Schema model consisting of 1 central Fact_Sales table and 8 dimension tables (Dim_Date, Dim_Product, Dim_Territory, Dim_Distributor, Dim_Clinician, Dim_Target, Dim_DepotInventory, Dim_Rep) connected to relational SQL data sources.",
      technicalHighlights: [
        "Authored 45 complex DAX calculations including Time-Intelligence YTD, MoM, and Quota Attainment %",
        "Constructed a dynamic outlier detection measure calculating Z-scores on regional stockout frequency",
        "Configured territory-specific reporting views ensuring regional directors have focused access to assigned market partitions",
        "Implemented continuous numeric calendar index keys in Power Query M script to prevent calculation gaps across leap years and holiday closures"
      ],
      codeSnippet: {
        language: "dax",
        title: "DAX: Stockout Impact & Normalized Velocity Index",
        code: `Territory_Stockout_Impact = 
VAR TotalTarget = CALCULATE(SUM(Fact_Targets[TargetRevenue]))
VAR ActualSales = CALCULATE(SUM(Fact_Sales[BilledRevenue]))
VAR StockoutDays = CALCULATE(AVERAGE(Dim_DepotInventory[StockoutDays]))
VAR DepletionRatio = DIVIDE(StockoutDays, 30, 0)
RETURN
IF(
    DepletionRatio > 0.15,
    TotalTarget * DepletionRatio,
    0
)`
      },
      results: [
        "Traced 30% of a $4.34M revenue shortfall ($1.31M) to inventory stockouts rather than sales execution",
        "Automated weekly cross-territory data consolidation across 4 regional sales managers",
        "Deployed as the central commercial reporting system across 20 territories (128 healthcare accounts, 6 brands)"
      ]
    }
  },
  {
    id: "cyclistic",
    title: "Cyclistic Bikeshare Behavioral Study",
    categoryTag: "BEHAVIORAL ANALYTICS",
    platformBadge: "Google Capstone",
    categoryType: "powerbi",
    highlightLabel: "1.9x Variance",
    highlightMetric: "Ride Duration Comparison (Mins)",
    techStack: ["R Programming", "Tidyverse", "ggplot2", "Data Analysis", "Data Cleaning"],
    bullets: [
      "Cleaned, deduplicated, and normalized 4.3M+ raw ride records using high-efficiency R scripts and vector operations.",
      "Isolated consumer leisure usage patterns showing casual riders average 22.8 minutes vs 12.1 minutes for members (1.9x variance) with an 8x summer surge vs stable commute members.",
      "Formulated 3 segmented conversion campaigns targeting weekend casual riders at peak lakefront stations."
    ],
    githubUrl: "https://github.com/ranjeet-rajani/cyclistic-bike-share-analysis",
    caseStudyAvailable: true,
    visualType: "bikeshare",
    deepDive: {
      businessContext: "Cyclistic operates a fleet of 5,800+ bicycles across 692 stations. The strategic goal was to maximize profitability by understanding how casual riders and annual members use bikes differently in order to convert casual riders into high-LTV annual members.",
      architectureOverview: "Processed 12 monthly CSV files spanning an entire fiscal year (4,320,119 raw observations). Developed an end-to-end data pipeline in R utilizing readr, dplyr, lubridate, and ggplot2.",
      technicalHighlights: [
        "Filter pipeline eliminated ride durations < 60 seconds (docking tests) and > 24 hours (lost/stolen anomalies)",
        "Engineered timestamp metrics: ride_length, day_of_week, hour_of_day, and season_index",
        "Comparative duration analysis demonstrated distinct ride duration profiles between casual and member riders",
        "Mapped geographic heatmaps of station pickup densities using sf and ggspatial"
      ],
      codeSnippet: {
        language: "r",
        title: "R / Tidyverse: Data Normalization & Duration Metric Engineering",
        code: `library(tidyverse)
library(lubridate)

# Vectorized transformation & anomaly filtering
clean_rides <- raw_data %>%
  mutate(
    started_at = ymd_hms(started_at),
    ended_at = ymd_hms(ended_at),
    ride_length_mins = as.numeric(difftime(ended_at, started_at, units = "mins")),
    day_of_week = wday(started_at, label = TRUE, abbr = FALSE)
  ) %>%
  filter(ride_length_mins >= 1.0 & ride_length_mins <= 1440.0) %>%
  drop_na(start_station_name, end_station_name)`
      },
      results: [
        "Casual riders averaged 22.8 mins per trip vs 12.1 mins for annual members (1.9x duration variance)",
        "Casual volume spiked 800% during June-August weekends along waterfront recreational corridors",
        "Strategic recommendation: weekend seasonal digital pass with one-click annual membership credit rollout"
      ]
    }
  },
  {
    id: "sap-p2p",
    title: "SAP S/4HANA Procure-to-Pay (P2P) Implementation",
    categoryTag: "ENTERPRISE ERP ARCHITECTURE",
    platformBadge: "SAP S/4HANA",
    categoryType: "sap",
    highlightLabel: "Simulation Verified",
    highlightMetric: "Configured P2P Milestone Flow",
    techStack: ["SAP S/4HANA", "SAP MM Module", "SAP FI/CO Integration", "Workflow BPR", "Master Data Mgmt"],
    bullets: [
      "Configured complete end-to-end P2P document chain from Purchase Requisitions (ME51N) to Goods Receipts (MIGO) and General Ledger postings.",
      "Streamlined approval trees to eliminate a 3-step redundant sign-off bottleneck, shrinking end-to-end simulated procurement turnaround by 18%.",
      "Ensured master data integrity across vendor evaluation models, material master fields, and automatic account assignment rules."
    ],
    githubUrl: "https://github.com/ranjeet-rajani",
    caseStudyAvailable: true,
    visualType: "sapFlow",
    deepDive: {
      businessContext: "Simulated enterprise manufacturing client (IDES AG System 1000) was experiencing extended procurement lead times, vendor invoice reconciliation discrepancies, and lack of real-time visibility between Materials Management and Finance.",
      architectureOverview: "Configured complete organizational structures and transactional document workflows in SAP S/4HANA covering Enterprise Structure (Company Code, Plant, Storage Location, Purchasing Org), Material Master, Business Partner (Vendor Master), and Account Determination (OBYC).",
      technicalHighlights: [
        "Configured document types and number ranges for PR (ME51N), PO (ME21N), GR (MIGO), and IR (MIRO)",
        "Configured Automatic Account Determination (OBYC) for transaction keys BSX, WRX, and PRD ensuring flawless FI/CO integration",
        "Designed and tested two-way and three-way invoice matching tolerances (PP, DQ, and price variances)",
        "Optimized release strategies (Workflow BPR) eliminating non-value-added mid-level supervisory approvals under $10,000 threshold"
      ],
      codeSnippet: {
        language: "text",
        title: "SAP S/4HANA P2P Flow & Transaction Mappings",
        code: `[Step 1] Purchase Requisition (ME51N) -> Account Assignment Category 'K' (Cost Center)
[Step 2] Purchase Order (ME21N)      -> Release Strategy triggered based on PO Value
[Step 3] Goods Receipt (MIGO)         -> Movement Type 101 | Automatic FI: Dr. Inventory (BSX), Cr. GR/IR Clearing (WRX)
[Step 4] Invoice Verification (MIRO)  -> 3-Way Match Verified | Dr. GR/IR Clearing (WRX), Cr. Vendor Payable`
      },
      results: [
        "18% reduction in total purchase order cycle latency across simulated IDES manufacturing operations",
        "100% automated accounting document generation across material receipt and vendor invoice verification",
        "Zero invoice balance variance through strict tolerance limit enforcement"
      ]
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "ferozsons-regional",
    period: "Jul 2024 – Oct 2024",
    duration: "4 MOS",
    company: "Ferozsons Laboratories Ltd. | Karachi, Pakistan",
    role: "Regional Patients Support Manager",
    badges: ["Excel KPI Dashboards", "Resource Allocation", "Team Leadership"],
    bullets: [
      "Built weekly Excel KPI dashboards tracking revenue-vs-target, stock availability, and territory coverage to guide data-driven resource allocation across the regional portfolio.",
      "Directed a team of Zonal Sales Managers, aligning field execution and reporting with revenue targets and compliance standards.",
      "Oversaw MRep call reporting and territory data across the regional portfolio, ensuring consistent KPI tracking and data quality across zones ahead of leadership reviews."
    ]
  },
  {
    id: "ferozsons-sr-zonal",
    period: "Aug 2023 – Jul 2024",
    duration: "1 YEAR",
    company: "Ferozsons Laboratories Ltd. | Karachi, Pakistan",
    role: "Senior Zonal Sales Manager",
    badges: ["Power BI & Excel", "MRep Platform", "Key Account Share"],
    bullets: [
      "Audited sales-vs-target, forecast, and distribution data through the MRep CRM platform, turning reports into Power BI and Excel presentations that guided resource allocation and beat quarterly revenue targets.",
      "Partnered with medical, marketing, and supply chain teams, using product-availability data to eliminate stockouts; analyzed competitor and prescription data monthly to protect key-account share."
    ]
  },
  {
    id: "ferozsons-zonal",
    period: "Feb 2022 – Aug 2023",
    duration: "1.5 YEARS",
    company: "Ferozsons Laboratories Ltd. | Karachi, Pakistan",
    role: "Zonal Sales Manager",
    badges: ["116% Quota Achieved", "40-Person Field Force", "Prulevity Launch"],
    bullets: [
      "Directed a 40-person field sales force, reallocating effort across territories using MRep performance data — exceeded annual quota at 116% in both 2022 and 2023.",
      "Built a territory performance tracker across 30+ healthcare institutions, expanding regional coverage by 25%.",
      "Led the national launch of Prulevity (Prucalopride), prioritizing high-potential accounts through account and territory analysis to capture 40% market share within 12 months.",
      "Implemented a client satisfaction scoring system, lifting customer retention scores by 20%."
    ]
  },
  {
    id: "ccl",
    period: "Feb 2018 – Feb 2021",
    duration: "3 YEARS",
    company: "CCL Pharmaceuticals | Karachi, Pakistan",
    role: "Sales Manager — Speciality Therapeutics",
    badges: ["+450% Turnaround", "SKU Dashboards", "12-Person Team"],
    bullets: [
      "Delivered a 450% revenue turnaround in the Hepatology segment in Year 1 by diagnosing an underperforming territory through dashboard reporting, then expanding HCP coverage and call quality; led a 12-person team across Sindh and Baluchistan.",
      "Sustained 175% and 150% year-over-year growth in Gastroenterology in Years 2 and 3 through ongoing territory performance tracking.",
      "Designed a monthly SKU-level performance dashboard across four cities, cutting issue-detection time by two weeks.",
      "Delivered monthly Best Practices in Sales & Service (BPSS) training, upskilling 12 representatives in consultative selling, CRM/call-reporting data usage, and sales-vs-target tracking."
    ]
  },
  {
    id: "getz",
    period: "Jan 2013 – Feb 2018",
    duration: "5 YEARS",
    company: "Getz Pharma | Karachi, Pakistan",
    role: "Area Sales Manager — Key Institutional Accounts",
    badges: ["Premier Hospitals", "Govt Tenders", "+30% Productivity"],
    bullets: [
      "Led 5 Territory Managers across premier institutions (Aga Khan University Hospital, NICVD, JPMC), growing market share by 20% through account and tender data analysis.",
      "Secured multi-year government hospital tenders through quarterly territory data analysis; lifted team productivity 30% with weekly KPI reviews and structured coaching."
    ]
  }
];

export const SKILL_PILLARS: SkillPillar[] = [
  {
    id: "analytics",
    title: "Analytics & BI",
    subtitle: "DATA MODELING & QUANT",
    description: "Architecting scalable analytical engines, relational star schemas, and automated reporting pipelines from disparate enterprise data feeds.",
    iconType: "analytics",
    skills: [
      "Power BI Desktop & Service",
      "DAX (Calculated Columns/Measures)",
      "Power Query (M Language)",
      "SQL (Complex Joins & CTEs)",
      "R (Tidyverse & ggplot2)",
      "Tableau Desktop",
      "Advanced Excel (Power Pivot)",
      "Predictive Modeling"
    ],
    masteryLabel: "ANALYTICS MASTERY DEPTH",
    masteryValue: "95% • PRODUCTION READY",
    percent: 95,
    accentColor: "#3b82f6"
  },
  {
    id: "erp",
    title: "ERP & Enterprise Systems",
    subtitle: "SAP S/4HANA & GOVERNANCE",
    description: "Configuring enterprise resource planning modules, optimizing cross-functional procurement workflows, and enforcing master data standards.",
    iconType: "erp",
    skills: [
      "SAP S/4HANA Core",
      "SAP MM (Materials Mgmt)",
      "SAP FI/CO Integration",
      "SAP PP (Production Planning)",
      "Procure-to-Pay (P2P) Flow",
      "Business Process Re-engineering",
      "Master Data Governance (MDG)",
      "IDES Environment"
    ],
    masteryLabel: "ERP WORKFLOW CONFIGURATION",
    masteryValue: "90% • ENTERPRISE GRADE",
    percent: 90,
    accentColor: "#38bdf8"
  },
  {
    id: "commercial",
    title: "Commercial Operations",
    subtitle: "SALES STRATEGY & P&L",
    description: "Maximizing territory quota yield, motivating multi-tier field teams, orchestrating hospital formulary inclusion, and designing incentive payout matrices.",
    iconType: "commercial",
    skills: [
      "Sales Forecasting & Quotas",
      "Territory Design & Coverage Planning",
      "MRep CRM & SFA Governance",
      "P&L / Budget Oversight",
      "KOL & HCP Engagement",
      "Incentive Compensation Design",
      "Institutional Tender Bidding",
      "Supply Chain Velocity"
    ],
    masteryLabel: "COMMERCIAL LEADERSHIP",
    masteryValue: "98% • 15+ YEARS COMMERCIAL LEADERSHIP",
    percent: 98,
    accentColor: "#10b981"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: "mba",
    locationCategory: "FAIRFIELD, IA • USA",
    degree: "MBA in Enterprise Resource Planning (ERP) & SAP",
    institution: "Maharishi International University",
    description: "Advanced graduate curriculum concentrated on enterprise SAP S/4HANA integration, corporate systems design, supply chain operational management, and data-driven corporate business intelligence.",
    footerLeft: "KEYSTONE: SAP S/4HANA",
    footerRight: "EXPECTED OCT 2028",
    iconType: "grad",
    badgeColor: "#3b82f6"
  },
  {
    id: "google-cert",
    locationCategory: "PROFESSIONAL CERTIFICATION",
    degree: "Google Data Analytics Professional Certificate",
    institution: "Google • Coursera Verified Credential",
    description: "Comprehensive 8-course rigorous program covering full data lifecycles: analytical question formulation, SQL relational data querying, R programming, data transformation, and presentation to business stakeholders.",
    footerLeft: "R • SQL • TABLEAU",
    footerRight: "CERTIFIED",
    iconType: "cert",
    badgeColor: "#10b981",
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/65B5WJ48NS4C",
    credentialId: "65B5WJ48NS4C"
  },
  {
    id: "economics",
    locationCategory: "PAKISTAN",
    degree: "Master of Arts in Economics & Bachelor of Science",
    institution: "Shah Abdul Latif University",
    description: "Rigorous econometric foundation focusing on microeconomic price theory, macroeconomic forecasting, capital allocation models, quantitative statistical methods, and market equilibrium analysis.",
    footerLeft: "ECONOMETRIC MODELING",
    footerRight: "COMPLETED",
    iconType: "trend",
    badgeColor: "#38bdf8"
  }
];
