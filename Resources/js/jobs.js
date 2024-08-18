GetAllJobs()
GetRandomJobOffers()

// Get all jobs available and apply for them
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

        // Check if error is not 429 if so exit all beacuse ratelimit
        if (fetchdata.status == 429) {
            document.getElementById("informationlogin").innerText = "Slow down you are ratelimited"
            return
        }
    
        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        let alldata = ""
        String(fetchdataparsed.Data).split(",").forEach(element => {
            if (element != undefined && element != "") {
                const element2 = element.split("-")
                alldata += `
                    <tr>
                        <td>${element2[0]}</td>
                        <td><button class="custombutton" onclick="ApplyforJob('${element2[0]}')">Apply</button></td>
                    </tr>
                `    
            }

        });
        
        document.getElementById("tabledata").innerHTML = alldata
        document.getElementById("informationlogin").innerText = fetchdataparsed.Message
    } catch (e) {
        console.log(`\n Error in Jobs.js ${e}`)
    }
}



// Get random job offers if this is the first time you apply for a job
async function GetRandomJobOffers() {
    try {
        // Send request
        const fetchdata = await fetch(`${apiconnections()}/apiv1/GetRandomJobOffers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "TokenMSFS": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login")
            },
        })

        // Check if error is not 429 if so exit all beacuse ratelimit
        if (fetchdata.status == 429) {
            document.getElementById("informationlogin").innerText = "Slow down you are ratelimited"
            return
        }
    
        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        let alldata = ""
        String(fetchdataparsed.Data).split(",").forEach(element => {
            if (element != undefined && element != "") {
                alldata += `
                <tr>
                    <td>${element}</td>
                    <td><button class="custombutton" onclick="AcceptJobOffer('${element}')">Accept Offer</button></td>
                </tr>
            `
            }
        });
        document.getElementById("tabledata2").innerHTML = alldata
        document.getElementById("informationlogin").innerText = fetchdataparsed.Message
    } catch (e) {
        console.log(`\n Error in Jobs.js ${e}`)
    }
}



async function AcceptJobOffer(WJob) {
    try {

        // Check if job is not empty so that the request isnt sendt
        if (WJob == undefined && WJob == "") {
            document.getElementById("informationlogin").innerText = "Cannot join the job beacuse you tried to join a empty job"
            return
        }

        // Send request
        const fetchdata = await fetch(`${apiconnections()}/apiv1/AcceptJobOffers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "TokenMSFS": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login")
            },

            body: JSON.stringify({
                Job: WJob 
            })
        })

        // Check if error is not 429 if so exit all beacuse ratelimit
        if (fetchdata.status == 429) {
            document.getElementById("informationlogin").innerText = "Slow down you are ratelimited"
            return
        }
    
        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        document.getElementById("informationlogin").innerText = fetchdataparsed.Message
    } catch (e) {
        console.log(`\n Error in Jobs.js ${e}`)
    }
}

async function ApplyforJob(WJob) {
    try {

        if (WJob == undefined && WJob == "") {
            document.getElementById("informationlogin").innerText = "Cannot apply for the job beacuse you tried to apply for a empty job"
            return
        }
        // Send request
        const fetchdata = await fetch(`${apiconnections()}/apiv1/ApplyForJobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "TokenMSFS": localStorage.getItem("a007934d-0607-4a3c-8aab-a79e270ea5b5-login")
            },

            body: JSON.stringify({
                Job: WJob 
            })
        })
    
        // Check if error is not 429 if so exit all beacuse ratelimit
        if (fetchdata.status == 429) {
            document.getElementById("informationlogin").innerText = "Slow down you are ratelimited"
            return
        }

        // Read repsonse data and print to console and set UUID to local storage and set information on screen
        const fetchdataparsed = JSON.parse(await fetchdata.text())
        document.getElementById("informationlogin").innerText = fetchdataparsed.Message
    } catch (e) {
        console.log(`\n Error in Jobs.js ${e}`)
    }
}



