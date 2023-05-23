document.addEventListener("DOMContentLoaded", () => {
    let desktopContent = ""; // Variable für den ursprünglichen Inhalt von #desktop

    function loadContent(name) {
        async function fetchContent() {
            let response = await fetch(name + '.html');
            console.log(response.status); // 200
            console.log(response.statusText); // OK
            if (response.status === 200) {
                let htmlSnippet = await response.text();
                desktopContent = document.querySelector("#desktop").innerHTML; // Speichere den ursprünglichen Inhalt
                document.querySelector("#desktop").innerHTML = htmlSnippet;

                // Füge den Eventlistener für den "exit"-Button hinzu
                let exitBtn = document.getElementById('exit');
                exitBtn.addEventListener("click", closePopup);
            } else {
                console.error('Fehler beim Laden des Inhalts.');
            }
        }

        fetchContent();
    }

    function closePopup() {
        document.querySelector("#desktop").innerHTML = desktopContent; // Stelle den ursprünglichen Inhalt wieder her
        // Entferne den Eventlistener für den "exit"-Button
        let exitBtn = document.getElementById('exit');
        exitBtn.removeEventListener("click", closePopup);
        // Füge den Eventlistener für den "ms_start"-Button erneut hinzu
        let ms_start = document.querySelector('#minesweeper-icon');
        ms_start.addEventListener("click", openPopup);
    }

    function openPopup() {
        ms_start.removeEventListener("click", openPopup);
        loadContent("popup");
    }

    let ms_start = document.querySelector('#minesweeper-icon');
    ms_start.addEventListener("click", openPopup);
});
