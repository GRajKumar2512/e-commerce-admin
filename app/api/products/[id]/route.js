import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  try {
    await mongooseConnect();

    const product = await Product.findById(params.id);

    if (!product)
      return new Response("No product available with this id", { status: 404 });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response("Not able to process your request", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, description, price } = await request.json();

  try {
    await mongooseConnect();

    const existingProduct = await Product.findById(params.id);

    if (!existingProduct)
      return new Response("no product found with this id to update", {
        status: 404,
      });

    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.price = price;

    await existingProduct.save();

    return new Response(JSON.stringify(existingProduct), { status: 200 });
  } catch (error) {
    return new Response("Unable to process your update request", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await mongooseConnect();
    console.log(params.id);
    await Product.findByIdAndRemove(params.id);

    return new Response("product successfully deleted from the database", {
      status: 200,
    });
  } catch (error) {
    return new Response("Unable to process your delete request", {
      status: 500,
    });
  }
};
