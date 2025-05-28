import express from "express";
import {handleContacts}  from '../controller/contact';

const router = express.Router();

router.post('/identify', handleContacts);

export default router;