import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://nikoroferov:0nSgsH1aoZEjd0Sg@cluster0.oypbc.mongodb.net/';
const client = new MongoClient(uri);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await client.connect();
    const database = client.db('security-shop');
    const product = await database.collection('products').findOne({
      _id: new ObjectId(params.id)
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await request.json();
    
    await client.connect();
    const database = client.db('security-shop');
    
    const result = await database.collection('products').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...product,
          updatedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await client.connect();
    const database = client.db('security-shop');
    
    const result = await database.collection('products').deleteOne({
      _id: new ObjectId(params.id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
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