const updateButtonHandler = async (event) => {
    console.log('button clicked')

    const id = event.target.getAttribute('data-id');

    document.location.replace('/add-post')
};


const delButtonHandler = async (event) => {

    console.log('del button clicked')

    const id = event.target.getAttribute('data-id');

    const response = await fetch('/api/posts/${id}', {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

document
    .querySelector('#deleteBtn')
    .addEventListener('click', delButtonHandler);

    document
    .querySelector("#updateBtn")
    .addEventListener('click', updateButtonHandler);