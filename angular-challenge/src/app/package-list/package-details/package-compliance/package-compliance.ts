import { Account } from "src/app/models";

export class PackageCompliance {
    reference: string;
    description: string;
    requirement: 'req' | 'opt';
    type: 'chk' | 'number' | 'int' | 'txt';
    suppliers?: Account['name'][];
    complianceBids?: ComplianceBid[];
}

export class ComplianceBid {
    reference: string;
    supplier: string;
    value: any;
}