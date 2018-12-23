import {Schema} from "mongoose";
import {NewModel} from "@lib/modules/__common__/helpers/model";

@NewModel('items')
export default class ItemsSchema extends Schema {
    constructor() {
        super({
            name: String,
            price: Number,
            image: String
        })
    }
}