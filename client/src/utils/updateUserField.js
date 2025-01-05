export function updateUserField(userData, field, value) {
  return {
    ...userData,
    [field]: value,
  };
}