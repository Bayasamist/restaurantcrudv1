import request from "../utils/request";

export const update = (id, data) => request.put(`/menu/${id}`, data);
export const get = (id) => request.get(`/menu/${id}`);
export const remove = (id) => request.del(`/menu/${id}`);
export const create = (data) => request.post(`/menu/create`, data);

export const list = (data) => request.get(`/menu/list`, data);

