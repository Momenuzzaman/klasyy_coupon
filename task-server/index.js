const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.i04uix5.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // database

    const couponsCollection = client.db("CouponDB").collection("coupons");

    // coupons
    app.post("/coupons", async (req, res) => {
      const coupon = req.body;
      console.log("coupon", coupon);
      const result = await couponsCollection.insertOne(coupon);
      res.send(result);
    });
    //  all coupons
    app.get("/coupons", async (req, res) => {
      const coupons = await couponsCollection.find().toArray();
      res.send(coupons);
    });
    // single coupon
    app.get("/coupons/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const coupon = await couponsCollection.findOne(query);
      res.send(coupon);
    });

    // update coupon

    app.put("/coupons/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCoupon = req.body;

      const coupon = {
        $set: {
          title: updatedCoupon.title,
          date: updatedCoupon.date,
          minimumAmount: updatedCoupon.minimumAmount,
          couponAmount: updatedCoupon.couponAmount,
          couponCode: updatedCoupon.couponCode,
          description: updatedCoupon.description,
        },
      };
      const result = await couponsCollection.updateOne(filter, coupon, options);
      res.send(result);
    });

    // delete
    app.delete("/coupons/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await couponsCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.listen(port, () => {
  console.log(`listening on ${port} ok`);
});
