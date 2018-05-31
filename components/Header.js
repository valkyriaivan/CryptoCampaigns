import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link route="/">
            <a className="brand-logo center">
              <img src="/static/image/logo-nav.png" className="logo-img" />
            </a>
          </Link>

          <Link route="/campaigns/new">
            <a className="btn-floating btn-large halfway-fab buttonsRed">
              <i className="material-icons left">fiber_new</i>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};
