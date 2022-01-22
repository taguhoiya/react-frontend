import { gql } from "@apollo/client";

export const UPDATE_USER_IMAGE = gql`
  mutation ($id: ID!, $image: Upload, $nickname: String!) {
    updateUserImage(input: { id: $id, image: $image, nickname: $nickname }) {
      user {
        id
        nickname
        image
      }
    }
  }
`;

export const CREATE_CLIP = gql`
  mutation ($movieId: ID!, $userId: ID!) {
    createClip(input: { movieId: $movieId, userId: $userId }) {
      clip {
        id
      }
      user {
        id
      }
      movie {
        id
      }
    }
  }
`;

export const CREATE_MARK = gql`
  mutation ($movieId: ID!, $userId: ID!, $score: Float!, $content: String!) {
    createMark(input: { movieId: $movieId, userId: $userId, score: $score, content: $content }) {
      mark {
        id
      }
      user {
        id
      }
      movie {
        id
      }
    }
  }
`;

export const CREATE_FAVO = gql`
  mutation ($markId: ID!, $userId: ID!) {
    createFavo(input: { markId: $markId, userId: $userId }) {
      favorite {
        id
      }
      user {
        id
      }
      mark {
        id
      }
    }
  }
`;

export const DELETE_CLIP = gql`
  mutation ($movieId: ID!, $userId: ID!) {
    deleteClip(input: { movieId: $movieId, userId: $userId })
  }
`;

export const DELETE_FAVO = gql`
  mutation ($markId: ID!, $userId: ID!) {
    deleteFavo(input: { markId: $markId, userId: $userId })
  }
`;

export const CREATE_COMMENT = gql`
  mutation ($markId: ID!, $userId: ID!, $content: String!) {
    createComment(input: { markId: $markId, userId: $userId, content: $content }) {
      comment {
        id
        content
      }
      user {
        id
      }
      mark {
        id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($id: ID!) {
    deleteComment(input: { id: $id })
  }
`;

export const DELETE_MARK = gql`
  mutation ($id: ID!) {
    deleteMark(input: { id: $id })
  }
`;
