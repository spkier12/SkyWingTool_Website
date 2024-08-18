GetAllJobs()
async function GetAllJobs() {
    try {
        // Send request
        const fetchdata = await fetch(`${apiconnections()}/apiv1/GetAllJobs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "TokenMSFS": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login")
            },
        })
    
        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        let alldata = ""
        String(fetchdataparsed.Data).split(",").forEach(element => {
            alldata += `
                <tr>
                    <td>${element}</td>
                    <td><button class="custombutton">Apply</button></td>
                </tr>
            `
        });
        document.getElementById("tabledata").innerHTML = alldata
    } catch (e) {
        console.log(`\n Error in Jobs.js ${e}`)
    }
}

