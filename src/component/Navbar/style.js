import styled from 'styled-components';

export const Wrapper = styled.div``;
Wrapper.Navbar = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;
Wrapper.Navbar.Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
`;
Wrapper.Navbar.Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

Wrapper.Title = styled.div`
  margin-right: ${({ left }) => (left ? '0' : '50px')};
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  margin-left: ${({ left }) => left && 'auto'};
`;
