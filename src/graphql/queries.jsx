import { gql } from "@apollo/client";

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
      confirmSuccessUrl: "https://moviewapp.com/verify"
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
      confirmedAt
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
    userResendConfirmationWithToken(email: $email, confirmUrl: "https://moviewapp.com/verify") {
      message
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
      nickname
      followingUser {
        id
        nickname
        path
      }
      followerUser {
        id
        nickname
        path
      }
      marks {
        id
        movieId
      }
      clips {
        id
        movieId
      }
      favorites {
        id
        mark {
          id
        }
      }
      activeNotifications {
        id
        action
        checked
        updatedAt
      }
      passiveNotifications {
        id
        action
        checked
        updatedAt
        markId
        visitor {
          id
          nickname
          path
        }
        visited {
          id
          nickname
          path
        }
        mark {
          id
          content
        }
        comment {
          id
          content
        }
      }
    }
  }
`;

export const USER_INFO = gql`
  query ($id: Int!) {
    publicUser(id: $id) {
      id
      nickname
      path
      selfIntro
      marks {
        id
        content
        score
        movieId
        userId
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
          movieId
          user {
            id
            nickname
            path
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
        movieId
      }
      followingUser {
        id
        nickname
        path
      }
      followerUser {
        id
        nickname
        path
      }
    }
  }
`;

export const MOVIE = gql`
  query ($id: ID!) {
    movie(id: $id) {
      id
      movieName
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
      clips {
        id
      }
    }
  }
`;

export const MOVIES = gql`
  query ($ids: [ID!]!) {
    movies(id: $ids) {
      id
      movieName
      posterPath
      summary
      runtime
      releaseYear
      releaseDate
      country
      category
      releaseState
      tmdbId
      homepage
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
  query ($page: Int!, $limit: Int!, $category: String!, $movieName: String!) {
    searchMovies(page: $page, limit: $limit, category: $category, movieName: $movieName) {
      totalCount
      totalPage
      nowPage
      movies {
        id
        movieName
        posterPath
        summary
        runtime
        releaseYear
        releaseDate
        country
        category
        releaseState
        tmdbId
        homepage
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

export const MOVIE_CATEGORY = gql`
  query ($movieId: ID!) {
    movieCategory(movieId: $movieId) {
      id
      action
      adventure
      animation
      comedy
      crime
      documentary
      drama
      family
      fantasy
      history
      horror
      music
      mystery
      romance
      scienceFiction
      tvMovie
      thriller
      war
      western
    }
  }
`;

export const MARK = gql`
  query ($id: ID!) {
    mark(id: $id) {
      id
      score
      content
      userId
      movie {
        id
        movieName
        posterPath
        summary
        runtime
        releaseYear
        releaseDate
        country
        category
        releaseState
        tmdbId
        homepage
        marks {
          id
          score
          userId
        }
        clips {
          id
          userId
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
export const MARK_VALID = gql`
  query ($id: ID!) {
    mark(id: $id) {
      id
      user {
        id
      }
    }
  }
`;

export const MARK_PAGES = gql`
  query ($page: Int!, $limit: Int!) {
    searchMarks(page: $page, limit: $limit) {
      totalCount
      totalPage
      nowPage
      marks {
        id
        movieId
        score
        userId
        content
        comments {
          id
          content
        }
        favorites {
          id
        }
        user {
          id
          nickname
          path
        }
      }
    }
  }
`;
