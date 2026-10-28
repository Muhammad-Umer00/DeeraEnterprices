import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../lib/config.js';

/**
 * Checks whether the submission API is reachable and whether email delivery
 * has been configured, then submits forms and reports the outcome honestly.
 *
 * Backend status:
 *   'checking'       — status request in progress
 *   'ready'          — server reachable and email delivery configured
 *   'not-configured' — server reachable but delivery NOT configured
 *   'unreachable'    — submission server not running / not deployed
 */
export function useSubmission(endpoint) {
  const [backend, setBackend] = useState('checking');
  const [state, setState] = useState({ status: 'idle', message: '', fieldErrors: {} });

  const checkBackend = useCallback(async () => {
    setBackend('checking');
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('bad status');
      const data = await res.json();
      setBackend(data.deliveryConfigured ? 'ready' : 'not-configured');
    } catch {
      setBackend('unreachable');
    }
  }, []);

  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  const submit = useCallback(
    async (formData) => {
      setState({ status: 'submitting', message: '', fieldErrors: {} });
      let res;
      try {
        res = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });
      } catch {
        setBackend('unreachable');
        setState({
          status: 'error',
          message:
            'Your enquiry could not be sent because the submission service is unavailable. Nothing was delivered. Please try again later or contact us directly.',
          fieldErrors: {},
        });
        return false;
      }

      let data = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }

      if (res.ok && data.ok) {
        setState({ status: 'success', message: data.message || '', fieldErrors: {} });
        return true;
      }

      if (data.code === 'DELIVERY_NOT_CONFIGURED') setBackend('not-configured');

      const messages = {
        DELIVERY_NOT_CONFIGURED:
          'Online submission has not been activated yet, so your enquiry was not sent or stored. Please contact DEERA ENTERPRISES directly using the details on the Contact page.',
        VALIDATION_FAILED: 'Please correct the highlighted fields and try again.',
        RATE_LIMITED: 'Too many submissions have been made from your connection. Please wait a few minutes and try again.',
        SPAM_CHECK_FAILED: 'Your submission could not be verified. Please wait a moment, complete the verification and try again.',
        FILE_REJECTED: data.message || 'One of the attachments was rejected. Please check the file type and size.',
        DELIVERY_FAILED:
          'Your enquiry could not be delivered due to a temporary problem. Nothing was sent. Please try again later or contact us directly.',
      };

      setState({
        status: 'error',
        message: messages[data.code] || 'Your enquiry could not be sent. Nothing was delivered. Please try again later.',
        fieldErrors: data.fieldErrors || {},
      });
      return false;
    },
    [endpoint],
  );

  const reset = useCallback(() => setState({ status: 'idle', message: '', fieldErrors: {} }), []);

  return { backend, checkBackend, state, submit, reset };
}
