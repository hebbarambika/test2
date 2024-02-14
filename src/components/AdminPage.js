// AdminPage.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/AdminPage.css";
import Button from "./Button";

const AdminPage = ({isUserLoggedIn,setIsUserLoggedIn,isAdminLoggedIn,setIsAdminLoggedIn}) => {
	return (
		<div>
			<div>
			<Button isUserLoggedIn={isUserLoggedIn}
							setIsUserLoggedIn={setIsUserLoggedIn}
							isAdminLoggedIn={isAdminLoggedIn}
							setIsAdminLoggedIn={setIsAdminLoggedIn} />
			</div>
			<div className='admin-container'>
				{/* <div className="box">
        <h2>Participant Page</h2>
        <div className="arrow-container">
          <Link to="/participant" className="link-button">
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </Link>
        </div>
      </div> */}
				<div className='box'>
					<h2>Add Event</h2>
					<div className='arrow-container'>
						<Link to='/addevent' className='link-button'>
							<FontAwesomeIcon icon={faPlus} className='arrow' />
						</Link>
					</div>
				</div>
				<div className='box'>
					<h2>View Members</h2>
					<div className='arrow-container'>
						<Link to='/viewmembers' className='link-button'>
							<FontAwesomeIcon icon={faChevronDown} className='arrow' />
						</Link>
					</div>
				</div>
				<div className='box'>
					<h2>Event List</h2>
					<div className='arrow-container'>
						<Link to='/getevent' className='link-button'>
							<FontAwesomeIcon icon={faChevronDown} className='arrow' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
