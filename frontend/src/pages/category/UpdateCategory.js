import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function UpdateCategory() {
  const [title, setTitle] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
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

  const handleImageChange = (event) => {
    setCategoryImage(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        title: title,
        categoryImage: categoryImage
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/update-category', {
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
        data.message === "Category updated successfully" ? setAlertMessage({ type: 'success', text: 'Ülke başarıyla güncellendi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "Category updated successfully" && history.push("/admin");
    })
    
  };
  return (<>
    {alertMessage && (
      <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.text}
        </Alert>
      )}
      <Form method='put' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>title</Form.Label>
        <Form.Control value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>categoryImage</Form.Label>
        <Form.Control value={categoryImage} onChange={handleImageChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Güncelle
      </Button>
    </Form>
  </> 
  );
}

export default UpdateCategory;
