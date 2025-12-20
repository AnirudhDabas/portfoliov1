import React from 'react';
import styled from 'styled-components';

const BackgroundLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -100;
  pointer-events: none;

  /* Dot pattern (SVG data URL) */
  background-image:
    url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1' fill='%23444'/%3E%3C/svg%3E"),
    linear-gradient(
      160deg,
      rgba(23,25,34,1) 0%,
      rgba(26,32,43,1) 30%,
      rgb(35, 43, 58) 70%,
      rgba(58, 81, 90, 0.75) 100%
    );

  background-size: 30px 30px, cover;
  background-repeat: repeat, no-repeat;
`;

const Background = () => <BackgroundLayer />;

export default Background;
