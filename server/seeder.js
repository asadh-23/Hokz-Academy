import dotenv from 'dotenv';
import Admin from './models/adminModel.js';
import connectDB from './config/database.js';

dotenv.config();


if (process.env.NODE_ENV === 'production') {
  console.error(
    '\nFATAL: Seeder script cannot be run in production environment.'
  );
  console.log('If you must run it, temporarily change NODE_ENV.');
  process.exit(1);
}

const { MONGO_URL, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

if (!MONGO_URL || !SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
  console.error(
    '\nError: MONGO_URL, SUPER_ADMIN_EMAIL, and SUPER_ADMIN_PASSWORD' +
    '\n       must all be set in your .env file to run the seeder.'
  );
  process.exit(1);
}

const createSuperAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: SUPER_ADMIN_EMAIL });

    if (adminExists) {
      console.warn('⚠️  Warning: Super Admin with this email already exists.');
      process.exit();
    }

    await Admin.create({
      fullName: 'Super Admin',
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD,
      isActive: true,
    });

    console.log('✅ Success! Super Admin Created.');
    process.exit();
  } catch (error) {
    console.error(`Error creating super admin: ${error.message}`);
    process.exit(1);
  }
};


const runSeeder = async () => {
  await connectDB();
  await createSuperAdmin();
};

runSeeder();