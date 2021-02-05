function setImg(url, name) {
  let img = document.createElement("img");
  img.src = url;
  img.alt = name;

  document.querySelector(".img").appendChild(img);
}

function unsetImg() {
  document.querySelector(".img").innerHTML = "";
}

function onSignIn(googleUser) {
  console.log("logged");
  let profile = googleUser.getBasicProfile();

  let name = profile.getName();
  let image = profile.getImageUrl();

  setImg(image, name);

  // profile.getId())
  // profile.getName())
  // profile.getImageUrl())
  // profile.getEmail())
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    unsetImg();
    console.log("User signed out.");
  });
}
