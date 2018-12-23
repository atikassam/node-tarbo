import * as path from "path";
import {Service} from "@lib/modules/__common__/service";
import {logger} from "@util/logger";

export class Controller {
    /**
     * This function will find the controller for a specific model
     * if there is no custom controller available for the model it
     * will give the default one
     *
     * @param collection_name
     */
    public static resolve(collection_name): Promise<Controller> {
        let controller;
        try {
            controller = require(path.resolve(__dirname, `./../${collection_name}/controller`));
        } catch (e) {
            logger.info('No controller found', e)
        }

        return Promise.resolve(Service.resolve(collection_name))
            .then(service => {
                // console.log(controller);
                return controller ? new controller.default(service) : new Controller(service);
            });
    }

    constructor(protected service: Service) {}

    /**
     * Insert a new document
     *
     * @param req
     * @param res
     */
    public insert(req, res): Promise<any> {
        let { body } = req;

        return Promise.resolve(this.service.insert(body))
            .then((data) => {
                res.status(201)
                    .json(data);
            })
            .catch((error) => {
                console.log(error);
                res.status(error.status)
                    .json(error)
            });
    }

    /**
     * Fetch list of documents
     *
     * @param req
     * @param res
     */
    public getAll(req: any, res: any): Promise<any> {
        let { limit, offset, q: search } = req.query;

        return Promise.resolve(this.service.getAll({ limit, offset, search }))
            .then((data) => {
                res.status(200)
                    .json(data);
            })
            .catch((error) => {
                // console.log(error);
                res.status(error.status)
                    .json(error);
            });

    }

    /**
     * Fetch a document using document id
     *
     * @param req
     * @param res
     */
    public get(req: any, res: any): Promise<any> {
        let { document_id } = req.params;

        return Promise.resolve(this.service.get(document_id))
            .then((data) => {
                res.status(200)
                    .json(data);
            })
            .catch((error) => {
                // console.log(error);
                res.status(error.status)
                    .json(error);
            });

    }

    /**
     * Remove a document
     *
     * @param req
     * @param res
     */
    public remove(req: any, res: any) {
        let { document_id } = req.params;
        return Promise.resolve(this.service.remove(document_id))
            .then((data) => {
                res.status(204)
                    .end();
            })
            .catch((error) => {
                res.status(error.status)
                    .json(error);
            });
    }

    /**
     * Update a document
     *
     * @param req
     * @param res
     */
    public update(req: any, res: any ) {

        let { document_id } = req.params
            , { body } = req;

        return Promise.resolve(this.service.update(document_id, body))
            .then((data) => {
                res.status(200)
                    .json(data);
            })
            .catch((error) => {
                res.status(error.status)
                    .json(error)
            });
    }
}