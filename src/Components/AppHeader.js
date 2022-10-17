import React from 'react';
import { FaSistrix } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import Image from './Image';
import {Link} from "react-router-dom";

function AppHeader({MemoTabs}) {
  return (
    <>
     <div className="app-header">
        <div className="app-header-left">
          <Image
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F08%2Fmost-used-netflix-icon-boss-baby-info-tw.jpg?w=960&cbr=1&q=90&fit=max"
            className="app-main-logo"
          />
          {/* <Tabs /> */}
          {MemoTabs}
        </div>

        <div className="app-header-right">
          
            <Link to="/search"><FaSistrix size={25} className="app-header-icon" /></Link>
          
          <MdOutlineNotificationsNone size={30} className="app-header-icon" />
          <Image
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            className="app-display-pic"
          />
        </div>
      </div>

    </>
  )
}

export default AppHeader