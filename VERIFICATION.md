# Interview Directory Verification Report

**Audit date:** 2026-11-13

**Scope:** All company listing rows in [README.md](README.md)

**Inventory:** 761 listings

## Results

| Classification | Count | Meaning |
| --- | ---: | --- |
| Meets criteria based on a current company source | 4 | An official source describes a practical, role-related process and supports the directory criteria |
| Needs review | 2 | A current source exists, but it does not establish whether the process meets the criteria |
| Historical/unverified | 755 | No qualifying, current company-authored interview-process source was confirmed |

The four confirmed listings are Automattic, DuckDuckGo, Lob, and ThoughtWorks. GitLab and Made Tech need more information; they are not counted as confirmed or as definite violations. Sources and findings are summarized in the README's [interview-process source audit](README.md#interview-process-source-audit).

## Method and limitations

Each listed company was checked for a current, primary source that explicitly describes its interview process. A company careers page, open job listing, old community report, or a description of the company alone was not considered sufficient evidence. When an official source could not be found or did not address whether the process avoids unrelated trivia and coding-platform tests, the entry remained unverified.

The audit verifies evidence, not the experience of every candidate. Processes may vary by role, level, team, location, and date. Unverified does **not** mean a company violates the criteria, has stopped hiring, or should automatically be removed.

## Follow-up

- Prefer adding the official interview-process source and date checked to every entry.
- For first-hand reports, include the approximate interview month/year and role or level, without sharing confidential details.
- Re-check unresolved reports with the company or a recent candidate report before changing their classification.
- Use the monthly `yarn check:listings` workflow to flag dated sources that are more than 12 months old. A fresh date alone does not establish that the source still describes the current process.
