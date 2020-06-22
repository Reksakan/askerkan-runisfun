import React from 'react';
import './Footer.scss';


class Footer extends React.Component {
  render() {
    return(
      <div className="ground">
        <section className="ground__head">

          <div className="ground__contact">
              <h4>Contacts</h4>
              <p>234 Young Street, Ontario M3N 3E5</p>
              <p>info@runisfun.com</p>
          </div>
        <p className="copyrigth">Copyright Run Is Fun 2020 All Rights Reserved</p>
        </section>

      </div>
    )
  }
}

export default Footer;