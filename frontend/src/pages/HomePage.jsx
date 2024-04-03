import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homePage.css';
import newBoyImage from '../img/newBoy.png'; 
import girlImage from '../img/img_Marni3.png'; 

export default function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = (event) => {
    event.preventDefault(); 
    navigate('/login'); // path defined for the LoginPage in routerr
  };

  return (
    <div className="container">
        <div className="boy-img">
            {/* cite: Paperpillar, “Nikuu 3d Illustration Pack by Paperpillar (community),” Figma, Nikuu 3d Illustration Pack by Paperpillar | Figma Community [accessed Feb. 23, 2024].*/}
            <img src={newBoyImage} alt="boy" />
        </div>  

        <div className="girl-img">
            {/* cite: Paperpillar, “Nikuu 3d Illustration Pack by Paperpillar (community),” Figma, Nikuu 3d Illustration Pack by Paperpillar | Figma Community [accessed Feb. 23, 2024].*/}
            <img src={girlImage} alt="girl" />
        </div>   

        <div className="signup-container">
            <h1>Welcome</h1>
            <form id="signup-form">
                <div className="half-width-input">
                    <input type="text" id="fname" placeholder="FNAME" required />
                    <input type="text" id="lname" placeholder="LNAME" required />
                </div>
                <input type="email" id="email" placeholder="EMAIL" required />
                <input type="password" id="password" placeholder="PASS" required />
                <input type="password" id="confirm_password" placeholder="CONFIRM PASS" required />
                <button type="submit">SignUp</button>
            </form>
              
            <div className="login-link">
                Already have an account? <a href="#" onClick={handleLoginClick}>Login</a>
            </div>
        </div>
    </div>
  );
}
