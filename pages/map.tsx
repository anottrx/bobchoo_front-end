import type { NextPage } from 'next';

import { useEffect } from 'react';

import styled from '@emotion/styled';

// import KakaoMapSection from '../components/map/kakaoMapSection';

import dynamic from 'next/dynamic';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMapSection = dynamic(
  () => import('../components/map/kakaoMapSection'),
  {
    // Do not import in server side
    ssr: false,
  },
);

const Map: NextPage = () => {
  useEffect(() => {
    document.title = '밥추 | 지도';
  }, []);

  return (
    <Container>
      <Wrapper>
        <KakaoMapSection />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

export default Map;
