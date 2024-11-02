function createSidebar() {
    // Load the JSON structure (assuming it's in a separate file)
    fetch("\pwp\sidebar.json")
        .then(response => response.json())
        .then(data => {
            const sidebar = data.sidebar;
            const sidebarContainer = document.getElementById("sidebar-nav");

            // Loop through each menu item in the JSON and build the HTML
            sidebar.forEach((menuItem, index) => {
                let html = ``;

                // Check if 'submenu' exists and has items
                if (menuItem.submenu && menuItem.submenu.length > 0) {
                    // If there are submenus, create a collapsible item
                    html += `
                        <a class="list-group-item" data-bs-toggle="collapse" href="#submenu${index}" role="button" aria-expanded="false" aria-controls="submenu${index}">
                            ${menuItem.title}
                        </a>
                        <div class="collapse" id="submenu${index}">
                            <ul class="submenu nav flex-column ms-3">`;

                    menuItem.submenu.forEach(submenuItem => {
                        html += `
                                <a href="${submenuItem.link}" class="list-group-item">${submenuItem.title}</a>
                            `;
                    });

                    html += `</ul></div>`;
                } else {
                    // If there are no submenus, create a simple link
                    html += `<a href="${menuItem.link}" class="list-group-item">${menuItem.title}</a>`;
                }

                html += ``;

                // Append the generated HTML to the sidebar container
                sidebarContainer.innerHTML += html;
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
};

