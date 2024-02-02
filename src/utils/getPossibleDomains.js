export default function getPossibleDomains(input, domainExtensions) {
  let generatedDomains = [];
  let sanitizedInput = input.replace(/\s+/g, "").toLowerCase();

  for (let i = 1; i < sanitizedInput.length; i++) {
    let prefix = sanitizedInput.substring(0, i);
    let suffix = "." + sanitizedInput.substring(i);

    domainExtensions.forEach((extension) => {
      if (extension.extension === suffix) {
        // Create an object with name and type properties
        generatedDomains.push({
          extension: prefix + suffix, // Full domain name
          type: extension.type, // Type of the domain
        });
      }
    });
  }
  return generatedDomains;
}
