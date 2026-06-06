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
};

export type InvoiceProduct = {
  id: string;
  created: number;
  active: boolean;
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
  customerAccount: {
    id: string;
    buyer: string;
    inn: string;
  } | null;
  productsRequested: RequestProduct[];
  products: RequestProduct[];
  proposals: Array<{ id: string }>;
  invoices: Invoice[];
  orders: Array<{
    id: string;
    shippings: Array<{ id: string }>;
  }>;
  upds: Array<{ id: string }>;
};

export type CustomerCabinet = {
  customer: CustomerAggregate;
  requests: RequestAggregate[];
};
