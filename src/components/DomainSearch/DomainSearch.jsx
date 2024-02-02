import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DomainSearch() {
  const [allDomains, setAllDomains] = useState([]);
  const [popularDomains, setPopularDomains] = useState([]);
  const [displayedDomains, setDisplayedDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopular, setShowPopular] = useState(false);

  useEffect(() => {
    fetch("/src/data/domains.json")
      .then((response) => response.json())
      .then((data) => setAllDomains(data));
    fetch("/src/data/popular.json")
      .then((response) => response.json())
      .then((data) => setPopularDomains(data.reverse()));
  }, []);

  useEffect(() => {
    let currentList = showPopular ? popularDomains : allDomains;

    let filteredList = currentList.filter((domain) => {
      // Remove the leading '.' from the domain name
      const domainNameWithoutDot = domain.extension.startsWith(".")
        ? domain.extension.substring(1).toLowerCase()
        : domain.extension.toLowerCase();

      // Check if the domain name starts with the search term
      return domainNameWithoutDot.startsWith(searchTerm.toLowerCase());
    });

    setDisplayedDomains(filteredList);
  }, [searchTerm, showPopular, allDomains, popularDomains]);

  return (
    <div>
      <Link to="/" className="back-link">
        Back to Home
      </Link>
      <input
        type="text"
        placeholder="Search domains"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={showPopular}
          onChange={(e) => setShowPopular(e.target.checked)}
        />
        Popular domains
      </label>
      <div>note: popular in this case means how common the word is</div>
      <div>note #2: not all domain roots are available/for sale.</div>
      <ul>
        {displayedDomains.length ? (
          displayedDomains.map((domain, index) => (
            <li key={index}>
              {domain.extension}{" "}
              {domain.type !== "generic" && `(${domain.type})`}
            </li>
          ))
        ) : (
          <p>no such domain</p>
        )}
      </ul>
    </div>
  );
}

export default DomainSearch;
