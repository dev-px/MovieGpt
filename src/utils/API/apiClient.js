import { options } from './../Constant';

export default async function apiClient(endPoint, signal = {}) {
    const url = "https://api.themoviedb.org/3/movie/" + endPoint;
    const options_param = { ...options, ...signal };
    const res = await fetch(url, options_param);
    if (!res.ok) throw new Error;
    const data = await res.json();
    return data;
}