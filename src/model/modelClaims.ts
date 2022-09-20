import { Schema, model, connection, Model } from "mongoose";

type UserType = {
    reason: string,
    message: string,
}

const schema = new Schema<UserType>({
    reason: {type: String, required:true},
    message: {type: String, required:true}
})

const modelClaims = 'Claims';

const claimsModel = 
    connection && connection.models[modelClaims]
        ?(connection.models[modelClaims] as Model<UserType>)
        : model<UserType>(modelClaims, schema);

        export default claimsModel;