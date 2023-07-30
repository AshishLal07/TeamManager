import {Link} from 'react-router-dom';
import {userGloabalContext} from '../UserContext';
import {useEffect, useState} from 'react';

const Teams = () => {
	const {team} = userGloabalContext();
	const teamDomain = Object.keys(team);
	const [valid, setValid] = useState(false);

	const readySubmit = () => {
		return teamDomain.some((elem) => {
			return team[elem] === '';
		});
	};

	useEffect(() => {
		const test = readySubmit();
		setValid(!test);
	}, [team]);

	return (
		<>
			<div className="w-full  md:w-4/5  m-auto md:mt-5">
				<div className="flex p-5 justify-between items-center">
					<h3 className="text-2xl">Create Team</h3>
					{valid ? null : (
						<Link
							to={'/'}
							className="bg-red-600 p-2 border  border-gray-500 text-white rounded-xl "
						>
							Add Users
						</Link>
					)}
				</div>
				<hr className="border-black" />
				<div className="">
					<div className="p-4 grid grid-cols-4 font-bold text-left border-b">
						<p>Domain</p>
						<p>Name</p>
						<p>Email</p>
						<p className="text-right">Gender</p>
					</div>
					<div>
						{teamDomain.map((elem, i) => (
							<div key={i} className="even:bg-gray-200">
								{team[elem] !== '' ? (
									<div className="p-4 grid grid-flow-col md:grid-cols-4 md:gap-4 text-left text-sm md:text-xl">
										<p>{team[elem].domain}</p>
										<p>
											{team[elem].first_name} {team[elem].last_name}
										</p>
										<p>{team[elem].email}</p>
										<p className="text-right">{team[elem].gender}</p>
									</div>
								) : (
									<p className="p-4 w-full md:w-1/2 grid gap-4 text-sm md:text-xl grid-cols-2">
										<span>{elem} </span> <span>No, User added</span>
									</p>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="m-6 flex justify-center">
					{valid ? (
						<button className="bg-green-600 p-2 border border-gray-500 rounded-xl w-1/2 text-white ">
							Submit
						</button>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Teams;
