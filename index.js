const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middlewate
app.use(cors());
app.use(express.json());




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hbgeo.mongodb.net/?retryWrites=true&w=majority&authSource=admin`;

const uri = process.env.MONGODB_URI;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {

    const FoodsCollection = client.db('FoodiesDB').collection('foods');
    
    app.post('/foods', async (req, res) =>{
      const newFood = req.body;
      const result = await FoodsCollection.insertOne(newFood);
      res.send(result);
    });


    app.get('/foods', async(req,res) => {
      const cursor = FoodsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/foods/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await FoodsCollection.findOne(query);
      res.send(result);
    })

    app.get('/', async (req, res) => {
      const result = await FoodsCollection.find().limit(8).toArray();
      res.send(result);
    });




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Foodies server setting on port ${port}`);
})