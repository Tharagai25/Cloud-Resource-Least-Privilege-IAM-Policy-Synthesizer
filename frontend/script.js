async function generatePolicy() {

    const service = document.getElementById("service").value;
    const resource = document.getElementById("resource").value;
    const permission = document.getElementById("permission").value;

    const policyOutput = document.getElementById("policyOutput");

    if (!resource) {
        policyOutput.textContent = "Please enter a resource name.";
        return;
    }

    policyOutput.textContent = "Generating policy...";

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/generate-policy",
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

        if (!response.ok) {
            policyOutput.textContent =
                data.error || "Failed to generate policy.";
            return;
        }

        policyOutput.textContent =
            JSON.stringify(data.policy, null, 4);

    } catch (error) {

        console.error(error);

        policyOutput.textContent =
            "Unable to connect to backend.";
    }
}


function copyPolicy() {

    const policyOutput =
        document.getElementById("policyOutput").textContent;

    navigator.clipboard.writeText(policyOutput);

    alert("IAM Policy copied to clipboard!");
}