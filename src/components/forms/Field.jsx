import { useId } from 'react';

/**
 * Labelled form control with hint and error text wired up for assistive
 * technology (aria-describedby / aria-invalid).
 */
export default function Field({
  label,
  name,
  as = 'input',
  required = false,
  error,
  hint,
  className = '',
  children,
  ...props
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined;
  const Control = as;

  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? (
          <span className="field__req" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="field__opt"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      <Control
        id={id}
        name={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="field__control"
        {...props}
      >
        {children}
      </Control>
      {error && (
        <p id={errId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
