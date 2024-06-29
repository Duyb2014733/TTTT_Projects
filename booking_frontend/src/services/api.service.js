import axios from "axios";

const commonConfig = {
  headers: {
    Accept: "application/json",
  },
};

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    ...commonConfig,
  });

  instance.upload = (url, data, config = {}) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return instance.post(url, formData, {
      ...commonConfig,
      ...config,
      headers: {
        ...commonConfig.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return instance;
};

export default createAxiosInstance;
