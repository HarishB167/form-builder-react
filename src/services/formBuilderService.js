import http from "./httpService";

export async function getForms() {
  const result = await http.get("/formBuilder/");
  return result.data;
}

export async function getForm(id) {
  const result = await http.get("/formBuilder/" + id);
  return result.data;
}

export async function saveForm(form) {
  if (form.id) {
    const result = await http.put(`/formBuilder/${form.id}/`, form);
    return result.data;
  } else {
    const result = await http.post("/formBuilder/", form);
    return result.data;
  }
}

export async function deleteForm(id) {
  const result = await http.delete("/formBuilder/" + id);
  return result.data;
}
