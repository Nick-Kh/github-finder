import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

let githubToken;

if (process.env.NODE_ENV !== 'production') {
  githubToken = process.env.REACT_APP_GITHUB_CLIENT_TOKEN;
} else {
  githubToken = process.env.GITHUB_CLIENT_TOKEN;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: githubToken },
  });

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const res = await github.get(`/search/users?q=${text}`);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (username) => {
    setLoading();
    const res = await github.get(`/users/${username}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //Get Repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await github.get(
      `/users/${username}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
