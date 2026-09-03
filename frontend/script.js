async function generatePolicy() {

    const service = document.getElementById("service").value;
    const resource = document.getElementById("resource").value;
    const permission = document.getElementById("permission").value;

    const policyOutput = document.getElementById("policyOutput");

    // Check whether resource name is entered
    if (!resource) {
        policyOutput.textContent = "Please enter a resource name.";
        return;
    }

    // Show loading message
    policyOutput.textContent = "Generating policy...";

    try {

        // Send request to deployed Render backend
        const response = await fetch(
            "https://cloud-resource-least-privilege-iam.onrender.com/generate-policy",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    service: service,
                    resource: resource,
                    permission: permission
                })
            }
        );

        const data = await response.json();

        // Handle backend errors
        if (!response.ok) {
            policyOutput.textContent =
                data.error || "Failed to generate policy.";
            return;
        }

        // Display generated IAM policy
        policyOutput.textContent =
            JSON.stringify(data.policy, null, 4);

    } catch (error) {

        console.error("Error:", error);

        policyOutput.textContent =
            "Unable to connect to backend.";
    }
}


// Copy generated policy
function copyPolicy() {

    const policyOutput =
        document.getElementById("policyOutput").textContent;

    navigator.clipboard.writeText(policyOutput);

    alert("IAM Policy copied to clipboard!");
}
