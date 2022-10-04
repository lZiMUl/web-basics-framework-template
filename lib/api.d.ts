interface GetSecurityLicense {
    key: string;
    cert: string;
}
interface Config {
    [key: string]: any;
}
declare function getConfig(index: string, key: string, file?: string): (Config | null);
declare const getSecurityLicense: GetSecurityLicense;
export type { Config };
export { getConfig, getSecurityLicense };
//# sourceMappingURL=api.d.ts.map