import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Arrow = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
`;

const LeftArrow = styled(Arrow)`
  left: 24px;
`;

const RightArrow = styled(Arrow)`
  right: 24px;
`;

const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const CarouselContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MainWrapper = styled.div`
  max-width: 100vw;
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* height: auto; */
`;

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <MainWrapper>
      <CarouseContainer>
        <CarouselWrapper>
          <LeftArrow onClick={prev}>&lt;</LeftArrow>
          <CarouselContentWrapper>
            <RightArrow onClick={next}>&gt;</RightArrow>
            <CarouselContent
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children}
            </CarouselContent>
          </CarouselContentWrapper>
        </CarouselWrapper>
      </CarouseContainer>
    </MainWrapper>
  );
};
