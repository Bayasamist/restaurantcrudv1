import request from "../utils/request";

export const update = (id, data) => request.put(`/user/${id}`, data);
export const get = (id, data) => request.get(`/user/${id}`, data);

