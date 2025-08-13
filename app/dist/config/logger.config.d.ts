declare const _default: {
    loki: {
        host: string;
        json: boolean;
        batching: boolean;
        labels: {
            solution: string;
            service: string;
        };
        onConnectionError: (err: any) => void;
    };
};
export default _default;
