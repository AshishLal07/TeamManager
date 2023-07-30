import {useContext, createContext, useState, useEffect} from 'react';

const userContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [nbPages, setNbPages] = useState(0);
	const [page, setPage] = useState(1);
	const [team, setTeam] = useState({
		Finance: '',
		Marketing: '',
		Management: '',
		'Business Development': '',
		'UI Designing': '',
		IT: '',
	});

	const Gender = [
		{value: 'Male', label: 'Male'},
		{value: 'Female', label: 'Female'},
		{value: 'Agender', label: 'Agender'},
		{value: 'Non-binary', label: 'Non-binary'},
		{value: 'Polygender', label: 'Polygender'},
		{value: 'Bigender', label: 'Bigender'},
		{value: 'Genderqueer', label: 'Genderqueer'},
		{value: 'Genderfluid', label: 'Genderfluid'},
	];

	const Domain = [
		{value: 'Finance', label: 'Finance'},
		{value: 'Management', label: 'Management'},
		{value: 'IT', label: 'IT'},
		{value: 'Sales', label: 'Sales'},
		{value: 'Business Development', label: 'Business Development'},
		{value: 'Marketing', label: 'Marketing'},
		{value: 'UI Designing', label: 'UI Designing'},
	];

	const createTeam = (member) => {
		if (member.available) {
			setTeam({...team, [member.domain]: member});
			alert('User Added Successfully');
		} else {
			alert('User not available');
		}
	};

	const getUsers = async () => {
		const resp = await fetch(`http://localhost:8001/allUser/${page}`);
		const data = await resp.json();
		if (data) {
			setUsers(data.limitData);
			setNbPages(data.nbPages);
			setIsLoading(false);
		}
	};
	const getNextPage = () => {
		if (page + 1 > nbPages) {
			setPage(1);
		}
		setPage((old) => old + 1);
	};
	const getPrevPage = () => {
		if (page - 1 != 0) {
			setPage((old) => old - 1);
		}
	};

	const [filter, setFilter] = useState({
		check: false,
		domain: {value: 'Domain', label: 'Domain'},
		gender: {value: 'Gender', label: 'Gender'},
		name: '',
	});
	const [filterUser, SetFilterUser] = useState([]);

	useEffect(() => {
		SetFilterUser([...users]);
	}, [users]);

	const setValue = (e) => {
		const prop = e.target?.name || e.label;
		if (prop === 'check') {
			console.log(e.target.checked, filter.check);
			const value = filterUser.filter((user) => {
				if (e.target.checked) {
					return user['available'];
				} else {
					return !user['available'];
				}
			});

			setFilter((prev_state) => ({...prev_state, check: e.target.checked}));
			console.log(value.length);
			if (value.length > 0) {
				SetFilterUser([...value]);
			} else {
				SetFilterUser([...users]);
			}
		} else if (prop === 'reset' || e.target?.value === '') {
			setFilter({
				check: false,
				domain: {value: 'Domain', label: 'Domain'},
				gender: {value: 'Gender', label: 'Gender'},
				name: '',
			});
			SetFilterUser([...users]);
		} else if (prop === 'name') {
			setFilter({...filter, name: e.target.value});
			const value = filterUser.filter((user) => {
				const regex = new RegExp(e.target.value, 'gi');
				return user.first_name.match(regex) || user.last_name.match(regex);
			});
			SetFilterUser([...value]);
		} else {
			setFilter((old) => ({
				...old,
				[e.name]: {label: e.label, value: e.value},
			}));

			const value = filterUser.filter((user) => user[e.name] === e.value);
			SetFilterUser([...value]);
		}
	};

	useEffect(() => {
		getUsers();
		setIsLoading(true);
	}, [page]);

	return (
		<userContext.Provider
			value={{
				users,
				page,
				nbPages,
				team,
				isLoading,
				filter,
				filterUser,
				getPrevPage,
				getNextPage,
				createTeam,
				setIsLoading,
				Gender,
				Domain,
				setValue,
			}}
		>
			{children}
		</userContext.Provider>
	);
};
// eslint-disable-next-line react-hooks/rules-of-hooks
export const userGloabalContext = () => useContext(userContext);
