import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../Repos/Repos';
import githubContext from '../../context/github/githubContext';
import { useContext } from 'react';

const User = ({ match }) => {
  const GithubContext = useContext(githubContext);
  const { getUser, loading, user, repos, getUserRepos } = GithubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to search
      </Link>
      Hireable: {''}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round_img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
              <a href={html_url} className='btn btn-dark my-1'>
                Github Profile
              </a>
              <ul>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: </strong> {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: </strong> {company}
                    </Fragment>
                  )}
                </li>
                <li>
                  {blog && (
                    <Fragment>
                      <strong>Website: </strong> {blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </Fragment>
          )}
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
