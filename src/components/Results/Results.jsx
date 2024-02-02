function Results({ domains }) {
  if (!domains.length) {
    return (
      <p>
        <b>POSSIBLE DOMAINS</b> no results found...
      </p>
    );
  }
  return (
    <div>
      <p>
        <b>POSSIBLE DOMAINS</b>
      </p>
      <ul>
        {domains.map((domain, index) => (
          <li key={index}>
            {domain.extension}{" "}
            <span style={{ opacity: 0.5 }}>
              {domain.type !== "generic" && `(${domain.type})`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
