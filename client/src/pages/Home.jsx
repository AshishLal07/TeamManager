import {Link} from 'react-router-dom';
import UserList from '../components/UserList';
import {userGloabalContext} from '../UserContext';
import Select from 'react-select';

const Home = () => {
	const {Gender, Domain, filter, setValue, filterUser} = userGloabalContext();

	return (
		<>
			<div className="m-5 flex flex-wrap  items-center gap-5 ">
				<Select
					name="domain"
					options={Domain}
					value={filter.domain}
					onChange={(value, action) => {
						const target = {
							value: value.value,
							label: value.label,
							name: action.name,
						};
						setValue(target);
					}}
				></Select>

				<Select
					name="gender"
					options={Gender}
					value={filter.gender}
					onChange={(value, action) => {
						const target = {
							value: value.value,
							label: value.label,
							name: action.name,
						};
						setValue(target);
					}}
				></Select>

				<div className="border border-gray-300 rounded-md h-10 p-2 ">
					<input
						className="hidden"
						type="checkbox"
						name="check"
						onChange={setValue}
						id="available"
					/>
					<label className="flex items-center gap-2" htmlFor="available">
						<p className="pr-2 border-r border-gray-300 ">Available</p>
						<span className="w-5 h-5  bg-gray-100 flex justify-center items-center  border ">
							{filter.check ? (
								<i className="fa-solid fa-check text-gray-600  "></i>
							) : (
								''
							)}
						</span>
					</label>
				</div>

				<div className="border-b-2 ">
					<i className="fa-solid fa-magnifying-glass ml-2 text-gray-500 text-xl "></i>
					<input
						name="name"
						className="p-4 outline-none"
						type="text"
						placeholder="Search Users..."
						value={filter.name}
						onChange={setValue}
					/>
				</div>

				<div className="border-2 p-2  rounded-xl hover:bg-gray-300">
					<button name="reset" onClick={setValue}>
						Reset
					</button>
				</div>
				<Link
					className="bg-orange-400 p-2 text-white rounded-lg border border-gray-200 ml-52"
					to="/createTeam"
				>
					Check Team List
				</Link>
			</div>
			<hr />
			<div className="p-2 font-bold hidden md:grid md:grid-cols-[1fr_repeat(2,2fr)_1fr_2fr_repeat(2,1fr)] items-center justify-items-center  gap-2 ">
				<p>Image</p>
				<p>Name</p>
				<p>Email</p>
				<p>Gender</p>
				<p>Domain</p>
				<p>Available</p>
				<p>Add to List</p>
			</div>

			<div>
				<UserList filterList={filterUser}></UserList>
			</div>
		</>
	);
};

export default Home;
