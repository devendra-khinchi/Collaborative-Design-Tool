import api from "./api";

export const loginApi = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};
export const signupApi = async (name, email, password) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};

export const deleteMockup = async (id) => {
  const response = await api.delete(`/mockups/${id}`);
  return response.data;
};

export const getMockups = async () => {
  const response = await api.get("/mockups");
  return response.data;
};

export const addMockup = async (image, title) => {
  const data = new FormData();

  data.append("title", title);
  data.append("image", image);
  const response = await api.post("/mockups", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getMockupDetails = async (id) => {
  const response = await api.get(`/mockups/${id}`);
  return response.data;
};
