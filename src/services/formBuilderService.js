import http from "./httpService";

export async function getForms() {
  const result = await http.get("/forms/");
  return result.data;
}

export async function getForm(id) {
  const result = await http.get("/forms/" + id);
  return result.data;
}

export async function saveForm(form) {
  const m = {
    title: form.title,
    numberInStock: form.numberInStock,
    dailyRentalRate: form.dailyRentalRate,
    genre: form.genreId,
  };
  if (form.id) {
    const result = await http.put(`/forms/${form.id}/`, m);
    return result.data;
  } else {
    const result = await http.post("/forms/", m);
    return result.data;
  }
}

export async function deleteForm(id) {
  const result = await http.delete("/forms/" + id);
  return result.data;
}
