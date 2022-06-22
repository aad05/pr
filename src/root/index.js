import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { data } from '../utils/navbar';
import Login from '../component/Login';
import Category from '../component/Kutubxona/Category';
import CourseCategory from '../component/Courses/Category';
import Book from '../component/Kutubxona/Category/Book';
import Profile from '../component/Profile';
import UserData from '../context/userData';
import CourseOne from '../component/Courses/Category/Book';

const Root = () => {
  const [userD] = useContext(UserData);
  return (
    <Routes>
      <Route element={<Navbar />}>
        {data.map(({ id, Component, pathname }) => (
          <Route path={pathname} key={id} element={<Component />} />
        ))}
        <Route element={<Category />} path='/library/:categoryName/:id' />
        <Route element={<CourseCategory />} path='/courses/:categoryName/:id' />
        <Route element={<Book />} path='/library/:id' />
        <Route element={<CourseOne />} path='/course/:id' />
        <Route path='/' element={<Navigate to='/library' />} />
        {userD.isAuthed ? (
          <Route path='/profile' element={<Profile />} />
        ) : (
          <Route path='/profile' element={<Navigate to='/login' />} />
        )}
      </Route>
      <Route element={<Login />} path='/login' />
    </Routes>
  );
};

export default Root;
