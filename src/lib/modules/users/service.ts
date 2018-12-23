import {Model} from "mongoose";
import {Service} from "@lib/modules/__common__/service";

export default class UserService extends Service {
    constructor(protected collection_name: string, protected model: Model<any>) {
        super(collection_name, model);
    }

    get(document_id: string): Promise<any> {
        return super.get(document_id)
            .then(this.cleanUp.bind(this));
    }

    cleanUp(doc): Promise<any> {
        return Promise.resolve(doc)
            .then(doc => {
                let document = Object.assign({}, doc._doc);
                delete document.__v;

                return document;
            })
    }
}