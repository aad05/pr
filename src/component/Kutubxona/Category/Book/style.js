import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 20px;
`;
Wrapper.Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: ${({ create }) => (create ? '12px' : '24px')};
`;
Wrapper.TitleContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
Wrapper.Card = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
Wrapper.Card.Image = styled.img`
  width: 400px;
  height: 300px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
Wrapper.RightSide = styled.div``;
Wrapper.RightSide.Title = styled.div`
  margin-left: 20px;
  font-size: 16px;
  margin-top: 10px;
`;
Wrapper.RightSide.Span = styled.span`
  font-size: 13px;
`;
