// userDataStructure.js
export const createUserData = (data) => (
  // console.log("data => ",data),
  {
  token: data.token || null,
  firstName: data.firstName || '',
  lastName: data.lastName || '',
  email: data.email || '',
  accountType: data.accountType || '',
  description: data.description || data.about || '',
  contactNum: data.contact || data.contactNum || data.number ||'',
  gender: data.gender || '',
  DOB: data.DOB || '',
  imageURL: data.imageURL || data.image || null,
});