import { gql } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      id
      nickname
      marks {
        id
        score
        content
      }
    }
  }
`;

export const USER_REGISTER = gql`
  mutation (
    $nickname: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    userRegister(
      nickname: $nickname
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
      confirmSuccessUrl: "http://localhost:3000"
    ) {
      user {
        id
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      credentials {
        uid
        accessToken
        client
        expiry
      }
      user {
        id
        email
      }
    }
  }
`;

export const LOGGED_USER = gql`
  query ($id: Int!) {
    publicUser(id: $id) {
      id
    }
  }
`;

export const USER_LOGOUT = gql`
  mutation {
    userLogout {
      authenticatable {
        id
      }
    }
  }
`;

export const USER_RESEND_EMAIL = gql`
  mutation ($email: String!) {
    userResendConfirmationWithToken(email: $email, confirmUrl: "http://localhost:3000") {
      message
    }
  }
`;

export const MOVIE_CATEGORIES = gql`
  query {
    allCategories {
      category
    }
  }
`;

export const USER_IMAGE = gql`
  query ($id: Int!) {
    userImage(id: $id) {
      id
      name
      path
      contentType
    }
  }
`;

export const USER_INFO_TOP_PAGE = gql`
  query ($id: Int!) {
    publicUser(id: $id) {
      id
      marks {
        movieId
      }
      clips {
        movieId
      }
    }
  }
`;

export const USER_INFO = gql`
  query ($id: Int!) {
    publicUser(id: $id) {
      id
      nickname
      marks {
        id
        content
        score
        movie {
          id
        }
        favorites {
          id
          user {
            id
          }
        }
        comments {
          id
        }
      }
      favorites {
        id
        mark {
          id
          content
          score
          movie {
            id
          }
          favorites {
            id
            user {
              id
            }
          }
          comments {
            id
          }
        }
      }
      comments {
        id
        mark {
          id
        }
      }
      clips {
        id
        movie {
          id
        }
      }
    }
  }
`;

export const MOVIE = gql`
  query ($id: ID!) {
    movie(id: $id) {
      id
      marks {
        id
        score
        content
        user {
          id
          nickname
          image
          path
        }
      }
    }
  }
`;

export const MOVIES = gql`
  query ($ids: [ID!]!) {
    movies(id: $ids) {
      id
      movieName
      summary
      runningTime
      releaseYear
      releaseDate
      country
      category
      releaseState
      marks {
        id
        score
        content
        favorites {
          id
        }
      }
      clips {
        id
      }
    }
  }
`;

export const MOVIE_PAGES = gql`
  query ($page: Int!, $limit: Int!) {
    searchMovies(page: $page, limit: $limit) {
      totalCount
      totalPage
      nowPage
      movies {
        id
        movieName
        summary
        runningTime
        releaseYear
        releaseDate
        country
        category
        releaseState
        marks {
          score
        }
        clips {
          id
        }
      }
    }
  }
`;

export const MARK = gql`
  query ($id: ID!) {
    mark(id: $id) {
      id
      score
      content
      movie {
        id
        movieName
        marks {
          id
        }
        clips {
          id
        }
      }
      user {
        id
        nickname
      }
      favorites {
        id
      }
      comments {
        id
        content
        user {
          id
          nickname
          path
        }
      }
    }
  }
`;
