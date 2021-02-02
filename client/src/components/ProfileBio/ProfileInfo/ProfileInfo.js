import React from 'react';

import './ProfileInfo.css';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images = require.context('../../assets');

function ProfileInfo(props) {

    let profilePhoto = props.bio.profilePhoto, description = props.bio.description
    // let stars = props.bio.stars
    let stars = "45"
    let followersCount = "96"
    let followingCount = "74"

    if(profilePhoto == null) {
        profilePhoto = "./temp.jpg"
    }
    if(description == null) {
        description = "Doing what I love. CS undergrad @ BITS Pilani, India | Networks and Systems"
    }

    return (
        <div className='profileInfo'>
            <div className='profileDetails'>
                <div><img className='profilePhoto' src={images(profilePhoto)} alt='No Photo'></img></div>
                <div className='profileText'>
                    <div className='profileName'> {props.bio.name}</div>
                    <div className='profileDesc'>{description}</div>
                    <div className='profileID'>
                        <span className="stars"> <FontAwesomeIcon icon={faStar} />{stars}  </span> 
                        <span> <FontAwesomeIcon icon={faGithub} /> </span> {props.bio.username} 
                    </div>
                </div>
                
            </div>
            <div className='profileFollow'>
                <button className='followButton'>FOLLOW</button>
                <div className='followCount'>
                    <div className='followingCount'>{followingCount} Following</div> &nbsp; | &nbsp;
                    <div className='followersCount'>  {followersCount} Followers</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
