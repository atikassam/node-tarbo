import {logger} from "@util/logger";
import * as path from "path";
import {Model, model, Types} from "mongoose";
import {ErrorCodes} from "@lib/modules/__common__/error.codes";

export class Service {
    /**
     * Similar to controller, this function will find the
     * service for a specific model if there is no custom
     * service available for the model it will give the
     * default one
     *
     * @param collection_name
     */
    public static resolve(collection_name): Promise<Service> {
        try {
            let model = require(path.resolve(__dirname, `./../${collection_name}/model`));
            try {
                let service = require(path.resolve(__dirname, `./../${collection_name}/service`));
                return Promise.resolve(new service.default(collection_name, model));
            } catch (e) {
                return Promise.resolve(new Service(collection_name, model));
            }
        } catch (e) {
            logger.error(e);

            return Promise.reject({
                status: 404,
                developer_message: 'Please check the url',
                user_message: 'Illegal request',
                error_code: 'URL_DOSE_NOT_EXIST'
            });
        }
    }

    constructor(protected collection_name: string, protected model: Model<any>) {}

    /**
     * Insert a new document
     *
     * @param body
     */
    public insert(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // console.log(this.model);
            let _model = model(this.collection_name);
            new _model(body)
                .save((error, doc) => {
                    if (error) {
                        logger.error(error);

                        return reject(this.errorOnInvalidBody());
                    }
                    else {
                        resolve(doc);
                    }
                });
        })
    }


    /**
     * Fetch a document using document id
     *
     * @param document_id
     */
    public get(document_id: string): Promise<any> {

        let _model = model(this.collection_name);

        return Promise.resolve(document_id)
            .then( this.isValidID.bind(this))
            .then( (id: any): any => {
                return _model.findOne({ _id: Types.ObjectId(id) })
            })
            .then( data => {
                if (!data) throw this.errorOnResourceNotFound();
                return data;
            })
            .catch(error => {
                logger.error(error);
                throw error.status ? error : this.errorOnResourceNotFound();
            });
    }

    /**
     * Fetch a document using document id
     *
     * @param document_id
     */
    public getAll({ limit = 10, offset = 0, search }): Promise<any> {

        let _model = model(this.collection_name);

        return Promise.resolve(this.getAllAggregation({ limit, search, offset}))
            .then( data => {
                if (!data) throw this.errorOnResourceNotFound();
                return data[0] || {
                    "metadata": {
                        "resultset": {
                            "count": 0,
                            "offset": offset,
                            "limit": limit
                        }
                    },
                    results: []
                };
            })
            .catch(error => {
                logger.error(error);
                throw error.status ? error : this.errorOnResourceNotFound();
            });
    }


    /**
     * Remove a document
     *
     * @param document_id
     */
    public remove(document_id: string) {
        return this.isValidID(document_id)
            .then(id => this.getModel())
            .then( model => model.findOne({ _id: Types.ObjectId(document_id) }))
            .then((doc): any => {
                if (!doc) throw this.errorOnResourceNotFound();

                return new Promise((resolve) => doc.remove(() => resolve(doc)))
            })
    }

    /**
     * Update a document
     *
     * @param document_id
     * @param data
     */
    public update(document_id: string, data: { [field: string]: any }): Promise<Document> {
        return Promise.resolve(this.isValidID(document_id))
            .then(() => this.getModel())
            .then(model => model.findOne({ _id: Types.ObjectId(document_id)}))
            .then((doc): any => {
                if (!doc) throw this.errorOnResourceNotFound();

                Object.assign(doc, data);

                return new Promise((resolve, reject) => {
                    doc.save((err, doc) => {
                        if (err) {
                            logger.error(err);

                            return reject(this.errorOnInvalidBody())
                        }
                        resolve(doc)
                    });
                })
            })
    }

    public isValidID(id): Promise<any> {
        return Promise.resolve(id)
            .then( (id: string) => {
                if (Types.ObjectId.isValid(id))
                    return id;
                else throw {
                    status: 400,
                    developer_message: 'Invalid resource id',
                    user_message: 'Invalid resource id',
                    error_code: ErrorCodes.INVALID_RESOURCE_ID
                }
            })
    }

    public getModel(): Promise<Model<any>> {
        return Promise.resolve(model(this.collection_name));
    }

    protected getAllAggregation({ offset = 0, limit = 10, search }) {
        return Promise.resolve(this.getModel())
            .then( (model): any => {
                return model.aggregate([
                    {
                        $match: {}
                    },
                    {
                        $skip: offset
                    },
                    {
                        $limit: limit
                    },
                    {
                        $group: {
                            _id: null,
                            results: { $push: "$$ROOT" }
                        }
                    },
                    {
                        $lookup: {
                            let: {},
                            from: this.collection_name,
                            pipeline: [
                                { $match: {} },
                                { $count: 'count'}
                            ],
                            as: 'total'
                        }
                    },
                    {
                        $addFields: {
                            "metadata": {
                                "resultset": {
                                    "count": {$arrayElemAt: ["$total.count", 0]},
                                    "offset": offset,
                                    "limit": limit
                                }
                            }
                        }
                    },
                    {
                        $project: { total: 0 }
                    }
                ])
            })
    }

    protected errorOnResourceNotFound() {
        return {
            status: 404,
            developer_message: 'Resource not found',
            user_message: 'Resource not found',
            error_code: ErrorCodes.RESOURCE_NOT_FOUND
        }
    }

    protected errorOnInvalidBody() {
        return {
            status: 400,
            developer_message: 'Check the body',
            user_message: 'Invalid body',
            error_code: ErrorCodes.INVALID_RESOURCE_DATA,
            more_info: "http://doc.api.whyable.com/"
        }
    }

}