async function Login() {
    try {
        // Get data from inputs
        const Email0 = document.getElementById("emailinput").value
        const Password0 = document.getElementById("passwordinput").value

        // Send request
        const fetchdata = await fetch(`${apiconnections()}/apiv1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "a007934d-0607-4a3c-8aab-a79e270ea5b5": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5")
            },
            body: JSON.stringify({
                Email: Email0,
                Password: Password0
            })
        })

        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        if (fetchdata.status == 429) {
            const Getinformation = document.getElementById("informationlogin").innerText = "Slow down you are ratelimited"
        }

        if (fetchdataparsed.Status == 1 && fetchdataparsed.Message == "Token Created") {
            localStorage.setItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login", `${Email0}-${fetchdataparsed.UUID}`)
            const Getinformation = document.getElementById("informationlogin").innerText = fetchdataparsed.Message
            location.href = "/dashboard.html"
        } else if (fetchdataparsed.Status == 0) {
            const Getinformation = document.getElementById("informationlogin").innerText = fetchdataparsed.Message
        }
        
    } catch (e) {
        const Getinformation = document.getElementById("informationlogin").innerText = "try agen later"
    }

}
