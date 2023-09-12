import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function DeleteArticle() {
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();
  const [token, setToken] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      imageUrl: imageUrl
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/delete-article', {
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
        data.message === "City deleted successfully" ? setAlertMessage({ type: 'success', text: 'Şehir başarıyla silindi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "City deleted successfully" && history.push("/admin");
      })
    
  };
  return (<>
    {alertMessage && (
      <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.text}
        </Alert>
      )}
    <Form method='delete' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>imageUrl</Form.Label>
        <Form.Control value={imageUrl} onChange={handleImageUrlChange} />
      </Form.Group>
      <Button variant="danger" type="submit">
        Sil
      </Button>
    </Form>
  </>
  );
}

export default DeleteArticle;
