async function signup() {

    const username= document.getElementById('newUser').value;
    const password= document.getElementById('newPassword').value;
    const res= await fetch('/api/Signup', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username, password})
    });
    const data= await res.json();
    document.getElementById('msg').textContent= data.message || data.error;
    
}

async function login() {

    const username= document.getElementById('username').value;
    const password= document.getElementById('password').value;
    const res = await fetch('/api/Login', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username, password})
    });
    const data = await res.json();
    if(data.message){
        window.location.href='WelcomePage.html';
    }
    else{
        document.getElementById('mssg').textContent= data.error;
    }
    
}