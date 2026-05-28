/**
 * ExitIntentReviewPopup.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in exit-intent layer for Keshav Enterprises website.
 *
 * HOW TO USE IN App.jsx:
 *   1. Import this file:
 *        import ExitIntentReviewPopup from './ExitIntentReviewPopup';
 *        import KeshavReviewForm      from './KeshavEnterprises_ReviewForm_v2';
 *
 *   2. Inside your App() return, add the wrapper ONCE at the very end
 *      (just before the closing </div>):
 *        <ExitIntentReviewPopup ReviewForm={KeshavReviewForm} />
 *
 * EXPERT EXIT-INTENT LOGIC (multi-signal):
 *   • Desktop  — mouseleave toward the browser top chrome (cursor y < threshold)
 *   • Mobile   — visibilitychange, but only after tab is hidden for > 8 s
 *                (short WhatsApp checks are ignored — that's normal behaviour)
 *   • Inactivity — 8-minute idle timer reset on any user interaction
 *   • Scroll depth — ALL signals require the user to have scrolled ≥ 60 % of page
 *                    (popup never fires on a shallow bounce)
 *   • Rapid back-navigation — popstate fires faster than normal browsing
 *   • pagehide NOT used — fires on every SPA navigation, redundant noise
 *   • Smart suppression:
 *       – Never shows more than once per session (sessionStorage flag)
 *       – Never shows within 90 s of page load (let user settle)
 *       – Respects explicit "don't show again" choice (localStorage, 30 days)
 *       – Never shows on the contact page (App.jsx POPUP_EXCLUDED_PATHS)
 *       – Dismissed automatically after form submission
 *
 * POPUP CONTENT:
 *   Lightweight teaser only (star rating + optional comment).
 *   Full KeshavReviewForm is NOT loaded inside the popup — it would
 *   be overwhelming for someone who just came to browse. A "Leave a
 *   full review" link navigates to /contact for users who want to say more.
 *   The ReviewForm prop is kept for API compatibility but is no longer rendered.
 *
 * PROPS:
 *   ReviewForm  (required) — kept for API compatibility; not rendered in popup
 *   minTimeMs   (optional) — minimum ms before popup can fire (default 90000)
 *   idleMs      (optional) — inactivity ms before popup fires (default 480000)
 *   scrollPct   (optional) — scroll depth % required to unlock firing (default 60)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/* ── Constants ──────────────────────────────────────────────────── */
const SESSION_KEY   = 'ke_exit_shown_v1';       // shown this session?
const SUPPRESS_KEY  = 'ke_exit_suppress_v1';    // "don't show again" timestamp
const SUPPRESS_DAYS = 30;                        // days to honour that choice
const MOUSE_THRESH  = 20;                        // px from top to trigger desktop

/* ── Helpers ────────────────────────────────────────────────────── */
function isSuppressed() {
  try {
    const ts = localStorage.getItem(SUPPRESS_KEY);
    if (!ts) return false;
    return Date.now() - Number(ts) < SUPPRESS_DAYS * 864e5;
  } catch { return false; }
}

function markSuppressed() {
  try { localStorage.setItem(SUPPRESS_KEY, String(Date.now())); } catch { /* quota */ }
}

function markShownThisSession() {
  try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode */ }
}

function wasShownThisSession() {
  try { return !!sessionStorage.getItem(SESSION_KEY); } catch { return false; }
}

