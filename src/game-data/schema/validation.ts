export type ValidationSeverity = 'ERROR' | 'WARNING';

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  recordId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export class GameDataValidationError extends Error {
  readonly issues: ValidationIssue[];

  constructor(issues: ValidationIssue[]) {
    super(issues.map((issue) => `[${issue.code}] ${issue.message}`).join('\n'));
    this.name = 'GameDataValidationError';
    this.issues = issues;
  }
}
