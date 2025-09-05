import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

const AddressSchema = new Schema({
    fullName: String,
    mobileNumber: String,
    pincode: String,
    streetAddress: String,
    city: String,
    state: String,
});

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'shopkeeper'], default: 'customer' },
    addresses: [AddressSchema]
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

export default model('User', UserSchema);