/* ── Keyframe CSS — injected once at module load, not on every render ── */
if (typeof document !== 'undefined') {
  const STYLE_ID = 'ke-exit-intent-styles';
  if (!document.getElementById(STYLE_ID)) {
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
      @keyframes ke-backdrop-in  { from { opacity: 0 } to { opacity: 1 } }
      @keyframes ke-backdrop-out { from { opacity: 1 } to { opacity: 0 } }
      @keyframes ke-panel-in     { from { opacity: 0; transform: translateY(10px) scale(.99) }
                                   to   { opacity: 1; transform: translateY(0)    scale(1)   } }
      @keyframes ke-panel-out    { from { opacity: 1; transform: translateY(0)    scale(1)   }
                                   to   { opacity: 0; transform: translateY(6px)  scale(.99) } }
      .ke-exit-close-btn:hover  { background: #f1f5f9 !important; color: #0f172a !important; }
      .ke-exit-later-btn:hover  { background: #f1f5f9 !important; }
      .ke-exit-suppress:hover   { opacity: .85; }
    `;
    document.head.appendChild(s);
  }
}

/* ── Component ──────────────────────────────────────────────────── */
export default function ExitIntentReviewPopup({
  ReviewForm,
  minTimeMs  = 90_000,
  idleMs     = 480_000,
  scrollPct  = 60,
  navigate,                // SPA router — if provided, "full review" link uses it
}) {
  const [open,     setOpen]     = useState(false);
  const [closing,  setClosing]  = useState(false);   // for exit animation
  const [dontShow, setDontShow] = useState(false);   // checkbox state
  const [submitted, setSubmitted] = useState(false); // form submitted
  // Ref mirror of dontShow — lets dismiss() always read the latest value
  // regardless of when the useCallback was last re-created.
  const dontShowRef = useRef(false);

  const mountedAt     = useRef(Date.now());
  const firedRef      = useRef(false);               // single-fire gate
  const idleTimer     = useRef(null);
  const overlayRef    = useRef(null);
  const closeButtonRef = useRef(null);
  const scrollDepthRef = useRef(false);              // true once user has scrolled ≥ scrollPct

  /* ── Single-fire gate ─────────────────────────────────────────── */
  const tryFire = useCallback((reason) => {
    if (firedRef.current)                              return; // already shown
    if (wasShownThisSession())                         return; // shown earlier
    if (isSuppressed())                                return; // user opted out
    if (Date.now() - mountedAt.current < minTimeMs)   return; // too early
    if (!scrollDepthRef.current)                       return; // user hasn't scrolled far enough

    firedRef.current = true;
    markShownThisSession();
    console.debug('[ExitIntent] triggered via:', reason);
    setOpen(true);

    // Move focus into the overlay for accessibility
    setTimeout(() => closeButtonRef.current?.focus(), 120);
  }, [minTimeMs]);

  /* ── Idle timer ───────────────────────────────────────────────── */
  const resetIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => tryFire('idle'), idleMs);
  }, [tryFire, idleMs]);

  /* ── Close helpers ────────────────────────────────────────────── */
  const dismiss = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 320);
    // Read the ref so this is always current even when called from a timeout
    // (e.g. the 2.2 s post-submit auto-dismiss) without needing dontShow in deps.
    if (dontShowRef.current) markSuppressed();
  }, []); // stable — no deps needed because we read via ref

  const handleSubmitSuccess = useCallback(() => {
    setSubmitted(true);
    setTimeout(dismiss, 2200); // dismiss is stable (reads dontShow via ref)
  }, [dismiss]);

  /* ── Effect: attach all exit-intent signals ───────────────────── */
  useEffect(() => {
    /* Desktop: mouse leaves toward top chrome */
    const onMouseLeave = (e) => {
      if (e.clientY < MOUSE_THRESH) tryFire('mouseleave-top');
    };

    /* Mobile: tab hidden / home button / app switcher
     * Guard: only fire if the tab has been hidden for > 8 s.
     * A quick WhatsApp check typically returns in < 5 s — that's normal
     * behaviour, not exit intent. We start a timer on hide; cancel on show. */
    let hiddenTimer = null;
    const HIDDEN_GRACE_MS = 8_000;
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenTimer = setTimeout(() => tryFire('visibilitychange-prolonged'), HIDDEN_GRACE_MS);
      } else {
        // User came back within the grace window — cancel
        clearTimeout(hiddenTimer);
      }
    };

    /* pagehide: intentionally NOT used as an exit-intent trigger.
     * It fires on every SPA navigation (popstate handles that) and
     * makes the page bfcache-ineligible if we do real work inside it.
     * App.jsx already registers an empty pagehide listener for bfcache. */

    /* Scroll depth: once user has seen ≥ scrollPct % of the page, unlock firing */
    const onScroll = () => {
      if (scrollDepthRef.current) return;
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      if (pct >= scrollPct) {
        scrollDepthRef.current = true;
        // Don't fire immediately — wait for a later exit-intent signal
      }
    };

    /* Rapid back-navigation (popstate fires when history.back() is called).
     * tryFire already requires scrollDepthRef to be true, so no extra guard needed. */
    const onPopState = () => tryFire('back-navigation');

    /* Idle reset events */
    const IDLE_EVENTS = ['mousemove','keydown','scroll','click','touchstart'];
    IDLE_EVENTS.forEach(ev => window.addEventListener(ev, resetIdle, { passive: true }));
    resetIdle(); // start the clock

    /* Attach all signals */
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onPopState);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      clearTimeout(hiddenTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', onPopState);
      IDLE_EVENTS.forEach(ev => window.removeEventListener(ev, resetIdle));
      clearTimeout(idleTimer.current);
    };
  }, [tryFire, resetIdle, scrollPct]);

  /* ── Trap focus inside overlay while open ─────────────────────── */
  useEffect(() => {
    if (!open) return;
    const el = overlayRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    const onKeyDown = (e) => {
      if (e.key === 'Escape') { dismiss(); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };

    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [open, dismiss]);

  /* ── Nothing to render ────────────────────────────────────────── */
  if (!open) return null;

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share your feedback with Keshav Enterprises"
        ref={overlayRef}
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        style={{
          position:        'fixed',
          inset:           0,
          zIndex:          99999,
          background:      'rgba(15,23,42,.45)',
          backdropFilter:  'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          padding:         '16px',
          animation:       closing
            ? 'ke-backdrop-out .32s ease forwards'
            : 'ke-backdrop-in  .25s ease forwards',
        }}
      >
        {/* ── Panel ── */}
        <div
          style={{
            position:     'relative',
            width:        '100%',
            maxWidth:     540,
            maxHeight:    '92dvh',
            overflowY:    'auto',
            borderRadius: 18,
            background:   '#ffffff',
            boxShadow:    '0 32px 80px rgba(0,0,0,.38), 0 0 0 1px rgba(0,0,0,.06)',
            animation:    closing
              ? 'ke-panel-out .32s cubic-bezier(.4,0,.2,1) forwards'
              : 'ke-panel-in  .30s cubic-bezier(.22,1,.36,1) forwards',
          }}
        >

          {/* ── Attention banner ── */}
          {!submitted && (
            <div style={{
              background:   'linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)',
              borderRadius: '18px 18px 0 0',
              padding:      '22px 24px 18px',
              position:     'relative',
              overflow:     'hidden',
            }}>
              {/* Decorative rings */}
              <div style={{
                position: 'absolute', right: -24, top: -24,
                width: 120, height: 120, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,.18)',
              }} />
              <div style={{
                position: 'absolute', right: -8, top: -8,
                width: 80, height: 80, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,.12)',
              }} />

              {/* Calm label — no pulse dot */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,.6)',
                }}>
                  Quick feedback
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 21, fontWeight: 800, color: '#ffffff',
                margin: 0, lineHeight: 1.25,
              }}>
                How was your experience<br />
                <span style={{ color: '#bfdbfe' }}>with Keshav Enterprises?</span>
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13, color: 'rgba(255,255,255,.75)',
                margin: '8px 0 0', lineHeight: 1.5,
              }}>
                Your feedback takes 2 minutes and helps us serve you better.
                Rate our products, services, or report an issue.
              </p>

              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={dismiss}
                aria-label="Close feedback popup"
                className="ke-exit-close-btn"
                style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 32, height: 32, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,.25)',
                  background: 'rgba(255,255,255,.12)',
                  color: '#ffffff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .18s, color .18s',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 18, fontWeight: 300, lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* ── Form or Thank-you ── */}
          <div style={{ padding: submitted ? 32 : 0 }}>
            {submitted ? (
              /* Thank-you screen after submit */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#f0fdf4', border: '2px solid #bbf7d0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 28,
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 8px',
                }}>
                  Thank you!
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14, color: '#64748b', margin: 0, lineHeight: 1.6,
                }}>
                  Your review has been submitted. We truly appreciate<br />
                  you taking the time to share your experience.
                </p>
              </div>
            ) : (
              /*
               * Lightweight teaser — just a star rating + optional one-liner.
               * Keeps the popup under 30 s to interact with. On submit we show
               * the thank-you screen; a "Leave a full review" link opens the
               * review form page directly for users who want to say more.
               */
              <PopupTeaserForm onSubmitSuccess={handleSubmitSuccess} onDismiss={dismiss} navigate={navigate} />
            )}
          </div>

          {/* ── "Don't show again" footer ── */}
          {!submitted && (
            <div style={{
              padding: '10px 20px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #f1f5f9',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              <label
                className="ke-exit-suppress"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  cursor: 'pointer', userSelect: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11.5, color: '#94a3b8',
                  transition: 'opacity .15s',
                }}
              >
                <input
                  type="checkbox"
                  checked={dontShow}
                  onChange={e => { setDontShow(e.target.checked); dontShowRef.current = e.target.checked; }}
                  style={{ accentColor: '#1d4ed8', width: 13, height: 13 }}
                />
                Don't show this again for 30 days
              </label>

              <button
                type="button"
                onClick={dismiss}
                className="ke-exit-later-btn"
                style={{
                  background: 'none', border: '1px solid #e2e8f0',
                  borderRadius: 8, padding: '5px 14px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 12, fontWeight: 600, color: '#64748b',
                  cursor: 'pointer', transition: 'background .15s',
                }}
              >
                Maybe later
              </button>
            </div>
          )}

        </div>{/* /panel */}
      </div>{/* /backdrop */}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PopupTeaserForm
   Lightweight 2-field form: star rating + optional one-liner comment.
   Submits to Web3Forms (same key as the full review form).
   A "Leave a full review" link navigates to the /review page for
   users who want to say more — keeps the popup itself friction-free.
   ───────────────────────────────────────────────────────────────── */
const STARS = [1, 2, 3, 4, 5];
const STAR_LABELS = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
// Same key used in KeshavEnterprises_ReviewForm_v2 — safe to share (tied to email, not a password)
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY_HERE';

if (process.env.NODE_ENV !== 'production' && WEB3FORMS_KEY === 'YOUR_WEB3FORMS_KEY_HERE') {
  console.warn(
    '[ExitIntentReviewPopup] WEB3FORMS_KEY is still a placeholder. ' +
    'Get a free key at https://web3forms.com and replace it before deploying.'
  );
}

function PopupTeaserForm({ onSubmitSuccess, onDismiss, navigate }) {
  const [rating,    setRating]    = useState(0);
  const [hovered,   setHovered]   = useState(0);
  const [comment,   setComment]   = useState('');
  const [busy,      setBusy]      = useState(false);
  const [error,     setError]     = useState('');

  const active = hovered || rating;

  const handleSubmit = useCallback(async () => {
    if (!rating) { setError('Please select a star rating.'); return; }
    setError('');
    setBusy(true);
    try {
      const body = new FormData();
      body.append('access_key', WEB3FORMS_KEY);
      body.append('subject',    `Keshav Enterprises — Quick popup rating: ${rating}/5`);
      body.append('rating',     String(rating));
      body.append('comment',    comment.trim() || '(none)');
      body.append('source',     'exit-intent-popup');
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      if (!res.ok) throw new Error('Network error');
      onSubmitSuccess();
    } catch {
      setError('Submission failed — please try again.');
    } finally {
      setBusy(false);
    }
  }, [rating, comment, onSubmitSuccess]);

  const ff = "'Outfit', sans-serif";

  return (
    <div style={{ padding: '20px 24px 4px' }}>
      {/* Star radio group — native <input type="radio"> gives arrow-key navigation
          and correct screen reader semantics for free. Visually hidden inputs +
          styled SVG labels provide the custom star appearance. */}
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 6px' }}>
        <legend style={{
          display: 'block', fontFamily: ff, fontSize: 11.5, fontWeight: 700,
          color: '#64748b', marginBottom: 10, textAlign: 'center', width: '100%',
        }}>
          Overall experience <span aria-hidden="true" style={{ color: '#ef4444' }}>*</span>
          <span className="sr-only"> (required)</span>
        </legend>
        <div
          style={{ display: 'flex', justifyContent: 'center', gap: 4 }}
          onMouseLeave={() => setHovered(0)}
        >
          {STARS.map(n => (
            <label
              key={n}
              aria-label={`${n} star${n > 1 ? 's' : ''} — ${STAR_LABELS[n - 1]}`}
              style={{
                cursor: 'pointer',
                transition: 'transform .12s',
                transform: active >= n ? 'scale(1.18)' : 'scale(1)',
                display: 'inline-flex',
              }}
              onMouseEnter={() => setHovered(n)}
            >
              <input
                type="radio"
                name="ke-popup-rating"
                value={n}
                checked={rating === n}
                onChange={() => { setRating(n); setError(''); }}
                required
                style={{
                  // Visually hidden but still in the a11y tree and focusable
                  position: 'absolute', width: 1, height: 1,
                  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap',
                }}
              />
              <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
                  fill={active >= n ? '#f59e0b' : '#e2e8f0'}
                  stroke={active >= n ? '#d97706' : '#cbd5e1'}
                  strokeWidth="1"
                />
              </svg>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Star label */}
      <p style={{
        fontFamily: ff, fontSize: 12, color: '#64748b',
        textAlign: 'center', margin: '0 0 14px', minHeight: 18,
        transition: 'opacity .15s', opacity: active ? 1 : 0,
      }}>
        {active ? STAR_LABELS[active - 1] : ''}
      </p>

      {/* Optional comment */}
      <textarea
        placeholder="Anything specific to share? (optional)"
        value={comment}
        onChange={e => setComment(e.target.value)}
        maxLength={280}
        rows={2}
        aria-label="Optional comment"
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '9px 12px', borderRadius: 8,
          border: '1.5px solid #e2e8f0', fontFamily: ff,
          fontSize: 13, color: '#0f172a', background: '#f8fafc',
          resize: 'none', outline: 'none', lineHeight: 1.5,
          marginBottom: error ? 6 : 14,
        }}
      />

      {/* Inline error */}
      {error && (
        <p role="alert" style={{
          fontFamily: ff, fontSize: 12, color: '#ef4444',
          margin: '0 0 10px',
        }}>{error}</p>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={busy}
        style={{
          width: '100%', padding: '11px 0', borderRadius: 9,
          background: rating ? '#1d4ed8' : '#94a3b8',
          color: '#ffffff', border: 'none', cursor: rating ? 'pointer' : 'default',
          fontFamily: ff, fontSize: 14, fontWeight: 700,
          transition: 'background .2s, opacity .2s',
          opacity: busy ? 0.7 : 1, marginBottom: 12,
        }}
      >
        {busy ? 'Sending…' : 'Send feedback'}
      </button>

      {/* Full-form link */}
      <p style={{ fontFamily: ff, fontSize: 12, color: '#94a3b8', textAlign: 'center', margin: '0 0 4px' }}>
        Want to say more?{' '}
        <a
          href="#/contact"
          style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 600 }}
          onClick={(e) => {
            e.preventDefault();
            // Dismiss the popup first so it doesn't sit on top of the contact page.
            // Then navigate via the SPA router if available, falling back to hash.
            onDismiss?.();
            if (navigate) navigate('/contact');
            else window.location.hash = '/contact';
          }}
        >
          Leave a full review
        </a>
      </p>
    </div>
  );
}

