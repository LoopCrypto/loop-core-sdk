import { Base } from "src/resources/base";
import {
    EntityResponse,
    CreateEntityRequest,
    UpdateEntityRequest,
} from "src/resources/entity/types";

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
