const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
// app.use(express.urlencoded({extended:false}));
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
        // update inventory
        app.put('/inventory/:id', async(req, res) =>{
            console.log(req.body);
            console.log(req.body.quantity);
            const id = req.params.id;
            
            const updateQuantity = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };            
            const updatedDoc = {
                $set: {
                    quantity: updateQuantity.quantity
                }
            };
            const result = await serviceCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        });

        app.put('/inventory/:id', async(req, res) =>{
            console.log(req.body);
            console.log(req.body.quantity);
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedUser.quantity
                }
            };
            const result = await serviceCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        });

        // delete
        app.delete('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            console.log(id)
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

        // post
        app.post('/inventory', async(req, res) =>{
            const newInventory = req.body;
            const result = await serviceCollection.insertOne(newInventory);
            res.send(result);
        });

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
