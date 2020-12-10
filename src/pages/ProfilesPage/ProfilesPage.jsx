import "./ProfilesPage.css";
import { NavLink } from "react-router-dom";

const profiles = [1, 2, 3, 4, 5];

export const ProfilesPage = () => (
  <div className="profiles">
    <h1>PROFILES PAGE</h1>
    {profiles.map((profile) => (
      <NavLink key={profile} to={`/profiles/${profile}`}>
        {profile}
      </NavLink>
    ))}
  </div>
);
