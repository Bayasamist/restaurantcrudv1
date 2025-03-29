import request from "../utils/request";

export const update = (id, data) => request.put(`/table/${id}`, data);
export const get = (id) => request.get(`/table/${id}`);
export const remove = (id) => request.del(`/table/${id}`);
export const create = (data) => request.post(`/table/create`, data);

export const list = (data) => request.get(`/table/list`, data);

