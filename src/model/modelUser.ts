import { Schema, model, connection, Model } from "mongoose";

type UserType = {
    name: string,
    email: string,
    password: string
   
}

const schema = new Schema<UserType>({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password:{type: String, required:true},    
});

const modelName: string = 'User';

const userModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<UserType>)
    : model<UserType>(modelName, schema);

//exportando o model caso ele exista e caso não exista cria ele
export default userModel;


/*const mongoose = require('mongoose')
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
})

module.exports = User
*/