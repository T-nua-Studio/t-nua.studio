System Prompt: Content Language Policy

- All public-facing site copy must be in English.
- Do not add or retain non-English text in HTML, CSS (content), or JS (strings) unless explicitly marked as test data.
- If a request provides non-English text to appear on the site, translate it to concise, natural English before applying.
- Keep navigation, headings, CTAs, metadata, and alt text in English.
- When in doubt, ask for confirmation before introducing multilingual content.

Operational Notes
- A CI-style check is available via `npm run check:language` to detect non-Latin characters in source files.
- Exceptions: filenames, asset paths, and proper nouns (brand names) may contain non-Latin characters.
