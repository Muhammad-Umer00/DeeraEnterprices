export default function SectionHeading({ eyebrow, title, lead, align = 'left', as: Tag = 'h2', id }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="section-heading__title" id={id}>
        {title}
      </Tag>
      {lead && <p className="section-heading__lead">{lead}</p>}
    </div>
  );
}
