import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Modal, message, Upload, Dropdown, Menu } from 'antd';
import { Wrapper } from './style';
import {
  EditOutlined,
  LoadingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  EllipsisOutlined,
  EyeOutlined,
  ExceptionOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import UserData from '../../../context/userData';
import { useParams, useNavigate } from 'react-router';

const Category = () => {
  const [updateMesage, setUpdateMessage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [data, setData] = useState([]);
  const [userD, setUserData] = useContext(UserData);
  const [loading, setLoading] = useState(true);
  const [selectData, setSelectData] = useState({
    name: '',
  });
  const [postD, setPostData] = useState({
    description: '',
  });
  const { id, categoryName } = useParams();
  const navigate = useNavigate();

  const error = (text) => {
    message.error(text);
  };
  const success = (text) => {
    message.success(text);
  };
  let imgUrl = null;

  // Purpose: Get data
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_MAIN_URL}/user/course/oneCourseParts/${id}`,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
      .then((res) => {
        setLoading(false);
        setData(res?.data?.data?.courses);
      })
      .catch((err) => {
        error('Something wrong ! ' + err.message);
        setLoading(false);
      });
  }, [userD.refresh]);
  // Purpose: Show Modal for Edit
  const onEdit = () => {
    setVisible(true);
  };

  // Purpose: Update card by ID
  const Update = () => {
    if (postD.description) {
      setUpdateMessage(true);
      axios
        .put(
          `https://coursesnodejs.herokuapp.com/employee/courseParts`,
          {
            _id: selectData._id,
            imgUrl: imgUrl || 'img/img-a463268af6f271bc3adac0871d505b4a.jpg',
            courseId: id,
            videoUrl: imgUrl || 'img/img-a463268af6f271bc3adac0871d505b4a.jpg',
            description: postD.description,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then(() => {
          setUpdateMessage(false);
          setVisible(false);
          setUserData({ ...userD, refresh: !userD.refresh });
        })
        .catch(() => {
          error('Ooops, something is wrong!');
          setUpdateMessage(false);
        });
    } else error('Please fill all fields!');
  };

  // Purpose: Post new card
  const postData = () => {
    if (postD.description) {
      setUpdateMessage(true);
      axios
        .post(
          'https://coursesnodejs.herokuapp.com/employee/courseParts',
          {
            ...postD,
            imgUrl: imgUrl || 'img/img-a463268af6f271bc3adac0871d505b4a.jpg',
            videoUrl: imgUrl || 'img/img-a463268af6f271bc3adac0871d505b4a.jpg',
            courseId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(() => {
          setUpdateMessage(false);
          setPostVisible(false);
          success('Posted new data ');
          setUserData({ ...userD, refresh: !userD.refresh });
          setPostData({ description: '' });
        })
        .catch((err) => {
          error('Something wrong ! ' + err.message);
          setUpdateMessage(false);
        });
    } else error('Please Fill all fields');
  };

  // Purpose: Delete Card by ID
  const onDelete = () => {
    axios
      .delete(
        `https://coursesnodejs.herokuapp.com/employee/courseParts/${selectData._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        success(`Seccefully deleted! ID : ${selectData._id}`);
        setUserData({ ...userD, refresh: !userD.refresh });
      })
      .catch((err) => {
        error('Something wrong ! ' + err.message);
      });
  };

  // Menu for Dropdown
  const menu = (
    <Menu
      items={[
        userD.isAdmin && {
          key: '1',
          label: (
            <p
              onClick={() => onEdit()}
              style={{ margin: 'auto', padding: '10px 0' }}
            >
              {' '}
              <EditOutlined style={{ marginRight: '10px' }} /> Edit
            </p>
          ),
        },
        userD.isAdmin && {
          key: '2',
          label: (
            <p
              onClick={() => onDelete()}
              style={{ margin: 'auto', padding: '10px 0' }}
            >
              {' '}
              <DeleteOutlined style={{ marginRight: '10px' }} /> Remove
            </p>
          ),
        },
        {
          key: '3',
          label: (
            <p style={{ margin: 'auto', padding: '10px 0' }}>
              {' '}
              <ExceptionOutlined style={{ marginRight: '10px' }} /> Complain
            </p>
          ),
        },
        {
          key: '4',
          label: (
            <p style={{ margin: 'auto', padding: '10px 0' }}>
              {' '}
              <ShareAltOutlined style={{ marginRight: '10px' }} /> Share
            </p>
          ),
        },
      ]}
    />
  );

  return (
    <Wrapper>
      <Modal
        okText={updateMesage ? <LoadingOutlined /> : 'Update'}
        visible={visible}
        onOk={Update}
        onCancel={() => setVisible(false)}
      >
        <label>Name: </label>
        <input
          value={selectData.description}
          onChange={(e) =>
            setSelectData({ ...selectData, description: e.target.value })
          }
        />
        <br />
        <br />
        <Upload.Dragger
          name='file'
          action={`https://coursesnodejs.herokuapp.com/employee/upload`}
          listType='picture'
          data={{ type: 'img' }}
          showUploadList={{ showRemoveIcon: true }}
          headers={{ Authorization: `Bearer ${localStorage.getItem('token')}` }}
          accept='.png,.jpg,.jpeg'
          itemRender={function (file, requestData) {
            imgUrl = requestData?.response?.data;
            return <div>{file}</div>;
          }}
        >
          <p>Drag and Drop or Click to Upload Image</p>
        </Upload.Dragger>
      </Modal>
      {/* Post Modal */}
      <Modal
        okText={updateMesage ? <LoadingOutlined /> : 'Post'}
        visible={postVisible}
        onOk={postData}
        onCancel={() => setPostVisible(false)}
      >
        <div>
          <label>Name:</label>
          <input
            placeholder='name'
            value={postD.description}
            onChange={(e) =>
              setPostData({ ...postD, description: e.target.value })
            }
          />
        </div>
        <br />
        <br />
        <Upload.Dragger
          name='file'
          action={`https://coursesnodejs.herokuapp.com/employee/upload`}
          listType='picture'
          data={{ type: 'img' }}
          showUploadList={{ showRemoveIcon: true }}
          headers={{ Authorization: `Bearer ${localStorage.getItem('token')}` }}
          accept='.png,.jpg,.jpeg'
          itemRender={function (file, requestData) {
            imgUrl = requestData?.response?.data;
            return <div>{file}</div>;
          }}
        >
          <p>Drag and Drop or Click to Upload Image</p>
        </Upload.Dragger>
      </Modal>
      <Wrapper.TitleContainer>
        <Wrapper.Title>Cotegory: {categoryName} </Wrapper.Title>
        {userD.isAdmin && (
          <Wrapper.Title create>
            Create new Course{' '}
            <PlusCircleOutlined onClick={() => setPostVisible(true)} />
          </Wrapper.Title>
        )}
      </Wrapper.TitleContainer>
      <Wrapper.Books>
        {loading && <LoadingOutlined />}
        {!data.length && !loading && 'Data empty'}
        {data.map((value) => {
          return (
            <Card
              key={value._id}
              className={data.length === 1 ? 'cardone' : 'card'}
              cover={
                <img
                  alt='example'
                  style={{ height: '250px' }}
                  src={`https://coursesnodejs.herokuapp.com/${value.imgUrl}`}
                />
              }
              actions={[
                <Wrapper.ActionWrapper>
                  <EyeOutlined />
                  {'150 '}
                </Wrapper.ActionWrapper>,
                <Dropdown
                  trigger={['click']}
                  overlay={menu}
                  placement='top'
                  arrow
                >
                  <Wrapper.ActionWrapper
                    onClick={() =>
                      setSelectData({
                        _id: value._id,
                        ebookUrl: value.ebookUrl || 'Not found Ebook url',
                        description:
                          value.description || 'Not found Description',
                        authorId: value.authorId || '62aa3a2988318e0be4a5f5d7',
                      })
                    }
                  >
                    <EllipsisOutlined key='ellipsis' />
                    Options
                  </Wrapper.ActionWrapper>
                </Dropdown>,
              ]}
            >
              <Wrapper.CardInside>
                <Wrapper.Meta
                  onClick={() => navigate(`/course/${value._id}`)}
                  title={value.description}
                />
              </Wrapper.CardInside>
            </Card>
          );
        })}
      </Wrapper.Books>
    </Wrapper>
  );
};

export default Category;
