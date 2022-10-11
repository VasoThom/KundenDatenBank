async function getUsers() {
  const response = await fetch(`http://localhost:4000/users`);
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  async function init() {
    try {
      await getUsers();
    } catch (err) {
      alert("gibts nichts");
      console.log(err);
    }
  }

  const users = await response.json();
  console.log(users);

  const ul = document.querySelector("ul");

  users.forEach((users) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = users.avatar;
    li.append(img);
    const firtsName = document.createElement("h3");
    firtsName.innerText = users.first_name;
    li.append(firtsName);
    const lastName = document.createElement("h3");
    lastName.innerText = users.last_name;
    li.append(lastName);
    const city = document.createElement("p");
    city.innerText = users.city;
    li.append(city);
    const email = document.createElement("p");
    email.innerText = users.email;
    li.append(email);
    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.addEventListener("click", () => {
      li.remove();
      fetch(`http://localhost:4000/users/${users.id}`, {
        method: "DELETE",
      });
    });
    li.append(btn);
    ul.append(li);
  });
  // const removeAll = document.querySelector(".removeTasks");
  // removeAll.addEventListener("click", () => {
  //   alert("Remove all tasks from  the list");
  //   // li.closest("li").remove();
  //   li.remove();
  //   fetch(`http://localhost:4000/users/`, {
  //     method: "DELETE",
  //   });
  // });

  console.log(users);
}

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = [...event.target.querySelectorAll("input")].reduce((acc, el) => {
    if (acc[el.placeholder] === undefined) acc[el.placeholder] = "";
    acc[el.placeholder] = el.value;
    return acc;
  }, {});
  fetch("http://localhost:4000/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});

form.reset();
getUsers();
