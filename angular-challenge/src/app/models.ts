class Model {
  id: number;
}

export class User extends Model {
  email: string;
  username: string;
}

export class Account extends Model {
  name: string;
  description: string;
  user: User | User['id'];
}

export class Package extends Model {
  name: string;
  status: 'open' | 'closed' | 'archived';
  buyer: Account;
  line_items?: LineItem[] | LineItem['id'][];
  sections?: Section[] | Section['id'][];
  compliance_fields?: ComplianceField[] | ComplianceField['id'][];
}

export class Section extends Model {
  package: Package;
  row_number: number;
  reference: string;
  description: string;
  scope: 'req' | 'opt';
  line_items?: LineItem[] | LineItem['id'][];
}

export class LineItem extends Model {
  package: Package;
  section?: Section;
  row_number: number;
  reference: string;
  description: string;
  scope: 'req' | 'opt';
  quantity: number;
  units: string;
}

export class ComplianceField extends Model {
  package: Package;
  row_number: number;
  reference: string;
  description: string;
  requirement: 'req' | 'opt';
  type: 'chk' | 'number' | 'int' | 'txt';
}

export class Bid extends Model {
  supplier: Account;
  package: Package;
}

export class BidRate extends Model {
  bid: Bid;
  line_item: LineItem;
  rate: number;
}

export class BidComplianceValue extends Model {
  bid: Bid;
  compliance_field: ComplianceField;
  value: string | number | boolean;
}
