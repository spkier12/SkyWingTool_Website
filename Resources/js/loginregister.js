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
            await InformUser("Slow down you are ratelimited")
        }

        // Ifr everything is OK then take us to dashboard
        if (fetchdataparsed.Status == 1 && fetchdataparsed.Message == "Token Created") {
            localStorage.setItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login", `${Email0}-${fetchdataparsed.UUID}`)
            await InformUser(fetchdataparsed.Message)
            location.href = "/dashboard.html"

        //  If status is 0 then something is wrong
        } else if (fetchdataparsed.Status == 0) {
            await InformUser(fetchdataparsed.Message)
        }
        
    } catch (e) {
        await InformUser("Try agen later")
    }

}

async function Register() {
    try {
        // Get data from inputs
        const Email0 = document.getElementById("emailinputr").value
        const Username0 = document.getElementById("usernameinputr").value
        const Password0 = document.getElementById("passwordinputr").value

        // Send request
        const fetchdata = await fetch(`${apiconnections()}/apiv1/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "a007934d-0607-4a3c-8aab-a79e270ea5b5": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5")
            },
            body: JSON.stringify({
                Email: Email0,
                Username: Username0,
                Password: Password0
            })
        })

        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        if (fetchdata.status == 429) {
            await InformUser("Slow down you are ratelimited")
        }

        if (fetchdataparsed.Status == 1 && fetchdataparsed.Message == "Token Created") {
            localStorage.setItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login", `${Email0}-${fetchdataparsed.UUID}`)
            await InformUser(fetchdataparsed.Message)
            location.href = "/dashboard.html"
        } else if (fetchdataparsed.Status == 0) {
            await InformUser(fetchdataparsed.Message)
        }
        
    } catch (e) {
        await InformUser("try agen later")
    }

}

// Hide previous login page if create new acount button is rpessed
async function Createnewaccountbutton() {
    document.getElementById("model").style.display = "none"
    document.getElementById("model2").style.display = "block"
}