const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());

// munia
// XA5tunhCXLD2Wmx7



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://munia:XA5tunhCXLD2Wmx7@cluster0.qcbxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("organic-zone").collection("inventories");
  console.log('connected to db')
  // perform actions on the collection object
//   client.close();
});



app.get('/', (req, res) => {
    res.send('Server running');
});

app.listen(port, () => {
    console.log('Listening to port', port);
});
