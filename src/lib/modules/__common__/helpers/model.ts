import {model} from "mongoose";

/**
 * This is create a singleton model
 *
 * @param name
 * @constructor
 */
export function NewModel(name: string) {
    return (CustomSchema: any): any => {
        return model(name, new CustomSchema())
    }
}