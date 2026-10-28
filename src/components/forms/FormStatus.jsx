import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon.jsx';

/** Explains the real state of the submission service before the user starts. */
export function BackendNotice({ backend, onRetry }) {
  if (backend === 'ready' || backend === 'checking') return null;
  const text =
    backend === 'not-configured'
      ? 'Online submission is not active yet: email delivery for this form has not been configured. You can complete the form, but it will not be sent or stored until the company activates it.'
      : 'The online submission service is not currently reachable, so this form cannot be sent right now.';
  return (
    <div className="notice notice--warning" role="status">
      <Icon name="info" size={20} />
      <div>
        <p>
          <strong>Integration pending.</strong> {text}
        </p>
        <p>
          In the meantime, please use the official contact details on the <Link to="/contact">Contact page</Link>.{' '}
          <button type="button" className="link-btn" onClick={onRetry}>
            Check again
          </button>
        </p>
      </div>
    </div>
  );
}

/** Result message after submission; receives focus so it is announced. */
export function ResultMessage({ state }) {
  const ref = useRef(null);
  useEffect(() => {
    if ((state.status === 'success' || state.status === 'error') && ref.current) ref.current.focus();
  }, [state.status]);

  if (state.status === 'error') {
    return (
      <div className="notice notice--error" role="alert" tabIndex={-1} ref={ref}>
        <Icon name="info" size={20} />
        <p>{state.message}</p>
      </div>
    );
  }
  return null;
}

export function SuccessPanel({ title, children, onReset, resetLabel = 'Send another enquiry' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);
  return (
    <div className="success-panel" role="status" tabIndex={-1} ref={ref}>
      <span className="success-panel__icon">
        <Icon name="check" size={26} />
      </span>
      <h2 className="success-panel__title">{title}</h2>
      {children}
      <button type="button" className="btn btn--outline" onClick={onReset}>
        {resetLabel}
      </button>
    </div>
  );
}
