import React from 'react';
import Topbar from '../common/navbar/navbar';

function about() {
  return (
    <>
      <Topbar />
    <div className="about container">
      <div className="container" xs={12} md={6}>
        <h3 className="aboutHeadings">About Us</h3>
        <h1 className="aboutMainline">
          KIT is an educational organization with focus on IT education for
          Pakistani youth with emphasize on project base learning enabling
          youngsters for high quality work worldwide.
        </h1>
        <div className="aboutmainbox">
          <div className="boxabout">
            <h5 className="mainpagebtn"> Vision </h5>
            <p>
              To enable theoretically educated degree holder youth for gainful
              productive work by providing missing link of practical application
              of their education.
            </p>
          </div>
          <div className="boxabout">
            <h5 className="mainpagebtn"> Mission</h5>
            <p>
              Through practical training and mentorship provision of maturity,
              progress, and intellectual advancement for young people.
            </p>
          </div>
          <div className="boxabout">
            <h5 className="mainpagebtn"> Values </h5>
            <p>
              Independent thinking, self-training, self-progress, liberation
              from others and systems for one’s professional growth.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default about;
