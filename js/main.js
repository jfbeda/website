
function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(el => {
        fetch(el.getAttribute('data-include'))
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;

                // Evaluate any script tags included in the fetched HTML
                const scripts = el.querySelectorAll('script');
                scripts.forEach(script => {
                    eval(script.innerText);  // Execute any script included
                });

                // Run the updateLastUpdated function after the HTML is included
                if (el.getAttribute('data-include') === 'footer.html') {
                    updateLastUpdated();
                }
            });
    });
}


document.addEventListener("DOMContentLoaded", includeHTML);

function downloadContact() {
    const link = document.createElement('a');
    link.href = 'files/Jack\ Beda.vcf'; // Path to your .vcf file
    link.download = 'Jack\ Beda.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



function downloadCV() {
    const link = document.createElement('a');
    link.href = 'files/Jack_Beda_CV.pdf'; // Path to your .pdf file
    link.download = 'Jack_Beda_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function formatDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function updateLastUpdated() {
    const lastModified = new Date(document.lastModified);
    const formattedDate = formatDate(lastModified);
    const lastUpdatedElement = document.getElementById("last-updated");
    if (lastUpdatedElement) {
        lastUpdatedElement.innerHTML = "This tab was last updated: " + formattedDate;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
    updateLastUpdated();  // Call this after the HTML has been included
});

