import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';

export const Wrapper = styled.div``;

Wrapper.Container = styled.div`
  width: 80%;
  margin: auto;
`;
Wrapper.Top = styled.div`
  margin-top: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;
Wrapper.Header = styled.div`
  width: 100%;
  height: 250px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: url(${'https://mention.com/wp-content/uploads/2021/12/2-use-psychically-and-emotionally-pleasant-color-schemes.jpg'});
  position: relative;
`;
Wrapper.Top.ProfileImg = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 3px solid #f0f0f0;
  position: absolute;
  bottom: -50px;
  left: 20px;
`;
Wrapper.Top.Edit = styled(EditOutlined)`
  color: #666666;
  position: absolute;
  right: 20px;
  bottom: -50px;
  font-size: 30px;
  cursor: pointer;
`;
Wrapper.Top.EditBackgroundWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  background: #fff;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    .icon {
      color: #666666;
    }
  }
`;
Wrapper.Top.EditBackground = styled(EditOutlined)`
  color: #0b66c3;
  font-size: 20px;
`;
Wrapper.Info = styled.div``;
Wrapper.Info.Name = styled.div`
  padding-top: 60px;
  padding-left: 20px;
  font-size: 24px;
  font-weight: 500;
`;
Wrapper.Info.Location = styled.div`
  padding-left: 20px;
  font-size: 12px;
  font-weight: 400;
`;
Wrapper.ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 20px;
`;
Wrapper.Button = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 0 10px;
  border-radius: 25px;
  cursor: pointer;
  background: ${({ bg }) => bg && `#${bg}`};
  color: ${({ cl }) => cl && `#${cl}`};
  border: ${({ bcl }) => bcl && `1px solid #${bcl}`};
  margin-left: ${({ ml }) => ml && `${ml}px`};
  transition: background 0.2s linear;
  :hover {
    background: ${({ hbg }) => hbg && `rgb(${hbg})`};
  }
  @media (max-width: 500px) {
    font-size: 10px;
  }
`;
