import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

// returns all the products in the database

async function handle() {
  try {
    await mongooseConnect();

    const allProducts = await Product.find({});

    return new Response(JSON.stringify(allProducts), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

export { handle as GET };
