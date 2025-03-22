import express from  'express'
import mongoose from 'mongoose';
import cors from 'cors'
import 'dotenv/config'
const app = express();
const port = 4000;

import { TransactionModel } from './models/transactions.models.js';

app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ body: 'test ok' }); // Correct object syntax
});

app.post('/api/transaction', async (req,res)=>{

    //console.log(process.env.MONGO_URL);  
    
    //connect to DB
    await mongoose.connect(process.env.MONGO_URL)

    const { name, price , description , datetime } = req.body;

    //add the data to transaction schema
    //we use the model name to create entry 

    const transaction = await TransactionModel.create({name,price,description,datetime})

    res.json(transaction)  
})


app.get('/api/transactions',async (req,res)=>{

    await mongoose.connect(process.env.MONGO_URL)

    const transactions = await TransactionModel.find();

    res.json(transactions)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//