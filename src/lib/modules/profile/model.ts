import {model, Schema} from "mongoose";
import {NewModel} from "@lib/modules/__common__/helpers/model";

@NewModel('profile')
export default class ProfileSchema extends Schema {
    constructor() {
        super({
            name: { type: String },
            mobile: { type: Number, public: false },
            address: { type: String },
            address_2: { type: String },
            pin: { type: String }
        })
    }
}