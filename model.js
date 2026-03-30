class BlogModel {
    constructor() {
        // Завантажуємо дані з localStorage або створюємо початковий масив 
        this.posts = JSON.parse(localStorage.getItem('devblog_posts')) || [
            { 
                id: 1, 
                title: 'Перший запис у блозі', 
                content: 'Це приклад текстового вмісту повідомлення. Тут може бути будь-яка цікава інформація для читачів.', 
                comments: [
                    { id: 101, author: 'Олександр', text: 'Дуже цікава стаття, дякую!' },
                    { id: 102, author: 'Марія', text: 'Чекаю на продовження.' }
                ] 
            }
        ];
    }

    _commit() {
        localStorage.setItem('devblog_posts', JSON.stringify(this.posts));
    }

    addPost(title, content) {
        const currentUser = JSON.parse(localStorage.getItem('devblog_currentUser'));
        if (!currentUser) return alert('Увійдіть, щоб писати пости!');

        const newPost = {
            id: Date.now(),
            title: title,
            content: content,
            authorEmail: currentUser.email, // Записуємо автора
            authorName: currentUser.name,
            comments: []
        };
        this.posts.unshift(newPost);
        this._commit();
    }

    deletePost(id) {
        this.posts = this.posts.filter(post => post.id !== id);
        this._commit();
    }

    addComment(postId, text) {
        const currentUser = JSON.parse(localStorage.getItem('devblog_currentUser'));
        if (!currentUser) return alert('Увійдіть, щоб коментувати!');

        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                id: Date.now(),
                author: currentUser.name,
                authorEmail: currentUser.email, // Записуємо автора коментаря
                text: text
            });
            this._commit();
        }
    }
	
	deleteComment(postId, commentId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            // Залишаємо всі коментарі, крім того, id якого збігається з видаленим
            post.comments = post.comments.filter(c => c.id !== commentId);
            this._commit();
        }
    }
}