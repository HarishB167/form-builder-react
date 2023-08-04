import http from "./httpService";

export async function getForms() {
  const result = await http.get("/formFill/");
  return result.data;
}

export async function getForm(id) {
  const result = await http.get("/formFill/" + id);
  return result.data;
}

export async function saveForm(form) {
  if (form.id) {
    const result = await http.put(`/formFill/${form.id}/`, form);
    return result.data;
  } else {
    const result = await http.post("/formFill/", form);
    return result.data;
  }
}

export async function deleteForm(id) {
  const result = await http.delete("/formFill/" + id);
  return result.data;
}
