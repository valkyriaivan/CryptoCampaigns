import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link route="/">
            <a class="brand-logo center">CryptoStarter</a>
          </Link>

          <Link route="/campaigns/new">
            <a class="btn-floating btn-large halfway-fab buttonsRed">
              <i className="material-icons left">fiber_new</i>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};
