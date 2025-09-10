import React, { createContext, useContext, useState } from 'react';

export interface Request {
  id: string;
  requester: string;
  plant: string;
  submissionDate: string;
  status: 'open' | 'in-progress' | 'completed';
  remarks: string;
  fileName?: string;
  spComments?: string;
}

export interface LibraryItem {
  id: string;
  itemDescription: string;
  grnNo: string;
  grnDate: string;
  supplierName: string;
  poNo: string;
  grnQuantity: number;
  itemRate: number;
  itemCode: string;
  vendorCode: string;
  plant: string;
  category: string;
  regularSupply: boolean;
  physicalSample: boolean;
  repeatInspection: boolean;
  repeatDate?: string;
  userName: string;
  technicalSpecs: string;
  inspectionMethod: string;
  outcome: string;
  remarks: string;
  approved: boolean;
  createdDate: string;
}

export interface Vendor {
  id: string;
  vendorCode: string;
  name: string;
  supplyType: 'regular' | 'one-time';
  annualSaleValue: number;
  qualityCheckEligible: boolean;
  lastAuditDate: string;
  performanceRating: number;
}

interface DataContextType {
  requests: Request[];
  libraryItems: LibraryItem[];
  vendors: Vendor[];
  addRequest: (request: Omit<Request, 'id'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  addLibraryItem: (item: Omit<LibraryItem, 'id'>) => void;
  updateLibraryItem: (id: string, updates: Partial<LibraryItem>) => void;
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockVendors: Vendor[] = [
  {
    id: '1',
    vendorCode: 'V001',
    name: 'ABC Suppliers Ltd',
    supplyType: 'regular',
    annualSaleValue: 1500000,
    qualityCheckEligible: true,
    lastAuditDate: '2024-01-15',
    performanceRating: 4.5,
  },
  {
    id: '2',
    vendorCode: 'V002',
    name: 'XYZ Materials Corp',
    supplyType: 'one-time',
    annualSaleValue: 750000,
    qualityCheckEligible: true,
    lastAuditDate: '2024-02-10',
    performanceRating: 4.2,
  },
];

const mockRequests: Request[] = [
  {
    id: '1',
    requester: 'John Finance',
    plant: 'Plant 1',
    submissionDate: '2024-01-20',
    status: 'open',
    remarks: 'Urgent validation needed for Q1 materials',
    fileName: 'grn_data_jan_2024.xlsx',
  },
  {
    id: '2',
    requester: 'Sarah Procurement',
    plant: 'SPD',
    submissionDate: '2024-01-18',
    status: 'completed',
    remarks: 'Monthly GRN validation',
    fileName: 'spd_grn_jan.xlsx',
    spComments: 'All items validated successfully',
  },
];

const mockLibraryItems: LibraryItem[] = [
  {
    id: '1',
    itemDescription: 'Steel Pipes - 2 inch diameter',
    grnNo: 'GRN001',
    grnDate: '2024-01-15',
    supplierName: 'ABC Suppliers Ltd',
    poNo: 'PO12345',
    grnQuantity: 100,
    itemRate: 250,
    itemCode: 'ITM001',
    vendorCode: 'V001',
    plant: 'Plant 1',
    category: 'Fabrication',
    regularSupply: true,
    physicalSample: true,
    repeatInspection: false,
    userName: 'Admin SP',
    technicalSpecs: 'ASTM A53 Grade B',
    inspectionMethod: 'Visual',
    outcome: 'Passed',
    remarks: 'Quality meets specifications',
    approved: true,
    createdDate: '2024-01-20',
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(mockLibraryItems);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);

  const addRequest = (request: Omit<Request, 'id'>) => {
    const newRequest = { ...request, id: Date.now().toString() };
    setRequests(prev => [...prev, newRequest]);
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, ...updates } : req));
  };

  const addLibraryItem = (item: Omit<LibraryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setLibraryItems(prev => [...prev, newItem]);
  };

  const updateLibraryItem = (id: string, updates: Partial<LibraryItem>) => {
    setLibraryItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const addVendor = (vendor: Omit<Vendor, 'id'>) => {
    const newVendor = { ...vendor, id: Date.now().toString() };
    setVendors(prev => [...prev, newVendor]);
  };

  const updateVendor = (id: string, updates: Partial<Vendor>) => {
    setVendors(prev => prev.map(vendor => vendor.id === id ? { ...vendor, ...updates } : vendor));
  };

  return (
    <DataContext.Provider value={{
      requests,
      libraryItems,
      vendors,
      addRequest,
      updateRequest,
      addLibraryItem,
      updateLibraryItem,
      addVendor,
      updateVendor,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}