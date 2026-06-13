import { useEffect, useRef, useState } from 'react';
import '../styles/Chatbot.css';

const welcomeMessage = {
  role: 'assistant',
  content:
    "Hi friend! 🌈 I'm Bubble — ask me about our programs, timings, location, or fun activities!",
};

const quickQuestions = [
  { emoji: '🎒', text: 'What age groups do you accept?' },
  { emoji: '⏰', text: 'What are the school timings?' },
  { emoji: '📍', text: 'Where is Tiny Bubble located?' },
  { emoji: '🎨', text: 'What activities do you do?' },
];

function ChildAvatar({ size = 34 }) {
  // Friendly child face SVG
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      className="chatbot__child-svg"
    >
      <defs>
        <linearGradient id="tbHair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="tbSkin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fde4cf" />
          <stop offset="100%" stopColor="#fbcfa3" />
        </linearGradient>
      </defs>
      {/* Hair back */}
      <path
        d="M10 30c0-13 10-22 22-22s22 9 22 22v6c0 2-2 3-4 3H14c-2 0-4-1-4-3z"
        fill="url(#tbHair)"
      />
      {/* Face */}
      <circle cx="32" cy="34" r="18" fill="url(#tbSkin)" />
      {/* Hair fringe */}
      <path
        d="M14 28c4-8 12-12 18-12s14 4 18 12c-4-2-9-3-14-3-7 0-15 1-22 3z"
        fill="url(#tbHair)"
      />
      {/* Cheeks */}
      <circle cx="22" cy="40" r="2.8" fill="#fb7185" opacity="0.55" />
      <circle cx="42" cy="40" r="2.8" fill="#fb7185" opacity="0.55" />
      {/* Eyes */}
      <circle cx="25" cy="34" r="2.2" fill="#1e293b" />
      <circle cx="39" cy="34" r="2.2" fill="#1e293b" />
      <circle cx="25.7" cy="33.3" r="0.7" fill="#fff" />
      <circle cx="39.7" cy="33.3" r="0.7" fill="#fff" />
      {/* Smile */}
      <path
        d="M26 43c2 2.5 4 3.5 6 3.5s4-1 6-3.5"
        stroke="#1e293b"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1c-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.4-.6-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.3 8.3 0 1 1 7 3.8z" />
    </svg>
  );
}

// Detects when the bot is deflecting to admission contact
const ADMISSION_TRIGGERS = [
  /call our admission team/i,
  /please call .* 82878/i,
  /call .* \+?91[\s-]?82878/i,
  /82878\s?39782/,
  /i can only help with tiny bubble/i,
  /reach our team/i,
  /i (don't|do not|cannot|can't) (have|provide|share|answer|know|confirm)/i,
  /i'?m (not sure|unsure)/i,
  /please reach (out to )?(our|the) (school|team|office)/i,
];

function needsAdmissionCta(content) {
  if (!content) return false;
  return ADMISSION_TRIGGERS.some((rx) => rx.test(content));
}

// Detects when the bot is talking about location / address / directions
const LOCATION_TRIGGERS = [
  /sk-?137/i,
  /sector\s*116/i,
  /noida/i,
  /\baddress\b/i,
  /\blocation\b/i,
  /\bdirections?\b/i,
  /google maps/i,
  /how to reach/i,
  /where (is|are) (we|the school|tiny bubble)/i,
];

function needsLocationCta(content) {
  if (!content) return false;
  return LOCATION_TRIGGERS.some((rx) => rx.test(content));
}

const MAP_COORDS = '28.568299,77.398063';
const MAPS_URL = `https://www.google.com/maps?q=${MAP_COORDS}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS}`;

