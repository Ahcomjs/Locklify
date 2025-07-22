import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function getKeyFromPassword(password: string): Buffer {
  const salt = Buffer.from('locklify-static-salt-for-example', 'utf8');
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
}

export async function POST(request: NextRequest) {
  const { text, password } = await request.json();

  if (!text || !password) {
    return NextResponse.json({ error: 'Text and password are required.' }, { status: 400 });
  }

  try {
    const key = getKeyFromPassword(password);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return NextResponse.json({ encryptedText: `${iv.toString('hex')}:${encrypted}` });
  } catch (error: any) {
    console.error('Encryption error:', error);
    return NextResponse.json({ error: 'Failed to encrypt text.', details: error.message }, { status: 500 });
  }
}
