import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function DeleteCategory() {
  const [title, setTitle] = useState('');
  const history = useHistory();
  const [token, setToken] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        title: title
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/delete-category', {
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
        data.message === "Category deleted successfully" ? setAlertMessage({ type: 'success', text: 'Ülke başarıyla silindi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "Category deleted successfully" && history.push("/admin");
      })
    
  };
  return (<>
    {alertMessage && (
      <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.text}
        </Alert>
      )}
    <Form method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>title</Form.Label>
        <Form.Control value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Button variant="danger" type="submit">
        Sil
      </Button>
    </Form>
  </>
  );
}

export default DeleteCategory;
