import { Base } from "../base.ts";
import {
    EntityResponse,
    CreateEntityRequest,
    UpdateEntityRequest,
} from "./types.ts";

export class Entity extends Base {
    retrieve(): Promise<EntityResponse> {
        return this.request(`entity`, { method: "GET" });
    }

    create(payload: CreateEntityRequest): Promise<EntityResponse> {
        return this.request(`entity`, {
            data: payload,
            method: "POST",
        });
    }

    update(updateData: UpdateEntityRequest): Promise<EntityResponse> {
        return this.request(`entity`, {
            method: "PATCH",
            data: updateData,
        });
    }
}
