import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState(null);
  const captchaRef = useRef(null);

  const verify = () =>{
    captchaRef.current.getResponse().then(res => {
        setCaptchaToken(res)
    })

  return (<>
    {alertMessage && (
        <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage.text}
        </Alert>
      )}
      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be at least 8 characters long';
        }
         return errors;
       }}
       onSubmit={
      async (values) => {
        const recaptchaToken = captchaRef.current.getValue();
        captchaRef.current.reset();
        const mergedValues = { ...values, ...recaptchaToken };
      fetch('https://dunyasehirlericom-598d89e9dae9.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mergedValues),
    }).then(res=>res.json())
      .then((data) => {
        if(data.key){
          setAlertMessage({ type: 'success', text: 'Giriş Başarılı' });
          localStorage.setItem('token', data.key);
        // Handle the response data here
          history.push('/admin');
        }else if(data.incorrect){
          setAlertMessage({ type: 'danger', text: 'email ya da şifre hatalı' });
          history.push('/');
        }else if(data.nouser){
          setAlertMessage({ type: 'danger', text: 'Böyle bir kullanıcı yok' });
        }
        
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
          }}
     >
     {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
    <Form method='post' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Adresi</Form.Label>
        <Form.Control type="email" placeholder="Email adresinizi yazınız" name="email" onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}/>{errors.email && touched.email && errors.email}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Şifre</Form.Label>
        <Form.Control type="password" name="password" placeholder="Şifrenizi giriniz" onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}/>{errors.password && touched.password && errors.password}
      </Form.Group>
      <ReCAPTCHA
      sitekey={process.env.REACT_APP_SITE_KEY}
      ref={captchaRef} onVerify={verify}
      />
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Onayla
      </Button>
    </Form>)}
    </Formik>
  </> 
  );
}}

export default LoginForm;
