export default (data, title) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].info.title === title) {
      return data[i];
    }
  }
};
