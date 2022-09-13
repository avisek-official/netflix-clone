const FIREBASE_URL =
  "https://netflix-clone-e20c0-default-rtdb.asia-southeast1.firebasedatabase.app";

export default async function verifyUser(email, password) {
  //console.log(email, password);
  let userData = [];
  let users = await fetch(`${FIREBASE_URL}/users.json`);
  users = await users.json();
  for (const key in users) {
    if (key !== "0") {
      userData.push({ ...users[key], uid: key });
    }
  }
  if (userData.length > 0) {
    let loggedUser = userData.filter(
      (user) => user.email === email && user.password === password
    );
    if (loggedUser.length === 1) {
      //return true;
      return loggedUser[0].uid;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
