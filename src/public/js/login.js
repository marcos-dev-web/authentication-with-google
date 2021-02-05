function setLocalStorage(state) {
  if (!localStorage.getItem("keyLogged")) {
    localStorage.setItem("keyLogged", String(state));
  } else {
    localStorage.removeItem("keyLogged");
    localStorage.setItem("keyLogged", String(state));
  }
}

function getState() {
  return localStorage.getItem("keyLogged") ? "1" : "0";
}

function setImg(url, name) {
  let img = document.createElement("img");
  let nameUser = document.createElement("h3");
  nameUser.innerText = name;
  img.src = url;
  img.alt = name;

  let divImg = document.querySelector(".img");
  divImg.classList.remove("server");
  divImg.appendChild(img);

  let divName = document.querySelector(".name");
  divName.classList.remove("server");
  divName.appendChild(nameUser);
}

function unsetImg() {
  document.querySelector(".img").innerHTML = "";
  document.querySelector(".img").classList.add("server");
  document.querySelector(".name").classList.add("server");
}

function sendToken(token) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/gettoken");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    let response = JSON.parse(xhr.responseText);
    console.log(response)
  };
  xhr.send("idtoken=" + token);
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  document.querySelector('#g').removeAttribute('style');
  document.querySelector('.g2').classList.remove('server')
  sendToken(id_token);
  let profile = googleUser.getBasicProfile();
  document.querySelector('#g').style.display = "none";
  let name = profile.getName();
  let image = profile.getImageUrl();

  setLocalStorage(1);
  setImg(image, name);

  // profile.getId())
  // profile.getName())
  // profile.getImageUrl())
  // profile.getEmail())
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    document.querySelector('.g2').classList.add('server')
    setLocalStorage(0);
    unsetImg();
    window.location.reload();
  });
}
