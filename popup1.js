
const addResponseElement = (data = [], element) => {
    const newSearchResponse = document.createElement("div");
    newSearchResponse.className = "searchResponse";

    const title = document.createElement("div");
    title.className = "responseTitle";
    title.textContent = data[4]; //Product Name
    newSearchResponse.appendChild(title);
    console.log[data[4]];
    console.log[data[0]];
    console.log[data[2]];

    const price = document.createElement("div");
    price.className = "responsePrice";
    price.textContent = data[0]; //Product Price
    newSearchResponse.appendChild(price);

    const url = document.createElement("a");
    url.className = "responseURL";
    url.href = data[2];
    url.textContent = "link";
    url.target = "_blank";
    newSearchResponse.appendChild(url);

    element.appendChild(newSearchResponse);
}
 
const addResponse = (data, resultElement) => {
    resultElement.removeChild(resultElement.firstChild);
    var arr = []; //arr not defined
    for (const [key, value] of Object.entries(data)){
        console.log("data for loop");
        for (const x in value){ //x not defined
            for(const y in value[x]){
                arr.push(value[x][y]);
                console.log("element added to data array");
                console.log(value[x][y]);
            }
            arr.push(key);
            addResponseElement(arr, resultElement);
        }
    }
}

document.getElementById("search-button").addEventListener("click", () =>{
    const responseElement = document.getElementById("response");
    while(responseElement.firstChild){
        responseElement.removeChild(response.firstChild);
    }
    const newSearchResponse = document.createElement("div");
    newSearchResponse.textContent = "awaiting fetch response...";
    newSearchResponse.className = "wait message";
    responseElement.appendChild(newSearchResponse);
    //test elements 
    //const temp = ["Gucci Bag","$6969","https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjuhP_08J6CAxUxzcIEHUUhCAsYABAAGgJwdg&gclid=Cj0KCQjwqP2pBhDMARIsAJQ0CzrVeFDSLlQWR2YnQt5mlDiOObxMihLnYL2-862g96XzCIe1nixNC7gaAgtKEALw_wcB&ohost=www.google.com&cid=CAESVuD2i-rr6Lmln0cKgW0VcBAdM2oaUUJ8lIT4HOAJij8vM4CA_mvsH8XeF2lGY6rtCeuAmz8SbGFouMDJMLHZMgRrgccz9xBfKbSA2XrMbnh-szpcJVTo&sig=AOD64_1sfhtk6FQdnVqapcIcE2ejNorTqA&q&adurl&ved=2ahUKEwjk0PT08J6CAxWaI0QIHRTnCyMQ0Qx6BAgOEAE&nis=2"]
    //addResponseElement(temp, responseElement)
    fetch('http://127.0.0.1:5000/data', {method:'GET',mode:'no-cors'})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); 
    })
    .then(data => {
        console.log(data);
        const jsonData = JSON.parse(data);

        chrome.storage.local.set({ myData: jsonData }, () => {
            if (chrome.runtime.lastError) {
              console.error('Error storing data:', chrome.runtime.lastError);
            } else {
              console.log('Data stored successfully');
            }
          });

        chrome.storage.local.get({ myData: jsonData }).then((result) => {
            console.log("Value is " + result.myData)
        })

        addResponse(jsonData, responseElement); //This was addResponses but i changed it to addResponse
    })
    .catch(error => {
        console.error('Error:', error);
    });
});