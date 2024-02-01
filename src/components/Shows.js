import React from 'react';
import {  Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Shows = ({ shows }) => {
  const showsInRows = [];
  const showsPerRow = 4;
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/show/${id}`);
  }
  for (let i = 0; i < shows.length; i += showsPerRow) {
    const row = shows.slice(i, i + showsPerRow);
    showsInRows.push(row);
  }
  console.log(shows)
  return (
    <div>
      <div className='shows-list'>
        <Table striped bordered hover>
          <tbody>
            {showsInRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((data, colIndex) => (
                  <td key={colIndex}>
                    <Card style={{ width: '18rem' }} onClick={() => handleClick(data.show.id)} >
                      <Card.Img variant="top" src={data.show.image ? data.show.image.medium : "https://www.virtualblueridge.com/news-and-events/images/phil-francis.jpg"} alt={data.show.name} />
                      <Card.Body>
                        <Card.Title>{data.show.name}</Card.Title>
                        <Card.Text>
                          <p>{data.show.language}</p>
                          <p>{data.show.rating.average}/10</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Shows;
