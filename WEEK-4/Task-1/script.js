const usersList = document.getElementsByClassName('ins-api-users')[0];
const EXPIRATION = 8.64e+7; // 24 hours as milliseconds

const parseData = (data) => {
    return JSON.parse(data);
}

const fetchData = () => {
    console.log('fetch start');

    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    const status = response.status;

                    if (status === 404) {
                        reject('Not found');

                    } else if (status >= 400 && status <= 451) {
                        reject('Something went wrong');

                    } else if (status >= 500 && status <= 511) {
                        reject('Server error');
                    }
                } 
                return response.json();
            })
            .then(userData => {
                const data = {
                    users: userData,
                    timestamp: new Date().getTime(),
                };
                localStorage.setItem('data', JSON.stringify(data));
                resolve(data);
            })
            .catch(err => reject(err));
    });
};

const getUsers = async () => {
    let localData = parseData(localStorage.getItem('data'));

    if (localData && localData.users?.length > 0) {
        const currentTime = new Date().getTime();

        if (currentTime - localData.timestamp > EXPIRATION) {
            console.log('Data expired');
            await fetchData();
            localData = parseData(localStorage.getItem('data'));
        }

    } else {
        await fetchData();
        localData = parseData(localStorage.getItem('data'));
    }

    listUsers(localData.users);
}

const createTable = (rows) => {
    const nameColumn = document.createElement('th');
    nameColumn.textContent = 'Name';
    const emailColumn = document.createElement('th');
    emailColumn.textContent = 'Email';
    const addressColumn = document.createElement('th');
    addressColumn.textContent = 'Address';
    const deleteColumn = document.createElement('th');
    deleteColumn.textContent = 'Action';

    const tableHeader = document.createElement('thead');
    tableHeader.classList.add('table-header');

    const tableBody = document.createElement('tbody');
    tableBody.classList.add('table-body');

    const table = document.createElement('table');
    table.classList.add('users-table');

    tableHeader.append(nameColumn, emailColumn, addressColumn, deleteColumn);
    tableBody.append(...rows);
    table.append(tableHeader, tableBody);
    usersList.append(table);
};

const listUsers = (users) => {
    usersList.innerHTML = ''; 

    const tableRows = users?.map((user) => {
        const userName = document.createElement('td');
        userName.textContent = `${user.name}`;

        const userEmail = document.createElement('td');
        userEmail.textContent = `${user.email}`;

        const userAddress = document.createElement('td');
        userAddress.textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete?')) {
                const id = user.id;
                const filteredUsers = users.filter((user) => user.id!== id);
                const time = parseData(localStorage.getItem('data')).timestamp;

                localStorage.setItem('data', JSON.stringify({
                    users: filteredUsers,
                    timestamp: time,
                }));

                if (filteredUsers.length > 0) {
                    listUsers(filteredUsers);
                } else {
                    getUsers();
                }

            } else {
                return;
            }
        });

        const deleteCell = document.createElement('td');
        deleteCell.append(deleteButton);

        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-id', user.id);
        tableRow.append(userName, userEmail, userAddress, deleteCell);
        
        return tableRow;
    });

    createTable(tableRows);
};

getUsers();