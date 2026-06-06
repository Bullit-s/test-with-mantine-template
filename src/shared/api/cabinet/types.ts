export type CustomerAggregate = {
  id: string;
  created: number;
  updated: number;
  name: string;
  company: string;
  region: string;
  timezone: string;
  avatar: string;
  user: { email: string };
  phones: Array<{
    id: string;
    number: string;
    ext: string;
    name: string;
    dept: string;
    isPrimary: boolean;
    isValid: boolean;
  }>;
};

export type RequestProduct = {
  id: string;
  qty: number;
  qtyUnits: string;
  sku: string;
  model: string;
  brandterm: { name: string };
  categoryterm: { name: string };
  changed?: number;
  shippingTime?: string;
  shippingMin?: number;
  shippingMax?: number;
  weight?: number;
  status?: string;
  disabled?: boolean;
};

export type LineProduct = {
  id: string;
  lineNum: number;
  title: string;
  qty: number;
  currency: string;
  vat: number;
  unit: number;
  unitNoVat: number;
  line: number;
  lineNoVat: number;
};

export type InvoiceProduct = LineProduct & {
  created: number;
  active: boolean;
};

export type InvoicePayment = {
  id: string;
  created: number;
  changed: number;
  paidInput: number;
  paidPercent: number;
  paymentDate: number;
  transferDate: number;
  transferNumber: string;
};

export type Invoice = {
  id: string;
  created: number;
  changed: number;
  invoiceNumber: string;
  title: string;
  actuality: string;
  shippingTime: string;
  prepaid: number;
  canceled: number;
  firstPaymentCreated: number;
  paid: number;
  paidInput: number;
  companyDetails: string;
  invoiceProducts: InvoiceProduct[];
  invoicePayments: InvoicePayment[];
};

export type Proposal = {
  id: string;
  created: number;
  changed: number;
  title: string;
  actuality: string;
  shippingTime: string;
  prepaid: number;
  companyDetails: string;
  proposalProducts: LineProduct[];
};

export type CustomerAccount = {
  id: string;
  buyer: string;
  inn: string;
  kpp: string;
  ogrn: string;
  okpo: string;
  rs: string;
  ks: string;
  bik: string;
  bank: string;
  formalAddress: string;
  postalAddress: string;
  shippingAddress: string;
  actualAddress: string;
  invoicePrepaidRequired: number;
  noContractRequired: number;
  phone: string;
  customerName: string;
  customerPosition: string;
};

export type ShippingGroup = {
  id: string;
  created: number;
  postDate: number;
  documentsDate: number;
  gtd: string;
};

export type Shipping = {
  id: string;
  created: number;
  changed: number;
  received: number;
  sentToClient: number;
  productsIds: string;
  shippingProducts: Array<{ id: string; productID: string }>;
  shippingGroup: ShippingGroup;
};

export type Order = {
  id: string;
  created: number;
  changed: number;
  postDate: number;
  received: string;
  status: number;
  products: Array<{ id: string; shippingMin: number; shippingMax: number }>;
  shippings: Shipping[];
};

export type Upd = {
  id: string;
  created: number;
  changed: number;
  number: number;
  date: number;
  updProducts: Array<{ productID: string }>;
  updRequests: Array<{ requestID: string }>;
};

export type RequestAggregate = {
  id: string;
  created: number;
  changed: number;
  contractNumber: string;
  contractDate: number;
  contractSpecNumber: string;
  contractSpecDate: number;
  customerDesiredPrice: number;
  manager: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  company: {
    id: string;
    name: string;
    phone: string;
  };
  customerAccount: CustomerAccount | null;
  productsRequested: RequestProduct[];
  products: RequestProduct[];
  proposals: Proposal[];
  invoices: Invoice[];
  orders: Order[];
  upds: Upd[];
};

export type CustomerCabinet = {
  customer: CustomerAggregate;
  requests: RequestAggregate[];
};
