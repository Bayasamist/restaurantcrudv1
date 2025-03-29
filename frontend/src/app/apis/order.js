import request from "../utils/request";

export const update = (id, data) => request.put(`/order/${id}`, data);
export const get = (id) => request.get(`/order/${id}`);
export const remove = (id) => request.del(`/order/${id}`);
export const create = (data) => request.post(`/order/create`, data);

export const list = (data) => request.get(`/order/list`, data);

