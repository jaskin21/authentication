import mongoose from 'mongoose';

export default async (connection, dbName) => {
  try {
    console.log('Database Connected');
    await mongoose.connect(
      connection,
      { dbName },
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log(error);
  }
};
