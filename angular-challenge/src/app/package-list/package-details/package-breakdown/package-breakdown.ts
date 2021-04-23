import { Account } from "src/app/models";

export class PackageBreakdown {
    reference: string;
    description: string;
    scope: 'req' | 'opt';
    quantity?: number;
    units?: string;
    suppliers?: Account['name'][];
    unitRates?: UnitRate[];
}

export class UnitRate {
    supplier: string;
    rate: number;
    amount: number;
    reference: string;
    color?: string;
}

export class RateColumn {
    id: string;
    name: string;
    supplier: string;
}