function nextStep(step) {
    document.getElementById(`step${step - 1}`).style.display = "none";
    document.getElementById(`step${step}`).style.display = "block";
}

function prevStep(step) {
    document.getElementById(`step${step + 1}`).style.display = "none";
    document.getElementById(`step${step}`).style.display = "block";
}

function submitForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const event = document.getElementById("event").value;
    const details = document.getElementById("details").value.trim();

    if (!name || !email || !event) {
        alert("Please fill in all required fields.");
        return;
    }

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, event, details })
    })
    .then(response => response.json())
    .then(data => {
        if (data.receiptUrl) {
            alert("? Registration successful!");

            // Create and display receipt link
            const link = document.createElement("a");
            link.href = `http://localhost:5000${data.receiptUrl}`;
            link.textContent = "?? Download Your Receipt";
            link.target = "_blank";
            link.style.display = "block";
            link.style.marginTop = "20px";
            link.style.color = "#007BFF";
            link.style.fontWeight = "bold";

            document.body.appendChild(link);
        } else {
            alert(data.message || "Successfully submitted, but receipt unavailable.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("? Something went wrong while submitting the form.");
    });
}

