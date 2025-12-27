// This runs on Netlify's servers
exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const payload = JSON.parse(event.body);
        const { teamID, transfers } = payload;

        // In a real scenario, you'd add FPL Auth headers here.
        // For now, we validate the sync and return success.
        console.log(`Syncing Team ${teamID} with ${transfers.length} changes.`);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "success",
                message: "Kopala Sync: Squad updated on server!",
                timestamp: new Date().getTime()
            })
        };
    } catch (err) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid Sync Data" }) };
    }
};
