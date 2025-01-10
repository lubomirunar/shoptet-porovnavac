document.addEventListener("DOMContentLoaded", function () {
    // Inicializace porovnávacího seznamu
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];

    // Aktualizace ikony porovnání
    function updateCompareIcon() {
        let compareCount = compareList.length;
        let compareIcon = document.querySelector('.compare-icon');
        if (!compareIcon) {
            compareIcon = document.createElement('div');
            compareIcon.classList.add('compare-icon');
            compareIcon.onclick = function () {
                showCompareTable();
            };
            document.body.appendChild(compareIcon);
        }
        compareIcon.innerText = `Porovnávač (${compareCount})`;
    }

    // Funkce pro zobrazení tabulky
    function showCompareTable() {
        let compareTable = document.createElement('div');
        compareTable.id = 'compare-table-container';
        compareTable.innerHTML = `
            <h2>Porovnání produktů</h2>
            <table id="compare-table">
                <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <button onclick="closeCompareTable()">Zavřít</button>
        `;
        document.body.appendChild(compareTable);
        updateCompareTable();
    }

    // Funkce pro aktualizaci tabulky
    function updateCompareTable() {
        const tableBody = document.querySelector('#compare-table tbody');
        tableBody.innerHTML = '';
        compareList.forEach(function (productId) {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>Produkt ID: ${productId}</td>
                <td><button onclick="removeFromCompare(${productId})">Odebrat</button></td>
            `;
            tableBody.appendChild(productRow);
        });
    }

    // Funkce pro zavření tabulky
    window.closeCompareTable = function () {
        const compareTable = document.getElementById('compare-table-container');
        if (compareTable) {
            compareTable.remove();
        }
    };

    // Aktualizace ikony při načtení stránky
    updateCompareIcon();
});
