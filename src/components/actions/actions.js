export const addToDo = (data) => {
  return {
    type: "ADD",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};

export const DeleteToDo = (id) => {
  return { type: "DELETE", id };
};

export const updateToDo = (data) => {
  return {
    type: "UPDATE",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};
