import {userGloabalContext} from '../UserContext';
const Pagination = () => {
	const {nbPages, page, getPrevPage, getNextPage} = userGloabalContext();

	return (
		<div className="flex gap-3 justify-center items-center m-2">
			<button
				className={`border p-2 rounded-md text-xl ${
					page <= 1
						? 'bg-gray-500 text-white'
						: 'text-gray-300 hover:bg-gray-400'
				}`}
				onClick={() => getPrevPage()}
			>
				{'<'}
			</button>
			<p>
				{page} of {nbPages}
			</p>
			<button
				className={`border-2 p-2 rounded-md text-xl ${
					page >= nbPages
						? 'bg-gray-500 text-white'
						: 'text-gray-300 hover:bg-gray-400'
				}`}
				onClick={() => getNextPage()}
			>
				{'>'}
			</button>
		</div>
	);
};

export default Pagination;
