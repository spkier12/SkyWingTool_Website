
// Verify if the token in local storage is valid


setInterval(async()=> {
    try {
        console.log("\n Checking token...")
        const fetchdata = await fetch (`${apiconnections()}/apiv1/VerifyJToken`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "TokenMSFS": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login")
            },
        })
    
        const getdata = JSON.parse(await fetchdata.text())
    
        if (fetchdata.status == 429) {
            console.log("Ratelimited on the token verify")
            return
        }
    
        // If token is invalid then remove it from local storage and send enduser to frontpage
        if (getdata.Status == 0) {
            localStorage.removeItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login")
            location.href = "/"
        }
    } catch(e) {
        console.log(e)
    }
}, 40000);
