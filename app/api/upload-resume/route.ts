import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create a unique filename
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const uniqueId = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    const fileName = `${uniqueId}-${file.name}`;

    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await writeFile(join(uploadDir, fileName), buffer);
    } catch (error: any) {
      // If directory doesn't exist, create it and try again
      if (error.code === 'ENOENT') {
        await writeFile(join(process.cwd(), 'public', 'uploads', fileName), buffer);
      } else {
        throw error;
      }
    }

    // Return the URL to the uploaded file
    return NextResponse.json({
      message: 'File uploaded successfully',
      url: `/uploads/${fileName}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 