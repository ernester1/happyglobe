// Using EmailJS (Frontend-only solution)
// First install: npm install @emailjs/browser

import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Create FormData for file upload
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      message: formData.message,
      to_email: 'employer@company.com' // Replace with actual employer email
    };

    // Send email using EmailJS
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
      templateParams,
      'YOUR_PUBLIC_KEY'       // Replace with your EmailJS public key
    );

    console.log('Email sent successfully:', result);
    setIsSubmitted(true);
    
    // Handle file upload separately if needed
    if (resume) {
      // You might need a separate service for file uploads
      await uploadResume(resume);
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Failed to submit application. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

// Separate function for file upload
const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('applicantEmail', formData.email);
  
  // Upload to your file storage service (AWS S3, Cloudinary, etc.)
  const response = await fetch('/api/upload-resume', {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};