function LocationCta() {
  return (
    <div className="chatbot__cta chatbot__cta--location" role="group" aria-label="Open school location">
      <div className="chatbot__cta-title">
        <span aria-hidden="true">📍</span> Tiny Bubble Pre-School
      </div>
      <p className="chatbot__cta-text">SK-137, Sector 116, Noida</p>
      <div className="chatbot__cta-actions">
        <a
          className="chatbot__cta-btn chatbot__cta-btn--map"
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPinIcon /> Open on Google Maps
        </a>
        <a
          className="chatbot__cta-btn chatbot__cta-btn--dir"
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}

function AdmissionCta() {
  return (
    <div className="chatbot__cta" role="group" aria-label="Contact Tiny Bubble admissions">
      <div className="chatbot__cta-title">
        <span aria-hidden="true">🎓</span> Talk to our admission team
      </div>
      <p className="chatbot__cta-text">
        Mon–Sat · 8:30 AM – 2:00 PM
      </p>
      <div className="chatbot__cta-actions">
        <a className="chatbot__cta-btn chatbot__cta-btn--call" href="tel:+918287839782">
          <PhoneIcon /> Call 82878 39782
        </a>
        <a
          className="chatbot__cta-btn chatbot__cta-btn--wa"
          href="https://wa.me/918287839782?text=Hi%2C%20I%27d%20like%20to%20know%20about%20admissions%20at%20Tiny%20Bubble%20Pre-School."
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    </div>
  );
}

// Lightweight markdown renderer: **bold**, *italic*, bullet lines, line breaks
function renderMarkdown(text) {
  const lines = text.split('\n');
  const blocks = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: 'list', items: listBuffer });
      listBuffer = [];
    }
  };

  lines.forEach((rawLine, i) => {
    const line = rawLine.trimEnd();
    const bulletMatch = line.match(/^\s*[\*\-•]\s+(.*)$/);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[1]);
    } else {
      flushList();
      if (line.trim() === '') {
        blocks.push({ type: 'br', key: i });
      } else {
        blocks.push({ type: 'p', text: line });
      }
    }
  });
  flushList();

  const inline = (str) => {
    // Bold **text**
    const parts = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    let k = 0;
    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.slice(lastIndex, match.index));
      }
      parts.push(<strong key={`b-${k++}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < str.length) parts.push(str.slice(lastIndex));
    return parts;
  };

  return blocks.map((block, i) => {
    if (block.type === 'br') return <div key={`br-${i}`} className="chatbot__md-break" />;
    if (block.type === 'list') {
      return (
        <ul key={`ul-${i}`} className="chatbot__md-list">
          {block.items.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={`p-${i}`} className="chatbot__md-p">
        {inline(block.text)}
      </p>
    );
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTeaser, setShowTeaser] = useState(true);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-open once after 2 seconds
  useEffect(() => {
    if (hasAutoOpened) return undefined;
    const timer = setTimeout(() => {
      setOpen(true);
      setHasAutoOpened(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  // Hide teaser bubble once panel opens
  useEffect(() => {
    if (open) setShowTeaser(false);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    inputRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, open]);

  async function sendMessage(text) {
    const content = text.trim();
    if (!content || loading) return;

    const userMessage = { role: 'user', content };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message !== welcomeMessage)
            .slice(-10),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.message) {
        throw new Error(data.error || 'The assistant is unavailable right now.');
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.message },
      ]);
    } catch (requestError) {
      // Network/server failure — append a friendly assistant message
      // with the admission CTA instead of a hard error.
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            "I'm having trouble reaching the school right now. For this, please call our admission team at +91 82878 39782 during school hours.",
        },
      ]);
      // Optionally keep a subtle error log for debugging
      console.warn('Chat request failed:', requestError?.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <div className="chatbot">
      {open && (
        <section
          className="chatbot__panel"
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Tiny Bubble"
        >
          <header className="chatbot__header">
            <div className="chatbot__identity">
              <span className="chatbot__avatar" aria-hidden="true">
                <ChildAvatar size={32} />
              </span>
              <span>
                <strong>Bubble 🌈</strong>
                <small>
                  <span className="chatbot__status-dot" />
                  Your Tiny Bubble buddy
                </small>
              </span>
            </div>
            <button
              type="button"
              className="chatbot__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              title="Close chat"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="chatbot__messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chatbot__row chatbot__row--${message.role}`}
              >
                {message.role === 'assistant' && (
                  <span className="chatbot__bubble-avatar" aria-hidden="true">
                    <ChildAvatar size={28} />
                  </span>
                )}
                <div className="chatbot__bubble-stack">
                  <div
                    className={`chatbot__message chatbot__message--${message.role}`}
                  >
                    {message.role === 'assistant'
                      ? renderMarkdown(message.content)
                      : message.content}
                  </div>
                  {message.role === 'assistant' &&
                    needsLocationCta(message.content) && <LocationCta />}
                  {message.role === 'assistant' &&
                    needsAdmissionCta(message.content) && <AdmissionCta />}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="chatbot__suggestions">
                <p className="chatbot__suggestions-title">✨ Try asking:</p>
                {quickQuestions.map((q) => (
                  <button
                    type="button"
                    key={q.text}
                    onClick={() => sendMessage(q.text)}
                  >
                    <span aria-hidden="true">{q.emoji}</span> {q.text}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="chatbot__row chatbot__row--assistant">
                <span className="chatbot__bubble-avatar" aria-hidden="true">
                  <ChildAvatar size={28} />
                </span>
                <div
                  className="chatbot__message chatbot__message--assistant chatbot__typing"
                  aria-label="Bubble is thinking"
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {error && (
              <div className="chatbot__error" role="alert">
                {error}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="chatbot__composer" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              rows="1"
              value={input}
              maxLength="500"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              title="Send message"
            >
              <SendIcon />
            </button>
          </form>

          <p className="chatbot__notice">
            For fees and confirmed admissions, call{' '}
            <a href="tel:+918287839782">82878 39782</a>.
          </p>
        </section>
      )}

      <div className="chatbot__launcher-wrap">
        {!open && showTeaser && (
          <button
            type="button"
            className="chatbot__teaser"
            onClick={() => setOpen(true)}
            aria-label="Ask a query"
          >
            <span className="chatbot__teaser-text">Ask a query!</span>
            <span className="chatbot__teaser-tail" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          className={`chatbot__launcher${open ? ' chatbot__launcher--open' : ''}`}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label={open ? 'Close Tiny Bubble chat' : 'Chat with Tiny Bubble'}
          title={open ? 'Close chat' : 'Ask a query'}
        >
          {open ? (
            <span aria-hidden="true">×</span>
          ) : (
            <>
              <ChildAvatar size={42} />
              <span className="chatbot__launcher-pulse" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
