const express = require('express')
const nodemailer = require('nodemailer');
const User = require('./models/userModel.js');

// Function to send email notification to users
function sendNotificationEmail(to, subject, body) {
    // Create a transporter object to send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'monishanode@gmail.com',
        pass: '7401057318'
      }
    });
  
    // Define email options
    const mailOptions = {
      from: 'monishanode@gmail.com',
      to: to,
      subject: subject,
      text: body
    };
  
    // Send the email using the transporter object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  const newBlogPost = {
    title: 'New Blog Post Title',
    content: 'This is the content of the new blog post'
  };
  
  const subscribers = [User];
  
  subscribers.forEach((subscriber) => {
    const emailSubject = 'New Blog Post: ' + newBlogPost.title;
    const emailBody = 'Hello,\n\nA new blog post has been added to the website.\n\n' + newBlogPost.title + '\n\n' + newBlogPost.content;
    sendNotificationEmail(subscriber, emailSubject, emailBody);
  });
  
  module.exports = {
    sendNotificationEmail
  };