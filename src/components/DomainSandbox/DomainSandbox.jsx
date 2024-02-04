import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import domainExtensions from "../../data/domains"; // Ensure this path is correct

function DomainSandbox() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: false,
        },
      });

      // Listen for text changes and specifically look for space insertions
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          delta.ops.forEach((op) => {
            if (op.insert === " ") {
              // Check if the change was the addition of a space
              checkForDomainAndConvert(quill);
            }
          });
        }
      });
    }
  }, []);

  function checkForDomainAndConvert(quill) {
    quill.on("text-change", function (delta, oldDelta, source) {
      if (source !== "user") return;

      let currentDelta = delta.ops;
      // Check if the change was a space or the first word being typed
      if (
        currentDelta.find(
          (op) =>
            op.insert === " " ||
            (op.insert && op.insert !== " " && !oldDelta.ops.length)
        )
      ) {
        let cursorPosition = quill.getSelection().index;
        let textBeforeCursor = quill.getText(0, cursorPosition);
        let words = textBeforeCursor.trim().split(/\s+/);
        let lastWord = words[words.length - 1]; // Get the last word typed before the space or as the first word

        domainExtensions.forEach(({ extension, href }) => {
          let strippedExtension = extension.startsWith(".")
            ? extension.substring(1)
            : extension;
          if (lastWord.endsWith(strippedExtension)) {
            let wordToConvert = "." + lastWord; // Prepend the dot correctly
            let formatHref = href.includes("http")
              ? href
              : `http://${href}${wordToConvert}`;

            // Calculate start index for replacement
            let wordStartIndex = textBeforeCursor.lastIndexOf(lastWord) - 1; // Adjust to include the period
            let wordEndIndex = wordStartIndex + lastWord.length + 1; // Include the period in the length

            // Replace the last word with itself as a hyperlink
            quill.deleteText(wordStartIndex, lastWord.length + 1); // +1 to remove the preceding space if any
            quill.insertText(wordStartIndex, wordToConvert, {
              link: formatHref,
            });
            // Ensure a space is added after the hyperlink for continuous typing
            if (cursorPosition === textBeforeCursor.length) {
              quill.insertText(wordEndIndex, " ");
            }

            // Update the cursor position
            quill.setSelection(wordEndIndex + 1);
          }
        });
      }
    });
  }

  return <div ref={editorRef} style={{ height: "200px" }} />;
}

export default DomainSandbox;
