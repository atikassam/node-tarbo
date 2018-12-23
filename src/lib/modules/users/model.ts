import {model, Schema} from "mongoose";
import {NewModel} from "@lib/modules/__common__/helpers/model";

@NewModel('users')
export default class UserSchema extends Schema {
    constructor() {
        super({
            name: { type: String },
            mobile: { type: Number, public: false }
        })
    }
}