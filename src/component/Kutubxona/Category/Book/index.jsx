import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from 'antd';
import { Wrapper } from './style';
import { useParams } from 'react-router';

const Book = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://coursesnodejs.herokuapp.com/user/book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res?.data?.data);
      });
  }, []);

  return (
    <Wrapper>
      <Wrapper.TitleContainer>
        <Wrapper.Title>
          Book: {loading ? <Skeleton.Input active={loading} /> : data.name}
        </Wrapper.Title>
      </Wrapper.TitleContainer>
      <Wrapper.Card>
        {loading ? (
          <Skeleton.Image style={{ width: '400px', height: '300px' }} />
        ) : (
          <Wrapper.Card.Image
            src={`https://coursesnodejs.herokuapp.com/${data.imgUrl}`}
          />
        )}
        <Wrapper.RightSide>
          <Wrapper.RightSide.Title>
            <Wrapper.RightSide.Span>Name: </Wrapper.RightSide.Span>
            {loading ? <Skeleton.Input active={loading} /> : data.name}
          </Wrapper.RightSide.Title>
          <Wrapper.RightSide.Title>
            <Wrapper.RightSide.Span>Description: </Wrapper.RightSide.Span>{' '}
            {loading ? <Skeleton.Input active={loading} /> : data.description}
          </Wrapper.RightSide.Title>
          <Wrapper.RightSide.Title>
            <Wrapper.RightSide.Span>
              Source for download:{' '}
            </Wrapper.RightSide.Span>{' '}
            {loading ? (
              <Skeleton.Input active={loading} />
            ) : (
              <a
                href='https://asaxiy.uz/product/knigi/asaxiybooks_kitoblari/%D2%B3ans-rosling-faktdorlik-predzakaz'
                target='_blank'
                rel='noreferrer'
              >
                {' '}
                More{' '}
              </a>
            )}
          </Wrapper.RightSide.Title>
        </Wrapper.RightSide>
      </Wrapper.Card>
    </Wrapper>
  );
};

export default Book;
