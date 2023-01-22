export const getCities = () => {
    return fetch("/cities").then((response) => {
        console.log(response);
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get places");
      }
      return response.json();
    });
  };


export const savePlan = (data) => {
  const saveUrl = "/plan";

  return fetch(saveUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
  });
}

export const login = (credential) => {
  const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;

  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  });
};

export const signup = (data) => {
  const signupUrl = "/signup";

  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
  });
};


export const getPlan = () => {
  return fetch("/plan/get").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get my plan data");
    }

    return response.json();
  });
};
  