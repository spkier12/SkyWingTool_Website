async function InformUser(msg) {
    document.getElementById("informationlogin").innerText = msg
    document.getElementById("informationlogin").style.color = 'red';
    setTimeout(() => {
        document.getElementById("informationlogin").style.color = 'white';
        return
    }, 500);
}