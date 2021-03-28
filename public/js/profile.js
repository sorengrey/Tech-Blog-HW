const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-desc').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/blog/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to delete post');
//     }
//   }
// };

document
  .querySelector('.new-post-form')
  .addEventListener('click', newFormHandler);

// document
//   .querySelector('.post-list')
//   .addEventListener('click', delButtonHandler);
