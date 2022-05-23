import Link from 'next/link';

import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';
import { HeaderType } from '../../data/link';

interface HeaderProps extends HeaderType {}

const Header: React.FC<HeaderProps> = ({ linkName, linkPath }) => {
  return (
    <HeaderWrapper>
      <HomeLink
      // onClick={() => {
      //   window.location.replace('/');
      // }}
      >
        {/* <Link href={linkPath}>&#60; {linkName}</Link> */}
        {/* <Link href={linkPath}>{linkName}</Link> */}
        <Link href="/">&#60; HOME</Link>
      </HomeLink>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  margin-left: 8px;
  margin-top: 3vh;
`;
const HomeLink = styled.div`
  font-size: 2vh;
  font-weight: 800;
  color: ${PALETTE.orange_point};
  margin-left: 8px;
  cursor: pointer;
`;

export default Header;
