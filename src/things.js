import localforage from "localforage";

export async function getMe(query) {
  const resp = await fetch(
    "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/users/me",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  const jsonResp = await resp.json();
  return jsonResp.data;
}

export async function getThings(query) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (localStorage.getItem("jwt")) {
    headers["authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
  }

  const resp = await fetch(
    "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/posts",
    headers
  );
  const jsonResp = await resp.json();
  return jsonResp.data.posts;
}

export async function register(data) {
  const resp = await fetch(
    "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: data.get("username"),
          password: data.get("password"),
        },
      }),
    }
  );
  const jsonResp = await resp.json();
  return jsonResp.data.token;
}

export async function login(data) {
  const resp = await fetch(
    "https://strangers-things.herokuapp.com/api/2209-ftb-et-web-pt/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: data.get("username"),
          password: data.get("password"),
        },
      }),
    }
  );
  const jsonResp = await resp.json();
  return jsonResp.data.token;
}

export async function createThing() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let thing = { id, createdAt: Date.now() };
  let things = await getThings();
  things.unshift(thing);
  await set(things);
  return thing;
}

export async function getThing(id) {
  const things = await getThings();
  return things.filter((thing) => {
    return thing._id == id;
  })[0];
}

export async function updateThing(id, updates) {
  await fakeNetwork();
  let things = await localforage.getItem("things");
  let thing = things.find((thing) => thing.id === id);
  if (!thing) throw new Error("No thing found for", id);
  Object.assign(thing, updates);
  await set(things);
  return thing;
}

export async function deletething(id) {
  let things = await localforage.getItem("things");
  let index = things.findIndex((thing) => thing.id === id);
  if (index > -1) {
    things.splice(index, 1);
    await set(things);
    return true;
  }
  return false;
}

function set(things) {
  return localforage.setItem("things", things);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
