async function fetchUserDataByUsername(username) {
    try {
        const response = await fetch("myapi.json");
        const data = await response.json();

        const user = data.find(user => user.username.toLowerCase() === username.toLowerCase());

        const userListDiv = document.getElementById('full-name');
        const userListDiv1 = document.getElementById('email-address');
        const userListDiv2 = document.getElementById('company-name');
        const userListDiv3 = document.getElementById('website-link');
        const userListDiv4 = document.getElementById('full-address');
        const userListDiv5 = document.getElementById('phone1');
        const userListDiv6 = document.getElementById('phone2');
        const userListDiv7 = document.getElementById('phone3');
        const profileImage = document.getElementById('profile-image');

        userListDiv.innerHTML = '';
        userListDiv1.innerHTML = '';
        userListDiv2.innerHTML = '';
        userListDiv3.innerHTML = '';
        userListDiv4.innerHTML = '';
        userListDiv5.innerHTML = '';
        userListDiv6.innerHTML = '';
        userListDiv7.innerHTML = '';

        if (user) {
            const userElement = document.createElement('div');
            userElement.textContent = `${user.name}`;
            userListDiv.appendChild(userElement);

            const userElement1 = document.createElement('div');
            userElement1.textContent = `${user.email}`;
            userListDiv1.appendChild(userElement1);

            const userElement2 = document.createElement('div');
            userElement2.textContent = `${user.company ? user.company.name || '' : ''}`;
            userListDiv2.appendChild(userElement2);

            const userElement3 = document.createElement('div');
            userElement3.textContent = `${user.website || ''}`;
            userListDiv3.appendChild(userElement3);

            // Check if phone numbers exist before creating elements
        if (user.phone) {
            const userElement5 = document.createElement('div');
            userElement5.textContent = `${user.phone || ''}`;
            userListDiv5.appendChild(userElement5);
        }

        if (user.phone2) {
            const userElement6 = document.createElement('div');
            userElement6.textContent = `${user.phone2 || ''}`;
            userListDiv6.appendChild(userElement6);
        }

        if (user.phone3) {
            const userElement7 = document.createElement('div');
            userElement7.textContent = `${user.phone3 || ''}`;
            userListDiv7.appendChild(userElement7);
        }

        // Adjust classes based on the presence of phone numbers
        if (!user.phone2) {
            // Hide the second phone icon and its space
            const phone2Element = document.getElementById('phone-2');
            phone2Element.style.display = 'none';
            // Remove the pb-3 class
            phone2Element.classList.remove('pb-3');
        }

        if (!user.phone3) {
            // Hide the third phone icon and its space
            const phone3Element = document.getElementById('phone-3');
            phone3Element.style.display = 'none';
            // Remove the pb-3 class
            phone3Element.classList.remove('pb-3');
        }

            const userElement4 = document.createElement('div');
            userElement4.textContent = `${user.address.street || ''}, ${user.address.suite || ''}, ${user.address.city || ''}, ${user.address.zipcode || ''}`;
            userListDiv4.appendChild(userElement4);

            // Set the profile photo
            profileImage.src = user.profilePhoto;

            document.title = `${user.name}`;

            // Show/hide phone icons based on the number of phone numbers
            const phoneIcons = [document.getElementById('phone-icon-1'), document.getElementById('phone-icon-2'), document.getElementById('phone-icon-3')];
            const phoneNumbers = [user.phone, user.phone2, user.phone3].filter(Boolean);

            phoneIcons.forEach((icon, index) => {
                if (phoneNumbers[index]) {
                    icon.style.display = 'inline'; // Show the phone icon
                } else {
                    icon.style.display = 'none'; // Hide the phone icon
                }
            });

        } else {
            console.log(`User with username ${username} not found.`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getUsernameFromURL() {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1] || null;
}

window.onload = () => {
    const usernameFromURL = getUsernameFromURL();
    if (usernameFromURL !== null) {
        fetchUserDataByUsername(usernameFromURL);
    } else {
        console.log('No username found in the URL.');
    }
};
