export interface SVGIcon {
  color?: string;
}

export interface HelpBoxContainerModel {
  id: number | string;
  question: string;
  answer: string;
}

export interface HelpModel {
  statusSelect?: boolean;
  problem?: string | null;
  message?: string | null;
}
export interface FileOrderModel {
  Factura: any;
  Packing: any;
  BL: any;
}

export interface FechaModel {
  fecha: any;
  hora: any;
}

export interface INFORMATION {
  title: string;
  items: {
    status: boolean;
    item: string;
  }[];
}

export interface ModalModel {
  title: string;
  buttonAction: string;
  setPopUp: any;
  action: (status?: number | string) => Promise<void> | void;
  children: any;
}

export interface PhotoModel {
  id: number;
  url: string;
}

export interface StatusModel {
  id: number;
  name: string;
  position: number;
}

export interface ProductDetailModel {
  id: number;
  photo: any;
  sku: number;
  product: {
    id: number;
    name: string;
    description: any;
    has_variants: boolean;
    unit: any;
    moq: number;
    sends_samples: any;
    hs_code: any;
    status: number;
    shipping_time: any;
    created_date: string;
    updated_date: string;
    custom_properties: any[];
    photos: PhotoModel[];
  };
}

export interface StatusUpdateModel {
  id: number;
  date: string;
  name: any;
  intermediate: boolean;
  created_date: string;
  updated_date: string;
  status: StatusModel;
}

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  has_discount: boolean;
  product_detail: ProductDetailModel;
  unit: string;
  incoterm: {
    id: number;
    name: string;
    status: StatusModel[];
  };
}

export interface OrderModel {
  id: number;
  payment_support: any;
  quantity: number;
  estimated_delivery_date: any;
  invoice_support: any;
  bl_support: any;
  packing_support: any;
  tracking_link: any;
  payment_method: number;
  created_date: string;
  updated_date: string;
  product: Product;
  status: StatusModel;
  status_updates: StatusUpdateModel[];
  provider: {
    id: string;
    first_name: string;
    last_name: string;
    document: string;
    phone: string;
    phone_indicative: any;
    email: string;
    photo: string;
    certification_level: number;
    status: number;
    company_position: any;
    document_type: {
      id: number;
      document_type: string;
      description: string;
      person_type: number;
      country: {
        code: string;
        name: string;
        indicative: string;
      };
    };
    user: {
      id: string;
      role: number;
    };
    company: any;
  };
  importer: {
    id: string;
    first_name: string;
    last_name: string;
    document: string;
    document_type: number;
    phone_indicative: string;
    phone: string;
    email: string;
    photo: string;
    company_position: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      role: number;
    };
  };
  product_order: any;
}

export interface CityModel {
  code: string;
  name: string;
  country: {
    code: string;
    name: string;
    indicative: string;
  };
}

export interface CompanyProviderModel {
  fob: boolean;
  id: string;
  name: string;
  address: string;
  document: string;
  port: string;
  logo: string;
  exw: boolean;
  cif: boolean;
  cover: string;
  interest_sectors: string;
  we_chat: string;
  website: string;
  tiktok: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  existence_certificate: string;
  existence_certificate_number: string;
  rut: string;
  financial_statements: string;
  iso: string;
  export_permission: string;
  commercial_references: string;
  bank_certificate: string;
  square_meters: string;
  number_employees: string;
  existence_years: string;
  delivery_time: string;
  payment_method: string;
  annual_sales: string;
  manufacturer: string;
  quality_department: string;
  languages: string;
  new_tecnologies: string;
  infraestructure_modernity: string;
  test_laboratory: string;
  samples: string;
  product_warranty: string;
  own_brands: string;
  fairs_participation: string;
  development_department: string;
  photos: any[];
  city: string;
  certificates: any[];
  projects: any[];
  faq: any[];
}

export interface DocumentTypeModel {
  id: number;
  document_type: string;
  description: string;
  person_type: number;
  country_code: string;
  country: {
    code: string;
    name: string;
    indicative: string;
  };
}

export interface UserModel {
  id: string;
  importer: any;
  provider: any;
  role: number;
}

export interface ProviderModel {
  id: string;
  first_name: string;
  last_name: string;
  document: string;
  phone: string;
  phone_indicative: any;
  email: string;
  photo: string;
  certification_level: number;
  status: number;
  company_position: string;
  city: CityModel;
  company: CompanyProviderModel;
  document_type: DocumentTypeModel;
  user: UserModel;
}

export interface CompanyImporterModel {
  company_name: string;
  supply_frequency: string;
  sourcing_purpose: string;
  annual_purchasing_volume: string;
  added_value_number: number;
  interest_sector: string;
  number_employees: number;
  office_phone: string;
  email: string;
  web_page: string;
  about_us: string;
  main_products: string;
  sales_platforms: string;
  profile_picture: string;
  importer_id: string;
  createdAt: string;
  updatedAt: string;
  city: {
    code: string;
    name: string;
  };
}

export interface ImporterModel {
  id: string;
  first_name: string;
  last_name: string;
  document: string;
  document_type: number;
  phone: string;
  email: string;
  photo: string;
  company_position: string;
  status: number;
  city_code: string;
  createdAt: string;
  updatedAt: string;
  importerCompany: CompanyImporterModel;
  city: CityModel;
  documentType: DocumentTypeModel;
  user: UserModel;
  phone_indicative: string;
}

export interface SampleModel {
  id?: number;
  product: ProductDetailModel;
  importer: ImporterModel;
  provider: ProviderModel;
  status: number;
  price_sample: number;
  price_shipping: number;
  quantity: number;
  tracking_link: string;
  status_updates: StatusUpdate[];
  payment_support: string;
}

export interface StatusUpdate {
  id: number;
  date: Date;
  status: number;
}
