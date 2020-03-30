class Comment {
  constructor(data) {
    this.id = data[`id`] || ``;
    this.user = {
      id: data[`user`][`id`] || ``,
      name: data[`user`][`name`] || ``
    };
    this.rating = data[`rating`] || ``;
    this.text = data[`comment`] || ``;
    this.date = new Date(data[`date`]) || null;
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }

}

export default Comment;
