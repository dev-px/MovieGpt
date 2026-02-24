import { options } from './../Constant';

// ...existing code...
export default async function apiClient(endPoint, signal = {}) {
    const url = "https://api.themoviedb.org/3/movie/" + endPoint;
    const options_param = { ...options, ...signal };
    console.log(options_param);
    const res = await fetch(url, options_param);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(data);
    return data;
}