# Privacy compliance operations

This document supports, but does not replace, legal review.

## Processing inventory

| Activity | Data | Purpose / legal basis | Recipient / location | Default retention |
| --- | --- | --- | --- | --- |
| Contact enquiries | Name, email, project type, message | Respond or take pre-contract steps; GDPR 6(1)(b) | T-NUA email provider; provider location must be recorded in the vendor register | 24 months after last meaningful interaction |
| Hosting/security logs | IP, user agent, URL, timestamp | Security and availability; legitimate interests, 6(1)(f) | Hosting/security providers; confirm in vendor register | Shortest operational period, target 30–90 days |
| Consent preference | Categories, policy version, date | Prove and honour choice; legal obligation/legitimate interests | User device only | Until cleared or replaced |
| Google Analytics | Device, IP-derived region, pages and interactions | Audience measurement; consent, 6(1)(a) | Google; international safeguards to be documented | Configure the shortest useful GA retention |
| YouTube/Vimeo embeds | IP, device/browser and page context | Display external portfolio media; consent, 6(1)(a) | Google/YouTube or Vimeo | Controlled by provider policy |
| Email and backups | Enquiry correspondence | Business continuity and legal claims; contract/legitimate interests | Email and backup providers | Align live and backup deletion schedules |

Google Fonts were removed from page templates. Three.js remains a functional CDN dependency and must be included in the vendor/transfer review or self-hosted in a future dependency update.

## Required organisational actions

1. Record the legal entity name, business address, responsible privacy contact, hosting provider, email provider, backup provider, GA property settings and every processor/subprocessor.
2. Execute processor agreements and document transfer mechanisms before enabling a new contact-form provider. The website currently opens the visitor's own email client and does not submit to a hidden form processor.
3. Review whether GDPR Article 27 requires an EU representative and document the conclusion.
4. Confirm the post-Amendment 13 Israeli database registration/notification position. A small enquiry list is not assumed to require registration, but remains subject to the law.
5. Keep an access list, review permissions, use multi-factor authentication, patch systems, document backups and maintain an incident register.
6. Handle access/correction/deletion/objection requests through `inf@t-nua.studio`; verify identity proportionately and log dates, decisions and responses.
7. For a suspected serious Israeli database security incident, preserve evidence, assess immediately and report to the Israeli Privacy Protection Authority when the reporting threshold is met. Assess GDPR supervisory-authority and affected-person notification separately.
8. Obtain accountant confirmation of the average annual turnover and retain it with the accessibility compliance record.

## Release checklist

- Legal counsel approves the public policy wording and controller identity.
- Vendor register, DPAs and transfer safeguards are complete.
- GA data retention and data-sharing settings are minimised.
- Contact and privacy inboxes are monitored.
- Policy version in `js/privacy.js` is changed whenever consent-relevant processing changes.
- Accessibility statement is updated after manual audit and whenever known limitations change.
