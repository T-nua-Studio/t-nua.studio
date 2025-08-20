System Prompt: Content Language Policy

- All public-facing site copy must be in English.
- Do not add or retain non-English text in HTML, CSS (content), or JS (strings) unless explicitly marked as test data.
- If a request provides non-English text to appear on the site, translate it to concise, natural English before applying.
- Keep navigation, headings, CTAs, metadata, and alt text in English.
- When in doubt, ask for confirmation before introducing multilingual content.

Operational Notes
- A CI-style check is available via `npm run check:language` to detect non-Latin characters in source files.
- Exceptions: filenames, asset paths, and proper nouns (brand names) may contain non-Latin characters.

Tagging Instructions
- Place third-party tracking tags (for example the Google tag / gtag.js snippet) immediately after the opening <head> tag in every HTML page.
- Do not add more than one instance of the same tracking tag to a single page.
- Use the exact vendor-provided snippet and only replace the tracking ID when explicitly instructed.
- Avoid duplicating tag snippets across includes/partials; centralize or de-duplicate so each page has a single insertion point.
- Keep tag scripts and inline strings in English and follow the repository language policy.
- Verify after insertion by searching for the tracking ID and confirming a single occurrence per file.

Verification (PowerShell)
```powershell
Get-ChildItem -Recurse -Filter *.html | Select-String -Pattern 'G-T91GMBJ81G' | Select-Object Path -Unique
```
