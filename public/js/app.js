// ADD ITEM
function addItem() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const contact = document.getElementById("contact").value;

    if (!name || !description) {
        alert("Please enter item name and description");
        return;
    }

    fetch("/add-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description, category, contact })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);

        // clear fields
        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "";
        document.getElementById("contact").value = "";

        fetchRecentItems(); // reload
    })
    .catch(err => console.log(err));
}


// LOAD ITEMS
function fetchRecentItems() {
    fetch("/items")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("itemsGrid");
        grid.innerHTML = "";

        if (data.length === 0) {
            grid.innerHTML = "<p>No items found</p>";
            return;
        }

        data.forEach(item => {
            grid.innerHTML += `
                <div class="item-card">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><b>${item.category || ""}</b></p>
                    <p>📞 ${item.contact || ""}</p>

                    <button onclick="deleteItem(${item.id})" class="delete-btn">
                        Delete
                    </button>
                </div>
            `;
        });
    })
    .catch(err => console.log(err));
}


// DELETE ITEM
function deleteItem(id) {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    fetch(`/delete-item/${id}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        fetchRecentItems();
    })
    .catch(err => console.log(err));
}


// SEARCH ITEMS
function searchItems() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categorySelect").value;

    fetch("/items")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("itemsGrid");

        const filtered = data.filter(item => {
            return (
                item.name.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword)
            ) &&
            (category === "" || item.category === category);
        });

        grid.innerHTML = "";

        if (filtered.length === 0) {
            grid.innerHTML = "<p>No matching items found</p>";
            return;
        }

        filtered.forEach(item => {
            grid.innerHTML += `
                <div class="item-card">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><b>${item.category || ""}</b></p>
                    <p>📞 ${item.contact || ""}</p>

                    <button onclick="deleteItem(${item.id})" class="delete-btn">
                        Delete
                    </button>
                </div>
            `;
        });
    })
    .catch(err => console.log(err));
}


// AUTO LOAD ON PAGE OPEN
document.addEventListener("DOMContentLoaded", fetchRecentItems);