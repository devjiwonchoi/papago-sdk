type PapagoConfig = {
    client_id: string;
    client_secret: string;
};
type PapagoDetectParams = {
    query: string;
};
type PapagoDetectResponse = {
    langCode: string;
};
type PapagoHtmlTranslateParams = {
    from: string;
    to: string;
    html: string;
};
type PapagoTextTranslateParams = {
    from: string;
    to: string;
    text: string;
    options?: {
        textOnly?: boolean;
    };
};
type PapagoTranslateResponse = {
    message?: {
        result: {
            srcLangType: string;
            tarLangType: string;
            translatedText: string;
        };
    };
    translatedHtml?: string;
    translatedText?: string;
};

declare class Papago {
    client_id: string;
    client_secret: string;
    constructor({ client_id, client_secret }: PapagoConfig);
    private buildHeaders;
    private fetch;
    readonly text: {
        translate: ({ from, to, text, options, }: PapagoTextTranslateParams) => Promise<PapagoTranslateResponse | {
            message: string;
        }>;
    };
    readonly html: {
        translate: ({ from, to, html, }: PapagoHtmlTranslateParams) => Promise<PapagoTranslateResponse>;
    };
    detect({ query }: PapagoDetectParams): Promise<PapagoDetectResponse>;
}

export { Papago, PapagoDetectParams, PapagoDetectResponse, PapagoHtmlTranslateParams, PapagoTextTranslateParams, PapagoTranslateResponse };
