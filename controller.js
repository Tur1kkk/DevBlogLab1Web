class BlogController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Початкове відображення даних
        this.onPostsChanged(this.model.posts);

        // Прив'язуємо методи View до функцій Model
        this.view.bindAddPost(this.handleAddPost);
        this.view.bindDeletePost(this.handleDeletePost);
        this.view.bindAddComment(this.handleAddComment);
		this.view.bindDeleteComment(this.handleDeleteComment);
    }

    // Функція, яка оновлює View, коли змінюється Model
    onPostsChanged = (posts) => {
        this.view.displayPosts(posts);
    };

    // Обробники подій
    handleAddPost = (title, content) => {
        this.model.addPost(title, content);
        this.onPostsChanged(this.model.posts);
    };

    handleDeletePost = (id) => {
        this.model.deletePost(id);
        this.onPostsChanged(this.model.posts);
    };

    handleAddComment = (postId, text) => {
        this.model.addComment(postId, text);
        this.onPostsChanged(this.model.posts);
    };
	
	handleDeleteComment = (postId, commentId) => {
        this.model.deleteComment(postId, commentId);
        this.onPostsChanged(this.model.posts);
    };
}

// Ініціалізація додатку після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    const app = new BlogController(new BlogModel(), new BlogView());
});