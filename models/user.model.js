import mongoose,{model,Schema} from 'mongoose'

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email id is required']
    },
    profilePic:{
        public_id:{
            type:String,
            
        },
        secure_url:{
            type:String

        }
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    },
    password:{
        type:String,
        min:[6,"password shoulde be greater than or equal to 6 character"],
        required:[true,'password is required']
    }
})

const User = model('User',userSchema)

export default User