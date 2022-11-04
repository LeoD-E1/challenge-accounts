export const getData = async () => {
  try {
    const response = await fetch('https://api.npoint.io/97d89162575a9d816661');
    return response.json();
  } catch (error) {}
};
