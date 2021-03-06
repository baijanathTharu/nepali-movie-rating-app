import axios from 'axios';

const ENV = { type: 'prod' };

const http = axios.create({
  baseURL: ENV.type === 'dev' ? `${process.env.REACT_APP_BASE_URL}` : '/api',
  responseType: 'json',
});

const getHeaders = (isSecured) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (!isSecured) return headers;
  headers['authorization'] = sessionStorage.getItem('token');
  return headers;
};

export const POST = (
  url,
  data,
  configParams = {},
  isSecured = false,
  isMultipart = false
) => {
  const tempHeaders = getHeaders(isSecured);

  if (isMultipart) {
    tempHeaders['Content-Type'] = 'multipart/form-data';
  }

  return http.post(url, data, {
    configParams,
    headers: { ...tempHeaders },
  });
};

export const GET = (url, configParams = {}, isSecured = true) => {
  return http.get(url, {
    configParams,
    headers: getHeaders(isSecured),
  });
};

export const PUT = (url, data, configParams = {}, isSecured = true) => {
  return http.put(url, data, { configParams, headers: getHeaders(isSecured) });
};

export const Delete = (url, configParams = {}, isSecured = true) => {
  return http.delete(url, { configParams, headers: getHeaders(isSecured) });
};
