import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ children, title }) => (
  <div className="modal">
    <div className="modal__content">
      <div className="modal__header">
        <h2 className="modal__title">{title}</h2>
      </div>
      <div className="modal__body">{children}</div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
