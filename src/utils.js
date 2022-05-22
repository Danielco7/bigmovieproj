import Axios from 'axios';

const getAll = (url) => Axios.get(url);

const getById = (url, id) => Axios.get(`${url}/${id}`);

const addObj = (url, obj) => Axios.post(url, obj);

const updateObj = (url, id, obj) => Axios.put(`${url}/${id}`, obj);

const deleteObj = (url, id) => Axios.delete(`${url}/${id}`);

// const deleteAll = (url) => db.collection.remove(url);

const gettodosbyid=(url,id)=>Axios.get(`${url}?userId=${id}`)

export { getAll, getById, addObj, updateObj, deleteObj,gettodosbyid };