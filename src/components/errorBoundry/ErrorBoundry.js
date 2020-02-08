import React from 'react';

// eslint-disable-next-line react/prop-types
const MyFallbackComponent = ({ componentStack, error }) => (
  <div>
    <p>
      <strong>Error, Bitch:</strong> {error.toString()}
    </p>
    <p>
      <strong>Stacktrace:</strong> {componentStack}
    </p>
  </div>
);

export default MyFallbackComponent;
