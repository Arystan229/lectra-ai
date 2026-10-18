# Reference study and LECTRA implementation

Reviewed on 2026-10-18:
- https://collanote.com/
- https://collanote.com/app-preview/home.html
- https://collanote.com/resources
- https://collanote.com/help

The interactive library demo shows a persistent subject tree, folder cards,
page thumbnails, grid/list controls, favorites and a Notes/Flashcards/Planners
switch. Opening a note displays a message that the editor lives in the native
app. Therefore this review does not verify native pen latency, palm rejection,
offline AI, collaboration or the complete editing workflow. The help page also
contains an unrelated audiobook answer, so it is not treated as reliable
implementation documentation.

## Applied in LECTRA

- Original warm-paper, muted teal and peach palette, with matching dark mode.
- Actual notebook text/drawing thumbnails, not decorative sample documents.
- Subject cards filter the library; notes, cards and planner are one click away.
- Four page templates: blank, Cornell notes, lecture structure and study week.
  Templates add a page without replacing existing content.
- Pen color presets and editable line, rectangle and ellipse strokes, using
  the existing undo/redo, eraser, movement and persistence system.
- Short 160–180 ms transitions with reduced-motion support. No large page
  animations or continuous background effects.
- Existing three-language interface, file attachments, page settings, cards,
  planner and source-grounded AI remain available.

## Explicit gaps from the native reference

This update is not full CollaNote feature parity. It does not implement 50 pen
engines, universal palm rejection, handwriting OCR/math recognition, word-level
handwriting/audio sync, 90-language selection translation, offline AI, generated
stickers, original-PDF ink overlays, real-time collaboration or iCloud sync.
These need separate implementations, services or native-platform support.
Existing audio time markers and extracted document text are not represented
as equivalent to those features.

## Mobile audio changes

The selected File now appears before browser persistence. IndexedDB writes have
a bounded timeout and abort stalled transactions. If storage fails, the selected
file stays available in memory for download and analysis, with an explicit
session-only warning. Analysis uses that selected file without a second full
IndexedDB read. A sharing-capability exception no longer breaks the import.
The primary picker is a native file input over the upload control.

This addresses observed code failure modes, not a confirmed diagnosis from the
user’s physical iPhone. Network transfer and AI processing still take time.
