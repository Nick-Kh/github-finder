import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = props => {
  return (
    <div>
      <Fragment>
        <img
          src={spinner}
          alt='Loading...'
          style={{ width: '200px', margin: 'auto', display: 'block' }}
        />
      </Fragment>
    </div>
  );
};

export default Spinner;
