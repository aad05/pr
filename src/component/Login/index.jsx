import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import UserData from '../../context/userData';
import { useNavigate } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [showSign, setShowSign] = useState('sign-up-mode');
  const [sendingRequest, setSendingRequest] = useState(false);
  const [userInfo, setUserData] = useContext(UserData);
  const [data, setData] = useState({
    fullName: '',
    singUpPassword: '',
    password: '',
  });

  const error = (text) => {
    message.error(text);
  };

  const cookieRegistartion = () => {
    const password = Cookies.get('password');
    if (password === 'student2') {
      axios
        .post(`${process.env.REACT_APP_MAIN_EMPLOYEE_URL}/sign-in`, {
          password,
        })
        .then((res) => {
          const { token } = res.data.data;
          const { fullName } = res.data.data.employee;
          localStorage.setItem('token', token);
          setUserData({
            ...userInfo,
            fullName,
            isAuthed: true,
            isAdmin: true,
          });
          navigate('/library');
          Cookies.set('password', password);
        })
        .catch(() => {});
    } else {
      axios
        .post(`${process.env.REACT_APP_MAIN_URL}/user/sign-in`, {
          password,
        })
        .then((res) => {
          const { token } = res.data.data;
          const { fullName } = res.data.data.user;
          localStorage.setItem('token', token);
          setUserData({
            ...userInfo,
            fullName,
            isAuthed: true,
          });
          navigate('/library');
          Cookies.set('password', password);
        })
        .catch(() => {
          setSendingRequest(false);
        });
    }
  };

  useEffect(() => {
    cookieRegistartion();
  }, []);

  const singUp = () => {
    const { fullName, singUpPassword } = data;
    if (fullName.length !== 0 && singUpPassword.length !== 0) {
      setSendingRequest(true);
      axios
        .post(`${process.env.REACT_APP_MAIN_URL}/user/sign-up`, {
          fullName,
          password: singUpPassword,
        })
        .then((res) => {
          setSendingRequest(false);
          const { token, fullName: ResponseFullName } = res.data.data;
          localStorage.setItem('token', token);
          setUserData({
            ...userInfo,
            fullName: ResponseFullName,
            isAuthed: true,
          });
          navigate('/library');
          Cookies.set('password', singUpPassword);
        })
        .catch(() => {
          error('User already signed up !');
          setSendingRequest(false);
        });
    } else error('Please fill all fields!');
  };
  const signIn = () => {
    const { password } = data;

    if (password === 'student2') {
      setSendingRequest(true);
      axios
        .post(`${process.env.REACT_APP_MAIN_EMPLOYEE_URL}/sign-in`, {
          password,
        })
        .then((res) => {
          setSendingRequest(false);
          const { token } = res.data.data;
          const { fullName } = res.data.data.employee;
          localStorage.setItem('token', token);
          setUserData({
            ...userInfo,
            fullName,
            isAuthed: true,
            isAdmin: true,
          });
          navigate('/library');
          Cookies.set('password', password);
        })
        .catch(() => {
          error('Password wrong !');
          setSendingRequest(false);
        });
    } else {
      if (password.length === 0) error('Fill password!');
      else {
        setSendingRequest(true);
        axios
          .post(`${process.env.REACT_APP_MAIN_URL}/user/sign-in`, {
            password,
          })
          .then((res) => {
            setSendingRequest(false);
            const { token } = res.data.data;
            const { fullName } = res.data.data.user;
            localStorage.setItem('token', token);
            setUserData({
              ...userInfo,
              fullName,
              isAuthed: true,
            });
            navigate('/library');
            Cookies.set('password', password);
          })
          .catch(() => {
            error('Password wrong !');
            setSendingRequest(false);
          });
      }
    }
  };
  return (
    <div className={`container ${showSign}`}>
      <div className='forms-container'>
        <div className='signin-signup'>
          <div action='#' className='sign-in-form form'>
            <h2 className='title'>Sign in</h2>
            <div className='input-field'>
              <input
                name='password'
                autoComplete='off'
                type='password'
                placeholder='Password'
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button className='btn' onClick={signIn}>
              {sendingRequest ? <LoadingOutlined /> : 'Sign in'}
            </button>
          </div>
          <div className='sign-up-form form'>
            <h2 className='title'>Sign up</h2>
            <div className='input-field'>
              <input
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                name='fullName'
                placeholder='Full Name'
                value={data.fullName}
              />
            </div>

            <div className='input-field'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={data.singUpPassword}
                onChange={(e) =>
                  setData({ ...data, singUpPassword: e.target.value })
                }
              />
            </div>
            <button className='btn' onClick={singUp}>
              {sendingRequest ? <LoadingOutlined /> : 'Sign up'}
            </button>
          </div>
        </div>
      </div>

      <div className='panels-container'>
        <div className='panel left-panel'>
          <div className='content'>
            <h3>Bu yerda yangimisiz ?</h3>
            <p>
              Bizga hali xam qo'shilmaganmisiz unda hoziroq o'z akkauntingizni
              yaratishingiz mumkin. Bizga qo'shilishingiz atiga 30 soniya vaqt
              oladi &#128526;
            </p>
            <button
              className='btn transparent'
              onClick={() => setShowSign('sign-up-mode')}
              id='sign-up-btn'
            >
              Sign up
            </button>
          </div>
          <img src='img/log.svg' className='image' alt='' />
        </div>
        <div className='panel right-panel'>
          <div className='content'>
            <h3>Bizga oldin qo'shilganmisiz ?</h3>
            <p>
              Bizga oldin qo'shilgan bo'lsangiz sizni anchadan beri kutayotgan
              edik &#128525;. Hoziroq qayta qo'shilib oling !? &#128519;
            </p>
            <button
              className='btn transparent'
              onClick={() => setShowSign('sign-in-mode')}
              id='sign-in-btn'
            >
              Sign in
            </button>
          </div>
          <img src='img/register.svg' className='image' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Login;
