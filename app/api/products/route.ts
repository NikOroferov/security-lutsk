import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    return NextResponse.json({ message: 'API endpoint is ready' });
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
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