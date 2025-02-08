import dotenv from 'dotenv';
import path from 'path'; //node js default olaraq gelir
import cloudinary from 'cloudinary';

const __dirname = path.dirname(new URL(import.meta.url).pathname); //C:/bin/user/backend-4

const envPath = path.resolve(__dirname, '../config/config.env');


dotenv.config({ path: envPath });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;