import express from 'express';
import React from 'react'
const router = express.Router();

function Home() {
  return (
    <div>Home</div>
  )
}
router.get('/home', (Home))

export default Home