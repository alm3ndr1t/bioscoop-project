// import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

const AccountCard = ({ userData }) => {
  return (
    <div className="mx-auto p-4 bg-headerBlue rounded-lg shadow-md text-left max-w-md">
      <div className="text-center">
        <FontAwesomeIcon icon={faUser} className="text-2xl mb-2" />
      </div>
      <div className="p-1">
        <p className="pb-2">
          <FontAwesomeIcon icon={faAddressCard} />
          <strong> | Username:</strong> {userData.username}
        </p>
        <p className="pb-2">
          <FontAwesomeIcon icon={faEnvelope} />
          <strong> | Email:</strong> {userData.email}
        </p>
        <p className="pb-2">
          <FontAwesomeIcon icon={faLock} />
          <strong> | Password:</strong> ********
        </p>
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountCard;
