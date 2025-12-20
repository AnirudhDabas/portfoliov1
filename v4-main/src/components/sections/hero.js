import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }
`;

const StyledHeroInner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledHeroImage = styled.div`
  position: relative;

  .img {
    border-radius: 12px;
    filter: grayscale(100%) contrast(1) brightness(90%);
    transition: var(--transition);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const data = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "ani.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 420
            quality: 90
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);

  const image = getImage(data.heroImage);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Anirudh Dabas.</h2>;
  const three = <h3 className="big-heading">I build things.</h3>;
  const four = (
    <p>
      First Year Computer Science Student @ University of Waterloo.{' '}
      <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
        Upstatement
      </a>
      .
    </p>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.newline.co/courses/build-a-spotify-connected-app"
      target="_blank"
      rel="noreferrer">
      Check out Stoody!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <StyledHeroInner>
        <StyledHeroText>
          {prefersReducedMotion ? (
            <>
              {items.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </>
          ) : (
            <TransitionGroup component={null}>
              {isMounted &&
                items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          )}
        </StyledHeroText>

        <StyledHeroImage>
          <GatsbyImage image={image} alt="Anirudh Dabas" className="img" />
        </StyledHeroImage>
      </StyledHeroInner>
    </StyledHeroSection>
  );
};

export default Hero;
