import React from 'react';

import { Link } from 'react-router-dom';





function AllRooms() {
    return (
        <div className='all'>
            <h2>All rooms</h2>
            <div className='all-grid'>
                <div className='all-card-left'>
                    <img src='https://cache.marriott.com/content/dam/marriott-renditions/DACSI/dacsi-kingclub-guestroom-3227-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*' />
                    <h3 >Podium King</h3>
                    <p >Guest room, 1 King</p>
                    <Link to="/view-more">View More</Link>
                    {/*<button onclick="ViewMore()"> ViewMore </button>  */}
                </div>
                <div className='all-card-right'>
                    <img src='https://cache.marriott.com/content/dam/marriott-renditions/DACSI/dacsi-twinpodium-guestroom-3231-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*' />
                    <h3 >Podium twin</h3>
                    <p >Guest room, 2 twin</p>
                    <Link to="/view-more">View More</Link>
                </div>


            </div>
            <div className='all-gridd'>
                <div className='all-card-left'>
                    <img src='https://cache.marriott.com/content/dam/marriott-renditions/DACSI/dacsi-kingclub-guestroom-3227-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*' />
                    <h3 >Tower King</h3>
                    <p >Guest room, 1 King</p>
                    <Link to="/view-more">View More</Link>
                </div>
                <div className='all-card-right'>
                    <img src='https://cache.marriott.com/content/dam/marriott-renditions/DACSI/dacsi-king-premier-guestroom-3248-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*' />
                    <h3 >Tower Prem King</h3>
                    <p >Guest room, 1 king</p>
                    <Link to="/view-more">View More</Link>
                </div>


            </div>
            <div className='fw'>
                <Link to="/meetings">Meetings</Link>
            </div>
            <div className='fw'>
                <Link to="/meetings2">Meetings2</Link>
            </div>
            
            
        </div>
    );
} export default AllRooms;