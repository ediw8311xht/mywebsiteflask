
function get_request_fetch(url, ID, callback) {
    fetch(url + ID, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    })
    .then(response => callback)
    .catch((error) => {
        console.error('Error', error);
    });
}

function post_request_fetch(url, send_data, csrf) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-CSRF-TOKEN": csrf,
        },
        body: send_data,
        redirect: 'follow',
    })
    .then(response => {
        console.log(response);
        window.location.href = response["url"];
    })
    .catch((error) => {
        console.error('Error', error);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    function cback(r) {
        console.log(r);
    }

    let csrf_token = document.getElementById("csrf_token").value;

    let red_button = document.getElementById("red-button");
    red_button.addEventListener("click", (event) => {
        post_request_fetch('Admin/get', JSON.stringify(a), csrf_token);
    });

    let blue_button = document.getElementById("blue-button");
    blue_button.addEventListener("click", (event) => {
        get_request_fetch('Admin/get', b["ID"], cback);
    });

}, false);

