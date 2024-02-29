import { hashedPassword } from "./hashedPassword";

export const fetchData = async (action, params) => {
  let url = `http://api.valantis.store:40000/`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": hashedPassword,
    },
    body: JSON.stringify({
      action: action,
      params: params,
    }),
  };

  const result = await fetch(url, options);
  const data = await result.json();
  return data.result;
};
