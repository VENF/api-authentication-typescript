import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string,
    password: string,
    comparePassword: (password: string) => Promise<Boolean>
}

const userSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true}
});

userSchema.pre<IUser>('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }else{
        const Salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, Salt);
        this.password = hash;
        next();
    }
});

userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
   return await bcrypt.compare(password, this.password)
}

export default model<IUser>('user', userSchema)