import styled from 'styled-components';
import { Card } from 'antd';
const { Meta } = Card;

export const Wrapper = styled.div`
  margin-top: 20px;
`;
Wrapper.Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: ${({ create }) => (create ? '12px' : '24px')};
`;

Wrapper.Books = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  @media (min-width: 600px) {
    .card {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 900px) {
    .card {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .cardone {
    @media (min-width: 1200px) {
      width: 400px;
    }
  }
  .edit {
    margin-right: auto;
  }
`;
Wrapper.Pagination = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
`;
Wrapper.CardInside = styled.div`
  display: flex;
  .edit {
    margin-left: 10px;
    cursor: pointer;
  }
`;
Wrapper.ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1800px) {
    font-size: 18px;
  }
`;

Wrapper.Meta = styled(Meta)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
Wrapper.TitleContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
