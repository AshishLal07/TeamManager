import {Routes, Route} from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Teams from './pages/Teams';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/createTeam" element={<Teams />}></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
