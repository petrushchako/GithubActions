try {
  // Read the input directly from the environment variable without any libraries
  const name = process.env.INPUT_NAME || 'World';
  
  // Log the greeting to the workflow console
  console.log(`Hello ${name}!`);
  
  // Optional: You can set outputs using the standard GitHub Actions file command
  // if you want downstream steps to use it:
  // fs.appendFileSync(process.env.GITHUB_OUTPUT, `greeting=Hello ${name}!\n`);

} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}