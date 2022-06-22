import React, { useState } from 'react';
import { Wrapper } from './style';
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Skeleton, Modal } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const info = () => {
  message.info('It is currently in beta version');
};
const error = (text) => {
  message.error(text);
};
const success = () => {
  message.success('Profile changed!');
};
const Header = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [newData, setNewData] = useState({ fullName: '', password: '' });
  useEffect(() => {
    axios
      .post('https://coursesnodejs.herokuapp.com/user/sign-in', {
        password: Cookies.get('password'),
      })
      .then((res) => {
        setNewData({ ...newData, fullName: res?.data?.data?.user.fullName });
        setData(res?.data?.data?.user);
        setLoading(false);
      });
  }, []);

  // Change User Data
  const changeUserData = () => {
    if (newData.fullName && newData.password) {
      setChangeLoading(true);
      axios
        .put('https://coursesnodejs.herokuapp.com/user/update', newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setVisible(false);
          success();
        })
        .catch((err) => {
          error('Something wrong ! ' + err.message);
        });
    } else error("'Plese fill all Fields'");
  };

  return (
    <Wrapper>
      <Modal
        okText={changeLoading ? <LoadingOutlined /> : 'Change'}
        onOk={changeUserData}
        onCancel={() => setVisible(false)}
        visible={visible}
      >
        <div>
          <label>New Full Name: </label>
          <input
            placeholder={'Full name'}
            value={newData.fullName}
            onChange={(e) =>
              setNewData({ ...newData, fullName: e.target.value })
            }
          />
        </div>
        <div>
          <label>New Password: </label>
          <input
            type='password'
            value={newData.password}
            onChange={(e) =>
              setNewData({ ...newData, password: e.target.value })
            }
            placeholder={'New Passsword'}
          />
        </div>
      </Modal>
      <Wrapper.Container>
        <Wrapper.Top>
          <Wrapper.Header>
            <Wrapper.Top.ProfileImg
              src={
                'https://www.business2community.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg'
              }
            />
            <Wrapper.Top.Edit onClick={() => setVisible(true)} />
            <Wrapper.Top.EditBackgroundWrapper onClick={info}>
              <Wrapper.Top.EditBackground className='icon' />
            </Wrapper.Top.EditBackgroundWrapper>
          </Wrapper.Header>
          <Wrapper.Info>
            {loading ? (
              <Skeleton.Input
                style={{ marginTop: '60px', marginLeft: '20px' }}
                active={loading}
              />
            ) : (
              <Wrapper.Info.Name>{data.fullName}</Wrapper.Info.Name>
            )}
            <Wrapper.Info.Location>
              <EnvironmentOutlined /> Location not available
            </Wrapper.Info.Location>
            <Wrapper.ButtonWrapper>
              <Wrapper.Button
                ml='20'
                bg='0B66C3'
                cl='fff'
                hbg='11, 115, 219'
                onClick={info}
              >
                Account status
              </Wrapper.Button>
              <Wrapper.Button
                ml='10'
                bcl='0B66C3'
                cl='0B66C3'
                hbg='158, 203, 247'
                onClick={info}
              >
                Premium subscription
              </Wrapper.Button>
              <Wrapper.Button
                hbg='214, 212, 212'
                ml='10'
                bcl='666666'
                cl='666666'
                onClick={info}
              >
                More
              </Wrapper.Button>
            </Wrapper.ButtonWrapper>
          </Wrapper.Info>
        </Wrapper.Top>
      </Wrapper.Container>
    </Wrapper>
  );
};

export default Header;
