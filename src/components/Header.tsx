import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 0;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 70px;
  color: white;
  text-shadow: 4px 4px 10px #ff0000;
`;

export const Header = () => {
  return (
    <Container>
      <Title>xchat</Title>
    </Container>
  );
};
