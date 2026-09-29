---
title: Document Intake Extractor (Invoices, Leases, Contracts)
summary: Uploaded invoices, leases, and contracts are parsed into structured fields with a confidence score on each one, then written to your tracker — low-confidence fields flagged for a person.
order: 3
industry: Property management & finance
pillars: [automation, integration]
stack: [n8n, Claude, Google Sheets, OCR]
governance:
  - Per-field confidence scores
  - Low-confidence fields highlighted for manual review
  - Original document linked to every record for audit
  - Dollar thresholds route large invoices to an approver
measures:
  - Minutes per document (before vs after)
  - Field-level error rate on a weekly sample
  - Days from receipt to entry
repo: https://github.com/Bizgrowth/Upwork-Projects/tree/main/mvp3-document-processor
---

## The problem

Finance and operations teams re-key data from invoices, commercial leases, and vendor contracts into spreadsheets and accounting systems. It's slow, it's error-prone, and important dates and obligations get missed.

## How it works

1. A document arrives by upload, email attachment, or a watched Drive folder. PDFs are converted to text first.
2. Claude extracts the fields for that document type — vendor, invoice number, amount due; or parties, effective date, governing law, key obligations, and termination terms.
3. Each field gets a confidence score. Anything below the threshold is highlighted for a person.
4. The record is appended to the tracking sheet (or pushed to accounting) with a link back to the original.

## Where it fits

Property management is a natural first home: leases, vendor invoices, insurance certificates, and work orders are high-volume, rules-based, and costly when missed.
