export const validateName = (newName?: string) => {
  if (!newName) {
    return 'Ник не может быть пустым';
  }

  if (newName.length > 24) {
    return 'Ник не может превышать 24 символа';
  }

  return null;
}
