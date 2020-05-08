import React, { FC } from 'react';
import styled from 'styled-components';

const ErrorMessages = styled.ul`
  color: #b85c5c;
  font-weight: 700;
`;

export const BackendErrorMessages: FC<IBackendErrors | null> = ({
  backendErrors,
}) => {
  const errorMessages = Object.keys(backendErrors).map((name) => {
    const messages = backendErrors[name].join('; ');
    return `${name} ${messages}`;
  });
  return (
    <ErrorMessages>
      {errorMessages.map((errorMessage, index) => (
        <li key={index}>{errorMessage}</li>
      ))}
    </ErrorMessages>
  );
};

interface IBackendErrors {
  backendErrors: {
    [key: string]: string[];
  };
}
