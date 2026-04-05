import './PostItCard.css';

function PostItCard({ name, title, quote, avatarSrc }) {
  return (
    <div className="postit">
      <div className="postit__tape" />
      <div className="postit__header">
        <img className="postit__avatar" src={avatarSrc} alt={name} />
        <div>
          <p className="postit__name">{name}</p>
          <p className="postit__title">{title}</p>
        </div>
      </div>
      <p className="postit__quote">{quote}</p>
    </div>
  );
}

export default PostItCard;