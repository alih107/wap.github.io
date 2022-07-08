const baseUrl = 'http://localhost:3000/'

window.onload = async function() {
    const saveButton = document.getElementById('new-submit');
    saveButton.addEventListener('click', async function() {
        let title = document.getElementById('new-title');
        let isbn = document.getElementById('new-isbn');
        let publishedDate = document.getElementById('new-published-date');
        let author = document.getElementById('new-author');
        console.log(title, isbn, publishedDate, author);
        await fetch(baseUrl + 'books', {
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                isbn: isbn.value,
                publishedDate: publishedDate.value,
                author: author.value }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        title.value = '';
        isbn.value = '';
        publishedDate.value = '';
        author.value = '';
        await loadBooks();
        setMessage('Book successfully saved!', 'message-create');
    });

    await loadBooks();
};

async function loadBooks() {
    let result = await fetch(baseUrl + 'books');
    let books = await result.json();
    const tableList = document.getElementById('table-books-list');
    const tableEdit = document.getElementById('table-books-edit');
    tableList.innerHTML = '';
    tableEdit.innerHTML = '';
    Object.values(books).forEach(b => {
        let row = tableList.insertRow();

        row.insertCell(0).innerHTML = b.id;
        row.insertCell(1).innerHTML = b.title;
        row.insertCell(2).innerHTML = b.isbn;
        row.insertCell(3).innerHTML = b.publishedDate;
        row.insertCell(4).innerHTML = b.author;

        let btn = document.createElement('button');
        btn.innerHTML = 'Delete';
        btn.value = b.id;
        btn.addEventListener('click', async function() {
            await fetch(baseUrl + 'books/' + this.value, {
                method: 'DELETE'
            });
            await loadBooks();
            setMessage('Book successfully deleted!', 'message-delete');
        });
        row.insertCell(5).appendChild(btn);
        // *********** //
        row = tableEdit.insertRow();

        row.insertCell(0).innerHTML = b.id;

        let titleField = document.createElement('input');
        titleField.className = 'edit-title-field';
        titleField.value = b.title;
        titleField.id = `edit-title-${b.id}`;
        row.insertCell(1).appendChild(titleField);

        let isbnField = document.createElement('input');
        isbnField.className = 'edit-isbn-field';
        isbnField.value = b.isbn;
        isbnField.id = `edit-isbn-${b.id}`;
        row.insertCell(2).appendChild(isbnField);

        let publishedDateField = document.createElement('input');
        publishedDateField.value = b.publishedDate;
        publishedDateField.id = `edit-publishedDate-${b.id}`;
        row.insertCell(3).appendChild(publishedDateField);

        let authorField = document.createElement('input');
        authorField.className = 'edit-author-field';
        authorField.value = b.author;
        authorField.id = `edit-author-${b.id}`;
        row.insertCell(4).appendChild(authorField);

        let updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Update';
        updateBtn.value = b.id;
        updateBtn.addEventListener('click', async function() {
            await fetch(baseUrl + 'books/' + this.value, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: document.getElementById(`edit-title-${this.value}`).value,
                    isbn: document.getElementById(`edit-isbn-${this.value}`).value,
                    publishedDate: document.getElementById(`edit-publishedDate-${this.value}`).value,
                    author: document.getElementById(`edit-author-${this.value}`).value }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
            await loadBooks();
            setMessage('Book successfully updated!', 'message-update');
        });
        row.insertCell(5).appendChild(updateBtn);
    });
}

function setMessage(text, messageId) {
    let message = document.getElementById(messageId);
    message.innerHTML = text;
    setTimeout(() => {
        document.getElementById(messageId).innerHTML = '';
    }, 3000);
}