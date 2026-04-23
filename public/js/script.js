// ADD ITEM
function addItem() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const contact = document.getElementById("contact").value;

    if (!title || !description) {
        alert("Title and Description required");
        return;
    }

    fetch("/add-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, category, contact })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadItems();

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "";
        document.getElementById("contact").value = "";
    });
}


// LOAD ITEMS
function loadItems() {
    fetch("/items")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("itemsGrid");
        grid.innerHTML = "";

        data.forEach(item => {
            grid.innerHTML += `
                <div class="item-card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p>${item.category || ""}</p>
                    <p>📞 ${item.contact || ""}</p>
                </div>
            `;
        });
    });
}
// search 

function searchItems() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categorySelect").value;

    fetch("/items")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("itemsGrid");
        grid.innerHTML = "";

        const filtered = data.filter(item => {
            return (
                item.title.toLowerCase().includes(keyword) ||   // ✅ FIXED
                item.description.toLowerCase().includes(keyword)
            ) &&
            (category === "" || item.category === category);
        });

        if (filtered.length === 0) {
            grid.innerHTML = "<p>No matching items found</p>";
            return;
        }

        filtered.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("item-card");

            div.innerHTML = `
                <h3>${item.title}</h3>   <!-- ✅ FIXED -->
                <p>${item.description}</p>
                <p><b>${item.category || ""}</b></p>
                <p>📞 ${item.contact || ""}</p>
            `;

            grid.appendChild(div);
        });
    })
    .catch(err => console.log(err));
}

// AUTO LOAD
window.onload = loadItems;