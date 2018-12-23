import {Router} from "express";
import {logger} from "@util/logger";
import {Controller} from "@lib/modules/__common__/controller";
import * as bodyParser from "body-parser";

export const routes = Router();

routes.use(bodyParser.json({
    limit: '2mb'
}));

/**
 * Inserting documents (C)
 *
 * @api
 * @endpoint: /api/[model_name]
 */
routes.post('/api/:model_name', (req: any, res: any) => {
    Controller.resolve(req.params.model_name)
        .then(c => c.insert(req, res))
        .catch((error) => {
            res.status(error.status)
                .json(error)
        });

    logger.log('info', req.body);
});

/**
 * Updating documents(U)
 *
 * @endpoint: /api/[model_name]/[record_id]
 */
routes.put('/api/:model_name/:document_id', (req: any, res: any) => {

    Controller.resolve(req.params.model_name)
        .then((c) => c.update(req, res))
        .catch((error) => {
            res.status(error.status)
                .json(error);
        });

    logger.log('info', req.body);
});

/**
 * Getting documents (R)
 *
 * @endpoint: /api/[model_name]/[document_id]
 */
routes.get('/api/:model_name/:document_id', (req: any, res: any) => {

    Controller.resolve(req.params.model_name)
        .then((c) => c.get(req, res))
        .catch((error) => {
            res.status(error.status)
                .json(error)
        });
});

/**
 * Getting documents (R)
 *
 * @endpoint: /api/[model_name]/[document_id]
 */
routes.get('/api/:model_name', (req: any, res: any) => {

    Controller.resolve(req.params.model_name)
        .then((c) => c.getAll(req, res))
        .catch((error) => {
            res.status(error.status)
                .json(error)
        });
});

/**
 * Updating documents (D)
 *
 * @endpoint: /api/[model_name]/[document_id]
 */
routes.delete('/api/:model_name/:document_id', (req: any, res: any) => {
    Controller.resolve(req.params.model_name)
        .then(c => c.remove(req, res))
        .catch((error) => {
            res.status(error.status)
                .json(error);
        });
    logger.log('info', req.body);
});


