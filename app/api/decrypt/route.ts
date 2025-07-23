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
    const parts = text.split(':');
    if (parts.length !== 2) {
      return NextResponse.json({ error: 'Invalid encrypted text format.' }, { status: 400 });
    }

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];

    if (iv.length !== 16) {
      return NextResponse.json({ error: 'Invalid IV length.' }, { status: 400 });
    }

    const key = getKeyFromPassword(password);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return NextResponse.json({ decryptedText: decrypted });
  } catch (error: unknown) {
    console.error('Decryption error:', error);

    let message = 'Unknown error';
    let status = 500;

    if (error instanceof Error) {
      message = error.message;

      if (
        message.includes('bad decrypt') ||
        message.includes('Wrong final block length') ||
        message.includes('Error during decrypt') ||
        message.includes('unable to decrypt data')
      ) {
        status = 400;
        message = 'Incorrect password or corrupted data.';
      }
    }

    return NextResponse.json(
      { error: 'Failed to decrypt text.', details: message },
      { status }
    );
  }


}
