import { css } from 'styled-components';

const variables = css`
  :root {
    /* ===== Backgrounds ===== */
    --bg-dark: #1E2428;
    --bg-light: #ECEFF4;

    /* Map template vars to new theme */
    --dark-navy: #161b1f;
    --navy: var(--bg-dark);
    --light-navy: #232a2f;
    --lightest-navy: #2b343a;
    --navy-shadow: rgba(30, 36, 40, 0.7);

    /* ===== Text ===== */
    --dark-slate: #3a444a;
    --slate: #b8c1c8;
    --light-slate: #d5dbe0;
    --lightest-slate: #eceff4;
    --white: #f4f6f8;

    /* ===== Accent ===== */
    --green: rgb(142, 209, 199);
    --green-tint: rgba(142, 209, 199, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;

    /* ===== Fonts ===== */
    --font-sans: mundial, 'Inter', -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    /* ===== Font Sizes ===== */
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    /* ===== Layout ===== */
    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    /* ===== Animation ===== */
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
