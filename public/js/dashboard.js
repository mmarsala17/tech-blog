var addBtn = document.getElementById('addBtn');

const addButtonHandler = async (Eevent) => {
    document.location.replace('/add-post');
};

addBtn.addEventListener("click", addButtonHandler);