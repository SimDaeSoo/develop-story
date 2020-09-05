import Network from '../utils/network';

const CreateCommentQuery = `
mutation($input: createCommentInput) {
  createComment(input:$input){
    comment {
      id
    }
  }
}`;

const UpdateCommentQuery = `
mutation($input: updateCommentInput) {
  updateComment(input:$input){
    comment {
      id
    }
  }
}`;

const DeleteCommentQuery = `
mutation($input: deleteCommentInput) {
  deleteComment(input:$input){
    comment {
      id
    }
  }
}`;

export async function createComment(comment) {
  const { data } = await Network.graphql(CreateCommentQuery, { input: { data: comment } });
  const { createComment } = data;
  return createComment.comment;
}

export async function updateComment(id, _comment) {
  const response = await Network.put(`/comments/${id}`, { content: _comment.content });
  return response;
}

export async function deleteComment(id) {
  const response = await Network.delete(`/comments/${id}`);
  return response;
}