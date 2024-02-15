import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate, Link } from "react-router-dom";
import "../css/ViewMembers.css";
import "../css/AdminPage.css";

const ViewMembers = () => {
	const { adminInfo } = useAdminContext();
	const [members, setMembers] = useState([]);

	useEffect(() => {
		if (adminInfo) {
			fetchMembers();
		}
	}, [adminInfo]);

	const fetchMembers = async () => {
		try {
			const response = await axios.get("http://localhost:3000/viewmembers", {
				params: {
					club: adminInfo.club, // Fetch members of the admin's club
				},
			});
			setMembers(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='view-members-container'>
			<h2>View Members</h2>
			<div className="auth-buttons2">
				<div className="button-container">
				<Link to='/admin'>
						<button className='back-button1' type='button'>
							Back to Admin
						</button>
					</Link>
					<Link to='/'>
						<button className='back-button' type='button'>
							Home
						</button>
					</Link>
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>User ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Contact Number</th>
						<th>Semester</th>
						{/* Add more fields as needed */}
					</tr>
				</thead>
				<tbody>
					{members.map((member) => (
						<tr key={member._id}>
							<td>{member.username}</td>
							<td>{member.name}</td>
							<td>{member.email}</td>
							<td>{member.contactNumber}</td>
							<td>{member.sem}</td>
							{/* Add more fields as needed */}
						</tr>
					))}
				</tbody>
			</table>
			{/* <Link to='/admin'>
				<button className='back-button' type='button'>
					Back to Admin
				</button>
			</Link>
			<Link to='/'>
				<button className='back-button' type='button'>
					Home
				</button>
			</Link> */}
		</div>
	);
};

export default ViewMembers;
