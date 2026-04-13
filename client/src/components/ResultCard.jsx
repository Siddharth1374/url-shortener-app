const ResultCard = ({ result }) => {
    if (!result) return null;
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(result.shortUrl);
      alert("Copied!");
    };
  
    return (
      <div className="card">
        <p><strong>Original:</strong> {result.originalUrl}</p>
        <p>
          <strong>Short:</strong>
          <a href={result.shortUrl} target="_blank">
            {result.shortUrl}
          </a>
        </p>
  
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    );
  };
  
  export default ResultCard;