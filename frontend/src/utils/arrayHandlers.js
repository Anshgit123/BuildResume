// utils/arrayHandlers.js
export const updateArrayItem = (arrayName, index, key, value, state, setState) => {
  const updatedArray = [...state[arrayName]];

  if (key) {
    updatedArray[index] = { ...updatedArray[index], [key]: value };
  } else {
    updatedArray[index] = { ...updatedArray[index], value };
  }

  setState({ ...state, [arrayName]: updatedArray });
};

export const addArrayItem = (arrayName, newItem, state, setState) => {
  const updatedArray = [...state[arrayName], newItem];
  setState({ ...state, [arrayName]: updatedArray });
};

export const removeArrayItem = (arrayName, index, state, setState) => {
  const updatedArray = state[arrayName].filter((_, i) => i !== index);
  setState({ ...state, [arrayName]: updatedArray });
};
