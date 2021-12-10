export const isUserAuthenticated = (): boolean => {
  const rawUserSessionData = sessionStorage.getItem('userSessionData');
  let userSessionData = null;

  if (rawUserSessionData) {
    userSessionData = JSON.parse(rawUserSessionData);
  }

  return userSessionData ? true : false;
}

export const getCurrentUserId = () => {
    // check if already logged in
    let rawUserSessionData = sessionStorage.getItem('userSessionData');
    let userSessionData = null;

    if (rawUserSessionData) {
        userSessionData = JSON.parse(rawUserSessionData);
    }

    if (userSessionData) {
        return userSessionData.userId
    }

    return undefined
}