export const handleAddSnippet = navigate => {
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const randomId = generateRandomId();
  navigate(`/f/${randomId}/new`);
};
