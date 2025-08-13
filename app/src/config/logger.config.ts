const lokiConfig = {
  host: process.env.LOKI_URL,
  json: true,
  batching: false,
  labels: {
    solution: process.env.LOKI_SOLUTION_NAME,
    service: process.env.LOKI_SERVICE_NAME,
  },
  onConnectionError: (err) => console.error('Loki connection error::', err),
};

export default {
  loki: process.env.LOKI_URL ? lokiConfig : null,
};
