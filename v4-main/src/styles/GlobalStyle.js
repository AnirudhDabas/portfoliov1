import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  /* =======================
     Cursor control (GLOBAL)
     ======================= */

  html,
  body {
    cursor: none;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    background-color: var(--navy);
    color: var(--slate);
    font-family: mundial, sans-serif;
    font-size: var(--fz-xl);
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
  }

  /* =======================
     Base resets
     ======================= */

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
  }

  /* =======================
     Focus styles (keyboard)
     ======================= */

  :focus-visible {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* =======================
     Scrollbar
     ======================= */

  html {
    scrollbar-width: thin;
    scrollbar-color: var(--dark-slate) var(--navy);
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--navy);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--dark-slate);
    border: 3px solid var(--navy);
    border-radius: 10px;
  }

  /* =======================
     Typography
     ======================= */

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px;
    font-weight: 600;
    color: var(--lightest-slate);
    line-height: 1.1;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition);
  }

  button,
  input,
  textarea {
    cursor: none;
    border-radius: 0;
    outline: none;
  }

  /* =======================
     Layout
     ======================= */

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;
  }

  section {
    margin: 0 auto;
    padding: 100px 0;
    max-width: 1000px;
  }

  /* =======================
     Utilities
     ======================= */

  ${TransitionStyles};
  ${PrismStyles};
`;

export default GlobalStyle;
