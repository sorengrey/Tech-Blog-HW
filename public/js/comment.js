  const postComment = async (event) => {
    event.preventDefault();

    document.location.replace('/comment');
    const content = document.querySelector('.comment-content').value.trim();

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

// document
//     .querySelector('.post-comment')
//     .addEventListener('click', postComment);