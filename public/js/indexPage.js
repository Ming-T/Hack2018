$(document).ready(function(){
  //log in
  function login(callback) {
    var CLIENT_ID = 'a81cae611ae24eb0ab858bb3e1a7ebc3';
    var REDIRECT_URI = 'http://localhost:8888/';
    function getLoginURL(scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
          '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
          '&scope=' + encodeURIComponent(scopes.join(' ')) +
          '&response_type=token';
    }

    var url = getLoginURL([
        'user-read-email'
    ]);

    var width = 450,
        height = 730,
        left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.addEventListener("message", function(event) {
        var hash = JSON.parse(event.data);
        if (hash.type == 'access_token') {
            callback(hash.access_token);
        }
    }, false);

    var w = window.open(url,
                        'Spotify',
                        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                       );

}

function getSomething(accessToken) {
  return $.ajax ({
        url: "https://api.spotify.com/v1/me/top/artists",
        headers: {
                 'Authorization': 'Bearer ' + accessToken
              },
        success(response) {
          console.log(response);
        }
      });
}


    function getUserData(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            }
        });
    }


  $("#getTracks").click(function(){
    // var spot = $.get https://api.spotify.com/v1/me/top/{tracks};
    alert('hello you pressed me');

    login(function(accessToken) {
      getUserData(accessToken).then(function(response) {
                    console.log(response);
                });
    });

  });
});
