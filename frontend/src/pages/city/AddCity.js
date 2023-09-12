import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3] }],
            ["bold", "italic", "underline","strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"]
        ],
}

function AddCity() {
  const [metin, setMetin] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isCard, setIsCard] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const history = useHistory();
  const [token, setToken] = useState();
  const [alertMessage, setAlertMessage] = useState(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const handleMetinChange = (content) => {
    setMetin(content);
  };
  const handleCategoryTitleChange = (event) => {
    setCategoryTitle(event.target.value);
  };
  const handleCardOptionChange = (event) => {
    setIsCard(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      title: title,
      imageUrl: imageUrl,
      metin: metin,
      isCard: isCard,
      categoryTitle: categoryTitle
    };
    await fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/add-article', {
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
        data.message === "City added successfully" ? setAlertMessage({ type: 'success', text: 'Şehir başarıyla eklendi' }) : setAlertMessage({ type: 'warning', text: 'Tekrar dene' });
        data.message === "City added successfully" && history.push("/admin");
    })
    
  };
  return (<>
    {alertMessage && (
      <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.text}
        </Alert>
      )}
      <Form method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>name</Form.Label>
        <Form.Control value={name} onChange={handleNameChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>title</Form.Label>
        <Form.Control value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>is card</Form.Label>
        <Form.Control value={isCard} onChange={handleCardOptionChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label>imageUrl</Form.Label>
        <Form.Control value={imageUrl} onChange={handleUrlChange} />        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>metin</Form.Label>
        <ReactQuill modules={modules} value={metin} onChange={handleMetinChange} theme="snow"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCategoryTitle">
        <Form.Label>categoryTitle</Form.Label>
        <Form.Control value={categoryTitle} onChange={handleCategoryTitleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Onayla
      </Button>
    </Form>
  </>
    
  );
}

export default AddCity;
