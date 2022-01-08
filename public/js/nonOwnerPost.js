const { response } = require("express");

const commentFormHandler = async (event) => {
    event.preventDefault();

    console.log('button selected for comment');

    const content = document.querySelector('#commentInput').Value.trim();
    console.log(content);

    if (content) {

        console.log('sending Post request the API endpoin to creat a comment');

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify{{ content }}, 
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document
 .querySelector(".new-comment-form")
 .addEventListener('submit', commentFormHandler);