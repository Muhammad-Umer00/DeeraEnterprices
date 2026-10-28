import { useId, useRef } from 'react';
import Icon from '../Icon.jsx';
import { FILE_RULES, formatBytes, validateFiles } from '../../lib/formRules.js';

/** Multi-file picker with client-side type/size/count checks. */
export default function FileInput({ files, onChange, error, onError, maxFiles = FILE_RULES.maxFiles, label }) {
  const id = useId();
  const inputRef = useRef(null);

  const addFiles = (list) => {
    const next = [...files, ...Array.from(list)];
    const problem = validateFiles(next, maxFiles);
    if (problem) {
      onError(problem);
    } else {
      onError('');
      onChange(next);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (idx) => {
    onError('');
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label || 'Attachments'}
        <span className="field__opt"> (optional)</span>
      </label>
      <p className="field__hint" id={`${id}-hint`}>
        Photographs, requisitions or specifications. JPG, PNG, WebP or PDF. Up to {maxFiles} files,{' '}
        {formatBytes(FILE_RULES.maxFileBytes)} each, {formatBytes(FILE_RULES.maxTotalBytes)} in total.
      </p>
      <div className="file-drop">
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple={maxFiles > 1}
          accept={FILE_RULES.accept}
          onChange={(e) => addFiles(e.target.files)}
          aria-describedby={`${id}-hint${error ? ` ${id}-err` : ''}`}
          aria-invalid={error ? true : undefined}
          className="file-drop__input"
          disabled={files.length >= maxFiles}
        />
        <span className="file-drop__label" aria-hidden="true">
          <Icon name="file" size={18} /> {files.length >= maxFiles ? 'Maximum files attached' : 'Choose files'}
        </span>
      </div>
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <span className="file-list__name">{f.name}</span>
              <span className="file-list__size">{formatBytes(f.size)}</span>
              <button type="button" className="link-btn" onClick={() => remove(i)}>
                Remove<span className="visually-hidden"> {f.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p id={`${id}-err`} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
