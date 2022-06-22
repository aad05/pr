import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Wrapper } from './style';
import { data } from '../../utils/navbar';
import UserData from '../../context/userData';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [userData, setUserData] = useContext(UserData);
  const navigate = useNavigate();
  const logOut = () => {
    Cookies.remove('password');
    setUserData({ isAuthed: false, refresh: false });
  };
  return (
    <Wrapper>
      <Wrapper.Navbar>
        <Wrapper.Navbar.Container>
          <Wrapper.Navbar.Items>
            {data.map(({ title, pathname, id }) => (
              <Wrapper.Title key={id}>
                <NavLink
                  to={pathname}
                  style={({ isActive }) =>
                    isActive
                      ? { color: '#46a358', textDecoration: 'none' }
                      : { color: '#000', textDecoration: 'none' }
                  }
                >
                  {title}
                </NavLink>
              </Wrapper.Title>
            ))}
          </Wrapper.Navbar.Items>
          <Wrapper.Title left>
            {userData.isAuthed ? (
              <>
                <Tooltip placement='bottom' title={userData.fullName}>
                  <UserOutlined onClick={() => navigate('/profile')} />
                </Tooltip>
                <Tooltip placement='bottom' title={'Log out'}>
                  <LogoutOutlined
                    onClick={logOut}
                    style={{ marginLeft: '20px' }}
                  />
                </Tooltip>
              </>
            ) : (
              <LoginOutlined onClick={() => navigate('/login')} />
            )}
          </Wrapper.Title>
        </Wrapper.Navbar.Container>
      </Wrapper.Navbar>
      <Outlet />
    </Wrapper>
  );
};

export default Navbar;
