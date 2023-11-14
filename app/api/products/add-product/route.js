import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

// adds the new product in the database

async function handle(req, res) {
  // always remember to add await before the req.json()
  const { title, description, price } = await req.json();

  try {
    // connect to the database
    await mongooseConnect();

    // save the product
    const productDoc = new Product({
      title,
      description,
      price,
    });

    await productDoc.save();

    return new Response(JSON.stringify(productDoc), { status: 201 });
  } catch (error) {
    return new Response("Unable to process your request", { status: 500 });
  }
}

export { handle as POST };
