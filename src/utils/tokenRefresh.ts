// let isRefreshing = false;
// let refreshSubscribers: any[] = [];

// function subscribeTokenRefresh(cb: any) {
//   refreshSubscribers.push(cb);
// }

// function onRefreshed(token: string) {
//   refreshSubscribers.map((cb) => cb(token));
// }

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config, response } = error;
//     const originalRequest = config;

//     if (response?.status === 401 && !originalRequest._retry) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         // Assume we have a function to get a new token
//         const newToken = await refreshAuthToken();

//         isRefreshing = false;
//         onRefreshed(newToken);
//         refreshSubscribers = [];

//         return axiosInstance(originalRequest);
//       }

//       const retryOriginalRequest = new Promise((resolve) => {
//         subscribeTokenRefresh((token: string) => {
//           originalRequest.headers.Authorization = "Bearer " + token;
//           resolve(axiosInstance(originalRequest));
//         });
//       });

//       return retryOriginalRequest;
//     }

//     return Promise.reject(error);
//   }
// );
