import { useState } from "react";
import getPossibleDomains from "../../utils/getPossibleDomains";
import Results from "../Results/Results";
import { domainExtensions } from "../../data/domains";
// import DomainSandbox from "../DomainSandbox/DomainSandbox";

import "./DomainInput.css";

const DomainInput = () => {
  const [input, setInput] = useState("");
  const [domains, setDomains] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (input) => {
    if (input.length > 63) {
      setError(true);
      return;
    }

    // maybe set a "no symbol error"
    input = input.replace(/[^a-zA-Z0-9 ]/g, "");

    setInput(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length < 63) {
      setError(false);
    }
    setDomains(getPossibleDomains(input, domainExtensions));
    setSubmitted(true);
  };

  return (
    <div className="domainInput">
      <h1>chicken_domain</h1>
      <h4>find your self-sufficient domain</h4>
      <hr></hr>
      <p>
        A self-sufficient domain is one where the domain/root combination
        matches the desired site name without using extra characters (ex: an
        input of &apos;hello world&apos; would return the domain
        &apos;hello.world&apos; or more creatively &apos;bassinet&apos; would
        return &apos;bassi.net&apos;)
      </p>
      {/* edit this */}
      {error && (
        <span style={{ color: "#ff1d51" }}>
          Error: max input is 63 characters
        </span>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(ev) => handleChange(ev.target.value)}
          placeholder="Domain go here duh..."
        />
        <button type="submit">FIND DOMAINS</button>
      </form>
      <a
        href="https://www.iana.org/domains/root/db"
        target="blank"
        rel="noreferrer"
        style={{ marginLeft: 10 }}
      >
        Click here for full IANA root database
      </a>

      {submitted && <Results domains={domains} />}
      <hr></hr>
      {/* <div style={{ marginTop: 25 }}>
        <h2>Sandbox</h2>
        <DomainSandbox />
      </div> */}
      <article>
        <p>
          <b>Disclaimer:</b> this{" "}
          <a
            href="https://www.iana.org/domains/root/db/site.html"
            rel="noreferrer"
            target="blank"
          >
            .site
          </a>{" "}
          <a
            href="https://www.iana.org/domains/root/db/is.html"
            rel="noreferrer"
            target="blank"
          >
            .is
          </a>{" "}
          more of a commentary on domains than{" "}
          <a
            href="https://www.iana.org/domains/root/db/it.html"
            rel="noreferrer"
            target="blank"
          >
            .it
          </a>{" "}
          <a
            href="https://www.iana.org/domains/root/db/is.html"
            rel="noreferrer"
            target="blank"
          >
            .is
          </a>{" "}
          a{" "}
          <a
            href="https://www.iana.org/domains/root/db/place.html"
            rel="noreferrer"
            target="blank"
          >
            .place
          </a>{" "}
          for{" "}
          <a
            href="https://www.iana.org/domains/root/db/you.html"
            rel="noreferrer"
            target="blank"
          >
            .you
          </a>{" "}
          <a
            href="https://www.iana.org/domains/root/db/to.html"
            rel="noreferrer"
            target="blank"
          >
            .to
          </a>{" "}
          actually find your dream domain. I mean,{" "}
          <a
            href="https://www.iana.org/domains/root/db/you.html"
            rel="noreferrer"
            target="blank"
          >
            .you
          </a>{" "}
          can{" "}
          <a
            href="https://www.iana.org/domains/root/db/do.html"
            rel="noreferrer"
            target="blank"
          >
            .do
          </a>{" "}
          that if{" "}
          <a
            href="https://www.iana.org/domains/root/db/you.html"
            rel="noreferrer"
            target="blank"
          >
            .you
          </a>{" "}
          want, but the point of its creation was more or less for amusement.
          And{" "}
          <a
            href="https://www.iana.org/domains/root/db/to.html"
            rel="noreferrer"
            target="blank"
          >
            .to
          </a>{" "}
          <a
            href="https://www.iana.org/domains/root/db/how.html"
            rel="noreferrer"
            target="blank"
          >
            .show
          </a>{" "}
          <a
            href="https://www.iana.org/domains/root/db/show.html"
            rel="noreferrer"
            target="blank"
          >
            .how
          </a>{" "}
          insane the{" "}
          <a
            href="https://www.iana.org/domains/root/db/market.html"
            rel="noreferrer"
            target="blank"
          >
            .market
          </a>{" "}
          <a
            href="https://www.iana.org/domains/root/db/is.html"
            rel="noreferrer"
            target="blank"
          >
            .is
          </a>
          .{" "}
          <span style={{ fontSize: 12, opacity: 0.5 }}>
            {" "}
            (note: not all roots are available for purchase)
          </span>
        </p>
      </article>
    </div>
  );
};

export default DomainInput;
