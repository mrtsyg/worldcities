import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function AddCategory() {
  const [title, setTitle] = useState('');
  const [continentTitle, setContinentTitle] = useState('');
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
  const handleContinentTitleChange = (event) => {
    setContinentTitle(event.target.value);
  };
  const handleCategoryImageChange = (event) => {
    setCategoryImage(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      continentTitle: continentTitle,
      categoryImage: categoryImage
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/add-category-to-continent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        data.message === "Category added successfully" ? setAlertMessage({ type: 'success', text: 'Ülke başarıyla eklendi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "Category added successfully" && history.push("/admin");
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
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>continentTitle</Form.Label>
        <Form.Control value={continentTitle} onChange={handleContinentTitleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>categoryImage</Form.Label>
        <Form.Control value={categoryImage} onChange={handleCategoryImageChange} />
      </Form.Group>
      <Button variant="success" type="submit">
        Ekle
      </Button>
    </Form>
  </>
  );
}

export default AddCategory;
