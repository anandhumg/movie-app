import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { Button, Card, Container } from 'react-bootstrap';

const API_BASE = 'https://api.tvmaze.com/shows';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data))
      .catch((error) => console.error('Error fetching show details:', error));
  }, [id]);

  const bookTicket = (showId) => {
    navigate(`/book/${showId}`)
  };

  const background_Image = show
    ? show.image
      ? show.image.original
      : 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
    : 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png';

  const card_Image = show
    ? show.image
      ? show.image.medium
      : 'https://www.virtualblueridge.com/news-and-events/images/phil-francis.jpg'
    : 'https://www.virtualblueridge.com/news-and-events/images/phil-francis.jpg';

  console.log(show);
  return (
    <div>
      {show ? (
        <div>
          <div
            className="background-image"
            style={{
              backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(26, 26, 26, 0.0409746) 97.47%, #1A1A1A 100%) ,url(${background_Image})`,
            }}
          >
            <div className="details-tab">
              <div className="card-image">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={card_Image} />
                </Card>
              </div>
              <div className="card-details">
                <h2>
                  <b>{show.name}</b>
                </h2>
                <div className="details-sub">
                  <h6>
                    <b>Rating : </b>
                    {show.rating.average}/10
                  </h6>
                  <h6>Released : {show.premiered}</h6>
                  <h6>Duration : {show.runtime} min</h6>
                  <h6>
                    Genres: {show.genres.map((data, index) => (index !== show.genres.length - 1 ? `${data} ,` : data))}
                  </h6>
                  <br />
                  <Button variant="outline-danger" href={show.url}>
                    VIEW MORE
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Container className="summary">
            <h4>
              <b>About the Movie</b>
            </h4>
            <br />
            <div dangerouslySetInnerHTML={{ __html: show.summary }} />
          </Container>
          <div className="book-ticket-button">
            <Button size="lg" variant="danger" onClick={() => bookTicket(show.id)}>
              Book Ticket
            </Button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
