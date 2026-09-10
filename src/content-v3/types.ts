export type ContentStatus = 'DRAFT' | 'RESEARCH' | 'REVIEW' | 'APPROVED';
export type ClaimRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ClaimStatus = 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNVERIFIED' | 'OUTDATED' | 'NEEDS_REVIEW';
export type SourceTier = 1 | 2 | 3;
export type KeywordEvidence = 'SERP_VERIFIED' | 'AUTOCOMPLETE' | 'TRENDS' | 'COMMUNITY' | 'INFERRED';
export type KeywordPriority = 'P1' | 'P2' | 'P3' | 'IGNORE';
export type Difficulty = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';

export interface FAQItem { question: string; answer: string; }
export interface V3Section { id: string; heading: string; purpose: string; claimIds?: string[]; }

export interface ClaimRecord {
  id: string;
  text: string;
  risk: ClaimRisk;
  status: ClaimStatus;
  sourceIds: string[];
  verifiedAt?: string;
  notes?: string;
}

export interface SourceRecord {
  id: string;
  title: string;
  url: string;
  sourceType: 'official-roblox' | 'official-community' | 'developer-announcement' | 'gameplay-capture' | 'community-wiki' | 'guide-site' | 'reddit' | 'youtube' | 'search-result';
  tier: SourceTier;
  publisher: string;
  accessedAt: string;
  notes?: string;
}

export interface KeywordRecord {
  keyword: string;
  normalizedKeyword: string;
  searchIntent: 'brand' | 'navigational' | 'informational' | 'how-to' | 'entity' | 'update' | 'problem-solving';
  topic: string;
  entityOrSystem: string;
  source: KeywordEvidence;
  evidence: string;
  currentPageId?: string;
  recommendedPageId?: string;
  recommendedUrl: string;
  newPageRequired: boolean;
  serpCompetition: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
  difficulty: Difficulty;
  priority: KeywordPriority;
  contentRequirement: string;
  verificationRequirement: string;
  notes?: string;
}

export interface V3ContentRecord {
  pageId: string;
  primaryIntent: string;
  secondaryIntents: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  audience: string[];
  contentResponsibility: string;
  supportedQuestions: string[];
  summary: string;
  sections: V3Section[];
  faq?: FAQItem[];
  relatedPageIds: string[];
  claims: ClaimRecord[];
  status: ContentStatus;
}

export interface RebuildBrief {
  pageId: string;
  currentUrl: string;
  primaryKeyword: string;
  primarySearchIntent: string;
  userQuestion: string;
  verifiedFacts: string[];
  unverifiedClaims: string[];
  claimsToRemove: string[];
  claimsToSoften: string[];
  requiredSources: string[];
  recommendedSections: string[];
  faqOpportunities: string[];
  internalLinks: string[];
  relatedPages: string[];
  seoRisk: ClaimRisk;
  rewritePriority: number;
}
