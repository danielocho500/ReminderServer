let email = document.getElementById('email');
let password = document.getElementById('password');
let btnLogin = document.getElementById('btnLogin');


btnLogin.addEventListener('click', e => {
    e.preventDefault();

    fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => {
        let isLogged = json.ok;

        console.log(json)

        if(isLogged){
            window.location.replace("http://localhost:3000/homepage.html");
        }
        else{
            alert("usuario no existe")
        }
    })
    .catch(err => console.log(err));
})