import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	const [requestLeft, setRequestLeft] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: '' });

	// searching github user profile/details
	const searchGithubUser = async user => {
		toggleError();
		setLoading(true);
		const response = await axios(`${rootUrl}/users/${user}`);
		console.log(response);
		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;
			// fetching repos
			axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response =>
				setRepos(response.data)
			);
			// fetching followers
			axios(`${followers_url}?per_page=100`).then(response =>
				setFollowers(response.data)
			);
		} else {
			toggleError(true, 'Sorry, There is no user with that username!');
		}
		checkRequest();
		setLoading(false);
	};

	//checking how many requests left
	const checkRequest = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;
				setRequestLeft(remaining);
				if (remaining === 0) {
					toggleError(
						true,
						'Sorry, You have exceeded your hourly request limit!'
					);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	function toggleError(show = false, msg = '') {
		setError({ show, msg });
	}

	useEffect(checkRequest, []);

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requestLeft,
				error,
				loading,
				searchGithubUser,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubProvider, GithubContext };
