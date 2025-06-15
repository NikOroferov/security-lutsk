import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://nikoroferov:0nSgsH1aoZEjd0Sg@cluster0.oypbc.mongodb.net/';
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('security-shop');
    const products = await database.collection('products').find({}).toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    
    await client.connect();
    const database = client.db('security-shop');
    
    // Generate slug from name
    const slug = product.name.ru
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const result = await database.collection('products').insertOne({
      ...product,
      slug,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ _id: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
} 