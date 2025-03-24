import { Base } from "../base.ts";
import { EntityResponse, EntityCreationRequest, EntityUpdateRequest } from "./types.ts";

export class Entity extends Base {
  retrieve(): Promise<EntityResponse> {
    return this.request(`entity`, { method: "GET" });
  }

  create(payload: EntityCreationRequest): Promise<EntityResponse> {
    return this.request(`entity`, {
      data: payload,
      method: "POST",
    });
  }

  update(
    updateData: EntityUpdateRequest
  ): Promise<EntityResponse> {
    return this.request(`entity`, {
      method: "PATCH",
      data: updateData,
    });
  }
}
