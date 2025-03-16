const appendLocation = $(''); // add selector here

const EXPIRATION = 8.64e+7; // 24 hours as milliseconds

const observer = new MutationObserver((mutationList) => {
    mutationList.forEach(mutation => {
        if (mutation.target.className === 'users-list') {
            if (mutation.target.childNodes.length <= 1) {
                showButton();
            }
        }
    });
});

const config = {
    childList: true,
    subtree: true
};

observer.observe(appendLocation.get(0), config);

const fetchData = async () => {
    console.log('fetch start');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            const status = response.status;

            if (status === 404) {
                throw new Error('Not found');

            } else if (status >= 400 && status <= 451) {
                throw new Error('Something went wrong');

            } else if (status >= 500 && status <= 511) {
                throw new Error('Server error');
            }

            return;
        }

        const users = await response.json();
        const timestamp = new Date().getTime();

        const data = {
            users,
            timestamp,
        };

        localStorage.setItem('data', JSON.stringify(data));

        return data;

    } catch (err) {
        console.error(err);
        return null;
    }
};

const getData = async () => {
    let localData = JSON.parse(localStorage.getItem('data'));

    if (localData && localData.users?.length > 0) {
        const currentTime = new Date().getTime();

        if (currentTime - localData.timestamp > EXPIRATION) {
            console.log('Data expired');
            localData = await fetchData();
        }

    } else {
        localData = await fetchData();
    }

    return localData ? localData.users : [];
};

const deleteUser = (id) => {
    let localData = JSON.parse(localStorage.getItem('data'));

    if (localData && localData.users?.length > 0) {
        const updatedUsers = localData.users.filter(user => String(user.id) !== String(id));

        const updatedData = {
            ...localData,
            users: updatedUsers,
        };

        if (updatedUsers.length <= 0 && sessionStorage.getItem('isShowed')) {
            $('.external-container').remove();
        }
        
        localStorage.setItem('data', JSON.stringify(updatedData));
    } else {
        console.log('Data not found');
    }
};

const displayData = async () => {
    let found = false;

    appendLocation[0].childNodes.forEach(node => {
        if (node.nodeName === 'UL' && node.classList.contains('users-list')) {
            found = true;
        }
    });

    if (!found) {

        const users = await getData();

        if (!users || users.length <= 0) {
            console.log('Users not found');
            return;
        }

        const userList = $('<ul>').addClass('users-list');

        $('<li>').addClass('list-header').html(`
            <span>Name</span>
            <span>Email</span>
            <span>Action</span>  
        `).appendTo(userList);

        users.forEach(user => {
            const listItem = $(`
            <li class='list-item' data-id='${user.id}'>
                <span>${user.name}</span>
                <span>${user.email}</span>
                <button class='delete-button'>Delete</button>
            </li>
        `);
            userList.append(listItem);
        });

        $(document).on('click', '.delete-button', function () {
            const userId = $(this).closest('li').attr('data-id');
            deleteUser(userId);
            $(this).closest('li').remove();
        });

        userList.appendTo('.external-container');
        
    }
};

const showButton = () => {
    observer.disconnect();
    if (!sessionStorage.getItem('isShowed')) {
        $('.users-list').remove();
        const button = $('<button class="show-button">Load Users</button>');
        button.one('click', () => {
            displayData();
            $('.show-button').remove();
        });
        button.appendTo('.external-container');
        sessionStorage.setItem('isShowed', true);
    } 
};

const buildCss = () => {
    $('<style>').html(`
        .external-container {
            background-color: #2B2D42;
            height: max-content;
            width: 700px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius:10px;
            border: 3px solid #D90429;
        }

        .users-list {
            display: flex;
            flex-direction: column;
            padding: 10px 20px;
            width: 600px;
            height: max-content;
            list-style: none;
            color: #EDF2F4;
            gap: 10px;
        }
        
        .list-header {
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-bottom: 5px;
            border-bottom: 1px solid #D90429;
        }

        .list-item {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .list-item span {
            flex: 1;
            text-align: left;
        }

        .delete-button {
            background-color: #EF233C;
            color: #EDF2F4;
            padding: 5px 10px;
            margin-left: auto;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        .show-button {
            width: 200px;
            height: 60px;
            background-color: #8D99AE;
            color: #EF233C;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            cursor: pointer;
        }

        .disabled {
            background-color: #EDF2F4;
            cursor: not-allowed;
        }
    `).addClass('external-style').appendTo(document.head);
};

const buildHtml = () => {
    const dataContainer = $('<div>').addClass('external-container');
    appendLocation.append(dataContainer);
};

const init = () => {
    buildCss();
    buildHtml();
    displayData();
};

init();