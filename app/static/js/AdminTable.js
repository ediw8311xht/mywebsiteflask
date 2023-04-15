
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
        console.log(response);
        window.location.href = response["url"];
    })
    .catch((error) => {
        console.error('Error', error);
    });
}
const valid_field_types = [];
function get_fields() {
    for (const field_type in valid_field_types) {
        let a = document.getElementById("field-type-" + field_type); 
        console.log(a);
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    const current_url = window.location.href;
    function cback(r) {
        console.log(r);
        console.log(event);
    }
    get_fields();
    let csrf_token = document.getElementById("csrf_token").value;
    document.getElementById("add-table-row-button")
        .addEventListener("click", (event) => {
            post_request_fetch(current_url + '/new', '', csrf_token);
        });

}, false);



