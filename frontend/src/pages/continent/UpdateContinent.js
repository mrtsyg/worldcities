import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function UpdateContinent() {
  const history = useHistory();
  const [oldTitle, setOldTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [token, setToken] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  
  const handleOldContinentTitleChange = (event) => {
    setOldTitle(event.target.value);
  };
  const handleNewContinentTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        oldTitle: oldTitle,
        newTitle: newTitle
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/update-continent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        data.message === "Continent updated successfully" ? setAlertMessage({ type: 'success', text: 'Kıta başarıyla güncellendi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "Continent updated successfully" && history.push("/admin");
    })
    
  };
  return (
    <>
      {alertMessage && (
      <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.text}
        </Alert>
      )}
    <Form method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formContinentTitle">
        <Form.Label>Old Continent Title</Form.Label>
        <Form.Control value={oldTitle} onChange={handleOldContinentTitleChange} />
        <Form.Label>New Continent Title</Form.Label>
        <Form.Control value={newTitle} onChange={handleNewContinentTitleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Güncelle
      </Button>
    </Form>
    </>
  );
}

export default UpdateContinent;