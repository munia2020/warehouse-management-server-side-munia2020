const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());

// munia
// XA5tunhCXLD2Wmx7



const uri = "mongodb+srv://munia:XA5tunhCXLD2Wmx7@cluster0.qcbxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('organicZone').collection('inventory');

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        app.get('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const inventory = await serviceCollection.findOne(query);
            res.send(inventory);
        });

        // POST
        // app.post('/inventory', async(req, res) =>{
        //     const newService = req.body;
        //     const result = await serviceCollection.insertOne(newService);
        //     res.send(result);
        // });

        // DELETE
        // app.delete('/inventory/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await serviceCollection.deleteOne(query);
        //     res.send(result);
        // });

    }
    finally {

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Server running Organic Zone');
});

app.listen(port, () => {
    console.log('Port Listening', port);
});
