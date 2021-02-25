import { useContext } from 'react';
import { UserContext, useEffect } from '../../context';
import styled from 'styled-components';

const Div = styled.div`
  padding: 0 20px;
  text-align: center;
  font-size: 1.75rem;
  color: red;
`;

const P = styled.p``;

export const VerifyEmail = () => {
  const userContext = useContext(UserContext);

  const renderVerifyEmail =
    userContext.userState && userContext.userState?.status === 'inactive' ? (
      <Div>
        <P>Please check your Email and verify it to start rating Movies</P>
      </Div>
    ) : null;

  return <>{renderVerifyEmail}</>;
};
