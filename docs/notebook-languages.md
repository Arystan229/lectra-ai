# Languages and subject notebooks

The interface supports Russian, English and Simplified Chinese. The language
selector is in the top bar on desktop, tablet and phone. Changing it saves the
current notebook and reloads the editor. It is blocked during recording or an
active request. Notebook content, subject names and imported files are not
translated when switching the interface language.

The Subject tab groups a notebook under a subject and sets A4, A5 or Letter
paper, with blank, ruled, grid or dotted backgrounds. Apply to this subject’s
notebooks copies the settings to existing notebooks and sets subject defaults.
Notes use continuous paper with automatic sheet guides and a sheet counter;
these are not separate rich-text documents or a word processor’s print layout.
Explicit notebook pages remain available for separate topics.

The note toolbar provides image, link and file insertion. Images are embedded
in the rich text. PDF, DOCX, PPTX, TXT, MD, CSV and XLSX attachments are stored
locally with a download link (10 MB per file). Supported documents can also be
opened in Sources to extract their text. PowerPoint is an attachment and a
text source, not an embedded slide editor. PDF originals can be opened in the
browser. CSV and XLSX are retained for download, without spreadsheet editing.

Full backups include attached originals. Attachments and drawings are preserved
when accepting a generated combined-note draft. HTML print exports show the
names of attached files; use a backup to transfer their original contents.

## Verification

- `node tests/frontend-paper.cjs`: subject settings, expanding/shrinking paper,
  attachment downloads and text extraction, reload persistence, backup restore
  in a fresh browser context, attachment retention in combined drafts, language
  persistence and 360/820 px layouts.
- `node tests/frontend-product.cjs`: existing pages, versions, sources, cards,
  planner, search and responsive navigation.
- `node tests/frontend-notebook.cjs`: editing, drawings, generated-note fixture
  insertion and recovery.

Browser tests use local Streamlit and Chrome. Responsive viewport tests do not
replace testing on physical iOS and Android devices. AI behavior in editor tests
uses explicit fixtures, not live Gemini calls.
