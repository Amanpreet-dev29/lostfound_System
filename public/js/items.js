function loadItems() {
    fetch("/items")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("itemsContainer");
        container.innerHTML = "";

        data.forEach(item => {
            container.innerHTML += `
                <div class="item-card">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><b>Category:</b> ${item.category}</p>
                    <p><b>Contact:</b> ${item.contact}</p>

                    <button class="delete-btn" onclick="deleteItem(${item.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    });
}

function deleteItem(id) {
    fetch(`/delete-item/${id}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        loadItems(); // refresh
    });
}

/* LOAD ON PAGE OPEN */
window.onload = loadItems;