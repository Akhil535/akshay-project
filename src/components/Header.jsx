// In your App.jsx or main layout component
<style>{`
  /* Add this to prevent content from hiding behind header */
  body {
    padding-top: 80px; /* Adjust based on your header height */
  }
  
  /* Make sure main content has proper spacing */
  .main-content {
    min-height: calc(100vh - 200px); /* Adjust footer height */
  }
  
  /* Fix footer positioning */
  footer {
    margin-top: auto;
  }
`}</style>