import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function DeleteContinent() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [token, setToken] = useState();
  const [alertMessage, setAlertMessage] = useState(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleContinentTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        title: title
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/delete-continent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        data.message === "Continent deleted successfully" ? setAlertMessage({ type: 'success', text: 'Kıta başarıyla silindi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "Continent deleted successfully" && history.push("/admin");
      })
    
  };
  return (<>
  {alertMessage && (
    <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage.text}
      </Alert>
    )}
    <Form method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formContinentTitle">
        <Form.Label>continentTitle</Form.Label>
        <Form.Control value={title} onChange={handleContinentTitleChange} />
      </Form.Group>
      <Button variant="danger" type="submit">
        Sil
      </Button>
    </Form>
  </>
  );
}

export default DeleteContinent;