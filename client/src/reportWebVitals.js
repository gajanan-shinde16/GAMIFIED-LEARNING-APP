/**
 * Reports the vital web performance metrics to the provided callback.
 * This function dynamically imports the 'web-vitals' library and then
 * calls the individual metric functions (CLS, FID, FCP, LCP, TTFB).
 * @param {Function} onPerfEntry - A callback function to handle the performance entry data.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;