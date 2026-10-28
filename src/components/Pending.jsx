import { site } from '../data/site.js';

/**
 * Clearly marked placeholder for information the company has not supplied.
 * Hidden entirely when site.showPendingNotices is false.
 */
export default function Pending({ label, block = false }) {
  if (!site.showPendingNotices) return null;
  const Tag = block ? 'p' : 'span';
  return (
    <Tag className={`pending ${block ? 'pending--block' : ''}`}>
      <span className="pending__tag">To be supplied</span> {label}
    </Tag>
  );
}
