/* eslint-disable react/prop-types */
import {userGloabalContext} from '../UserContext';
import Pagination from './Pagination';

const UserList = ({filterList}) => {
	const {createTeam, isLoading} = userGloabalContext();

	if (isLoading) {
		return <p className="p-5 text-center text-xl">Loading, Please wait...</p>;
	}

	return (
		<div className="flex flex-col">
			<div className="flex-1">
				{filterList.length > 0 ? (
					filterList.map((user, index) => (
						<div
							key={index}
							className="p-2  m-auto grid grid-cols-1 md:grid-cols-[1fr_repeat(2,2fr)_1fr_2fr_repeat(2,1fr)] items-center justify-items-center gap-2 odd:bg-gray-100   "
						>
							<div>
								<img
									src={user.avatar}
									className="bg-gray-300 rounded-full m-auto"
									alt="img"
									height={'50px'}
									width={'50px'}
								/>
							</div>
							<div>
								{user.first_name} {user.last_name}
							</div>
							<div>{user.email}</div>
							<div className="text-center">{user.gender}</div>
							<div>{user.domain}</div>
							<div>{user.available ? 'Yes' : 'No'}</div>
							<div
								onClick={() => createTeam(user)}
								className="p-2 bg-red-300  flex justify-center rounded-xl border-2 items-center cursor-pointer hover:bg-gray-100 hover:border-red-300"
							>
								{'Add'}
							</div>
						</div>
					))
				) : (
					<p className="p-5 text-center text-xl ">
						Please Reset Page, No Data Found
					</p>
				)}
			</div>
			<div className="border-t-2 flex-none">
				<Pagination></Pagination>
			</div>
		</div>
	);
};

export default UserList;

// [repeat(2,minmax(0,1fr))_400px]
