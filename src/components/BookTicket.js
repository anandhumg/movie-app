import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './style.css';
function BookTicket() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [savedUserDetails, setSavedUserDetails] = useState(null);
    const API_BASE = 'https://api.tvmaze.com/shows';

    useEffect(() => {
        fetch(`${API_BASE}/${id}`)
            .then((response) => response.json())
            .then((data) => setShow(data))
            .catch((error) => console.error('Error fetching show details:', error));

        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedUserDetails) {
            setSavedUserDetails(storedUserDetails);
        }
    }, [id]);

    const card_Image = show ? show.image.medium : '';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userDetails', JSON.stringify(formData));
        setSavedUserDetails(formData);
        alert('User details saved successfully!');
    };

    return (
        <Container className='booking-section'>
            {show ?
                <div className='movie-details'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={card_Image} />
                    </Card>
                    <div className='details-sub'>
                        <h6><b>Rating : </b>{show.rating.average}/10</h6>
                        <h6>Released : {show.premiered}</h6>
                        <h6>Duration : {show.runtime} min</h6>
                        <h6>Genres: {show.genres.map((data, index) => (index !== show.genres.length - 1) ? `${data}, ` : data)}</h6><br />
                        <Button variant='outline-danger' href={show.url}>VIEW MORE</Button>
                    </div>
                </div>
                : <p>Loading...</p>}
            <div className='form-details'>
                <h4>User Details</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" placeholder="Enter phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </Form.Group> <br />
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
                {savedUserDetails && (
                    <div>
                        <h4>Saved User Details</h4>
                        <p>Name: {savedUserDetails.name}</p>
                        <p>Email: {savedUserDetails.email}</p>
                        <p>Phone: {savedUserDetails.phone}</p>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default BookTicket;
