import axios from "axios";

const commonConfig = {
  headers: {
    Accept: "application/json",
  },
};

export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig,
    upload: (url, data, config = {}) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      return axios.post(url, formData, {
        ...commonConfig,
        ...config,
        headers: {
          ...commonConfig.headers,
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
