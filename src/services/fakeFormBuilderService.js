const forms = [
  {
    _id: 1,
    name: "Questions on React",
    data: [],
  },
  {
    _id: 2,
    name: "Questions on Python",
    data: [],
  },
  {
    _id: 3,
    name: "Questions on ExpressJs",
    data: [],
  },
  {
    _id: 4,
    name: "Questions on Javascript",
    data: [],
  },
  {
    _id: 5,
    name: "Questions on Django",
    data: [],
  },
];

export async function getForms() {
  return forms;
}

export async function getForm(id) {
  return forms.find((item) => item._id === id);
}

export async function saveForm(form) {
  if (form._id) {
    const form = forms.find((item) => item._id === form._id);
    form.data = form.data;
  } else {
    const formData = {
      _id: new Date().getTime(),
      ...form,
    };
    forms.push(formData);
  }
}

export async function deleteForm(id) {
  const idx = forms.findIndex((item) => item._id === id);
  if (idx > -1) forms.splice(idx, 1);
}
