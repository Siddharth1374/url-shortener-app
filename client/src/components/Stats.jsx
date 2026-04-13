const Stats = ({ clicks }) => {
    return (
      <div className="stats">
        <h3>Clicks: {clicks || 0}</h3>
      </div>
    );
  };
  
  export default Stats;