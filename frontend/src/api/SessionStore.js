function storeInSession(key, value) {
  return sessionStorage.setItem(key, value);
}

function checkInSession(key) {
  return sessionStorage.getItem(key);
}

function removeFromSession(key) {
  return sessionStorage.removeItem(key);
}

function logOutUser() {
  sessionStorage.clear();
}

export { storeInSession, checkInSession, removeFromSession, logOutUser };
