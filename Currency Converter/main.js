const populate = async (value, currency) => {
    let myStr = "";
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_tWgLpFiDqlT0C7fKa9pFIfTloiNOGJbSA0JJLDB6&base_currency=${currency}`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        let rJson = await response.json();

        // Check if 'data' exists in the response
        if (!rJson["data"]) {
            throw new Error("No data found in the response");
        }

        document.querySelector(".output").style.display = "block";

        // Clear the previous table content
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";

        // Populate the table with new data
        for (let key of Object.keys(rJson["data"])) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${key}</td>
                <td>${rJson["data"][key]["code"]}</td>
                <td>${(rJson["data"][key]["value"] * value).toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("There was an issue fetching the currency data. Please try again later.");
    }
};

document.querySelector(".btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    if (!value || value <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    await populate(value, currency);
});
