
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("HERE");
    let sb = document.getElementById("submit-button");
    let jb = document.getElementById("get-button");


    sb.addEventListener("click", (event) => {

        let ta = document.getElementById("request-admin-t");
        let req = new XMLHttpRequest();
        
        req.open("POST", "", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        req.onreadystatechange = () => { // Call a function when the state changes.
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                console.log("IN DONE")
            }
        }

        let a = {
            'title': "Sunny day",
            'info' : "Sunny day stuff",
            'tags' : ["weather", "fun", "vacation"],
            'text' : "1. Sunny Day Love: I love sunny days because they are awesome, ps. I love sunny days.",
            'html' :  '<div><h1>1. Sunny Day Love:</h1><p> I love sunny days because they are awesome, ps. I love sunny days.</p></div>'
        }
        req.send(JSON.stringify(a));

    });

    jb.addEventListener("click", (event) => {
        let req = new XMLHttpRequest();
        req.open("POST", "Admin/get", true)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = () => { // Call a function when the state changes.
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                console.log(req.responseText);
            }
        }

        req.send(JSON.stringify({"ID": 15}));
    });

}, false);


