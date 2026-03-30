class BlogView {
    constructor() {
        this.postsContainer = document.getElementById('posts-container');
        this.titleInput = document.getElementById('post-title');
        this.contentInput = document.getElementById('post-content');
        this.addPostBtn = document.getElementById('add-post-btn');
    }

    // Очищення форми
    _resetInput() {
        this.titleInput.value = '';
        this.contentInput.value = '';
    }

    // Відображення усіх постів
    displayPosts(posts) {
        this.postsContainer.innerHTML = ''; // Очищаємо контейнер

        if (posts.length === 0) {
            this.postsContainer.innerHTML = '<p class="text-muted">Поки немає жодного запису.</p>';
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('devblog_currentUser')) || {};

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'card mb-4 shadow-sm';
            
            // Якщо автор поста = поточний юзер, показуємо кнопку видалення
            const deletePostBtn = post.authorEmail === currentUser.email 
                ? `<button class="btn btn-sm btn-outline-danger delete-post-btn" data-id="${post.id}">Видалити пост</button>` 
                : '';

            const commentsHTML = post.comments.length > 0 
                ? post.comments.map(c => `
                    <div class="ms-3 mb-2 p-2 bg-light rounded d-flex justify-content-between">
                        <div><strong>${c.author}:</strong> ${c.text}</div>
                        ${c.authorEmail === currentUser.email ? `<button class="btn btn-sm btn-link text-danger p-0 delete-comment-btn" data-post-id="${post.id}" data-comment-id="${c.id}">Видалити</button>` : ''}
                    </div>`).join('')
                : '<p class="text-muted ms-3">Коментарів поки немає...</p>';

            postElement.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title">${post.title}</h3>
                    <p class="text-muted small">Автор: ${post.authorName || 'Невідомий'}</p>
                    <p class="card-text">${post.content}</p>
                    ${deletePostBtn}
                    
                    <hr>
                    <h5>Коментарі:</h5>
                    <div class="comments-list">${commentsHTML}</div>
                    
                    ${currentUser.email ? `
                    <div class="mt-3 ms-3 d-flex">
                        <input type="text" class="form-control form-control-sm me-2 comment-input" placeholder="Написати коментар...">
                        <button class="btn btn-sm btn-secondary add-comment-btn" data-post-id="${post.id}">Відправити</button>
                    </div>` : '<p class="text-muted ms-3">Увійдіть, щоб залишати коментарі.</p>'}
                </div>
            `;
            this.postsContainer.appendChild(postElement);
        });
    }

    // Прив'язка подій для створення поста
    bindAddPost(handler) {
        this.addPostBtn.addEventListener('click', () => {
            const title = this.titleInput.value.trim();
            const content = this.contentInput.value.trim();
            if (title && content) {
                handler(title, content);
                this._resetInput();
            } else {
                alert('Будь ласка, заповніть усі поля!');
            }
        });
    }

    // Прив'язка подій для видалення поста
    bindDeletePost(handler) {
        this.postsContainer.addEventListener('click', event => {
            if (event.target.classList.contains('delete-post-btn')) {
                const id = parseInt(event.target.getAttribute('data-id'));
                handler(id);
            }
        });
    }

    // Прив'язка подій для додавання коментаря
    bindAddComment(handler) {
        this.postsContainer.addEventListener('click', event => {
            if (event.target.classList.contains('add-comment-btn')) {
                const postId = parseInt(event.target.getAttribute('data-post-id'));
                const inputElement = event.target.previousElementSibling;
                const text = inputElement.value.trim();
                
                if (text) {
                    handler(postId, text);
                }
            }
        });
    }
	
	bindDeleteComment(handler) {
        this.postsContainer.addEventListener('click', event => {
            if (event.target.classList.contains('delete-comment-btn')) {
                const postId = parseInt(event.target.getAttribute('data-post-id'));
                const commentId = parseInt(event.target.getAttribute('data-comment-id'));
                
                // Викликаємо функцію з контролера, передаючи обидва ID
                handler(postId, commentId);
            }
        });
    }
}