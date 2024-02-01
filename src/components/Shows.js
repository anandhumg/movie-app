import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Shows = ({ shows }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/show/${id}`);
  };

  return (
    <div className='shows-list'>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
        {shows.map((data, index) => (
          <Col key={index}>
            <Card style={{ width: '18rem' }} onClick={() => handleClick(data.show.id)}>
              <Card.Img variant='top' src={data.show.image ? data.show.image.medium : 'https://www.virtualblueridge.com/news-and-events/images/phil-francis.jpg'} alt={data.show.name} />
              <Card.Body>
                <Card.Title>{data.show.name}</Card.Title>
                <Card.Text>
                  <p>{data.show.language}</p>
                  <p>{data.show.rating.average}/10</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Shows;
