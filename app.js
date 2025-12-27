// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

async function finalizeTransfers() {
    const btn = document.querySelector('.btn-primary');
    const teamID = localStorage.getItem('fpl_team_id');
    const transferData = { teamID, transfers: draftTeam };

    btn.innerText = "Syncing...";

    if (!navigator.onLine) {
        // OFFLINE LOGIC
        const queue = JSON.parse(localStorage.getItem('fpl_queue') || '[]');
        queue.push(transferData);
        localStorage.setItem('fpl_queue', JSON.stringify(queue));
        
        alert("You're offline! Transfer queued for auto-sync.");
        closeConfirm();
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/fpl-sync', {
            method: 'POST',
            body: JSON.stringify(transferData)
        });
        
        const result = await response.json();
        if (result.status === 'success') {
            alert(result.message);
            originalTeam = [...draftTeam];
            document.getElementById('save-bar').classList.remove('active');
            closeConfirm();
        }
    } catch (err) {
        alert("Sync error. Please try again.");
    } finally {
        btn.innerText = "Confirm & Save";
    }
}
