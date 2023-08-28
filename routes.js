const express=require('express');
const LogModel=require('./models/database');

const app = express()


const router=express.Router();



router.post('/api/logs/:product', async (req, res) => {
    const { product } = req.params;
    const logData = req.body;
  
    try {
      const newLog = await LogModel.create({
        product,
        ...logData,
      });
      res.status(201).json(newLog);
    } catch (error) {
      res.status(500).json({ error: 'Error saving log.' });
    }
  });
  
  router.get('/api/logs/', async (req, res) => {
    // const { product } = req.params;
  
    try {
      const logs = await LogModel.find({}).select('product logLevel message timestamp');
      res.status(200).json(logs);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error fetching logs.' });
    }
  });
  
  router.get('/api/logsFilter/', async (req, res) => {
    const { severity } = req.query;
    console.log({severity})
  
    try {
      let query = {}; // Default query
  
      if (severity === "all") {
        query = {} // No filter
      }
      else {
        query.logLevel = severity; // Add severity filter if provided
      }
  
      const logs = await LogModel.find(query).select('product logLevel message timestamp');
      res.status(200).json(logs);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error fetching logs.' });
    }
  });
  router.get('/api/productFilter/', async (req, res) => {
    const { product } = req.query;
    console.log({product})
  
    try {
      let query = {}; // Default query
  
    //   if (severity === "all") {
    //     query = {} // No filter
    //   }
    //   else {
    //     query.logLevel = severity; // Add severity filter if provided
    //   }

    query.product = product
  
      const logs = await LogModel.find(query).select('product logLevel message timestamp');
      res.status(200).json(logs);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error fetching logs.' });
    }
  });
  
  router.get('/api/productSearch/', async (req, res) => {
  const { search } = req.query;

  try {
    const query = {
      product: { $regex: new RegExp(search, 'i') }, // Case-insensitive regex search
    };

    const products = await LogModel.find(query)
      .select('product') // Select the 'product' field
      .distinct('product'); // Get distinct product names

      const newProduct = products.map((product) => {
        return { product };
      });

    res.status(200).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching products.' });
  }
});

router.post('/api/logsFilter/', async (req, res) => {
  const { severity, product } = req.body;

  try {
    let query = {}; // Default query

    if (severity && severity !== "all") {
      query.logLevel = severity; // Add severity filter if provided
    }

    if (product) {
      query.product = product; // Add product filter if provided
    }

    const logs = await LogModel.find(query).select('product logLevel message timestamp');
    res.status(200).json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching logs.' });
  }
});

module.exports = router;
  

