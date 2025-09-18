import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
