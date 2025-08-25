// This is a local script to encrypt your API key. Do not deploy this file.
const crypto = require('crypto');

// --- YOUR INPUTS ---
const YOUR_GEMINI_API_KEY = 'AIzaSyAHXDjmlQRu9Be0zlwO26xsUYNeEcY4FF0';
const YOUR_SECRET_DECRYPTION_KEY = 'bodkhebodkhebodkhe@220520012003@'; // Must be 32 characters
// --- END OF INPUTS ---

if (YOUR_SECRET_DECRYPTION_KEY.length !== 32) {
    console.error('Error: Decryption key must be exactly 32 characters long.');
    process.exit(1);
}

const algorithm = 'aes-256-gcm';
const iv = crypto.randomBytes(16); // Initialization Vector

const cipher = crypto.createCipheriv(algorithm, Buffer.from(YOUR_SECRET_DECRYPTION_KEY), iv);

let encrypted = cipher.update(YOUR_GEMINI_API_KEY, 'utf8', 'hex');
encrypted += cipher.final('hex');

const authTag = cipher.getAuthTag();

// Combine iv, authTag, and encrypted data for storage
const combinedData = iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;

console.log('--- Copy these values into your .env.local file ---');
console.log(`ENCRYPTED_GEMINI_KEY=${combinedData}`);
console.log(`DECRYPTION_KEY=${YOUR_SECRET_DECRYPTION_KEY}`);
console.log('----------------------------------------------------');
