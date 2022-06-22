import styled from 'styled-components';
import { Modal } from 'antd';

export const Wrapper = styled.div`
  width: 100%;
`;
Wrapper.Container = styled.div``;

Wrapper.Modal = styled(Modal)`
  .ant-modal-close-x {
    display: none;
  }
`;
