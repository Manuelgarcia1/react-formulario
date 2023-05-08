import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../Contacto/modal.css'

const Contacto = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  const sendEmail = (e) => {
    e.preventDefault();
  
    if (!name || !email || !message) {
      // Si algún campo obligatorio no está completo, se muestra un mensaje de error
      setErrorMessage("Por favor complete todos los campos obligatorios");
      return;
    }
  
    emailjs.sendForm('service_00semke', 'template_y38ov9q', e.target, 'I6AZh1jZE9b2rIC_c')
    .then((result) => {
      console.log(result.text);
      setShowModal(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrorMessage('');
    }, (error) => {
      console.log(error.text);
      setErrorMessage('Error al enviar el correo');
      setShowModal(true);
    });
  };
  
  return (
    <div className="form-style-6">
      <h1>Contact Us</h1>
      <form onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" name="user_email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea name="message" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        <input type="submit" value="Send" />
      </form>      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          {errorMessage ? (
            <Modal.Title>{errorMessage}</Modal.Title>
          ) : (
            <Modal.Title>Mensaje enviado con éxito</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Footer>
           <Button variant="primary" onClick={handleCloseModal}>
              Cerrar
           </Button>
        </Modal.Footer>
      </Modal>
    </div> 
  );
};

export default Contacto;