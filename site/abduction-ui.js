(function () {
  'use strict';

  const TWITTER_URL = 'https://x.com/abductiongame';
  const DOCS_URL = 'https://github.com/abductiongame/abduction/tree/main/docs';

  const ui = document.createElement('div');
  ui.id = 'abduction-ui';
  ui.innerHTML = `
    <nav id="ab-bottom-bar" aria-label="Abduction links">
      <a id="ab-docs" href="${DOCS_URL}" target="_blank" rel="noopener noreferrer" aria-label="Read Abduction documentation">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
        Documentation
      </a>
      <a id="ab-twitter" href="${TWITTER_URL}" target="_blank" rel="noopener noreferrer" aria-label="Follow Abduction on X">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.37l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        @abductiongame
      </a>
    </nav>
  `;

  document.body.appendChild(ui);
})();
