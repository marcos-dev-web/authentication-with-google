function sendToken(token) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/gettoken");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    let response = xhr.responseText;
    if (response === 'success') {
      signOut();
      location.assign('/profile')
    }
  };
  xhr.send("idtoken=" + token);
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;

  sendToken(id_token);
  
  // let profile = googleUser.getBasicProfile();
  // let name = profile.getName();
  // let image = profile.getImageUrl();
  // profile.getId())
  // profile.getName())
  // profile.getImageUrl())
  // profile.getEmail())
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function loged() {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'loged');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    let response = xhr.responseText;
    if (response === 'success') {
      let g = document.querySelector('#g')
      g.removeAttribute('data-onsuccess')
    } else {
      let g = document.querySelector('#g')
      g.setAttribute('data-onsuccess', 'onSignIn');
      g.classList.remove('server')
    }
  }
  xhr.send()
}

loged()