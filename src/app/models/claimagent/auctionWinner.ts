export interface AuctionWinner {
    auctionReportId: number;    
    auctionTitle: string;
    serviceProvider: {
      serviceProviderId: number;
      registrationName: string;
      tradingName: string;
      contactPerson: string;
      cellNumber: string;
      telNumber: string;
      email: string;
      payeeType: string;
      type: string;
      companyRegistrationNumber: string;
      vatVendor: string;
      vatNumber: string;
      accountStatus: string;
      rejectionReason: string;
    };
    spAddress: {
      addressId: number;
      buildingName: string;
      streetNumber: string;
      streetName: string;
      surbub: string;
      city: string;
      province: string;
      country: string;
      zipCode: number;
    };
    spBid: {
      bidId: number;
      jobDescription: string;
      bidTotalMaterialCost: number;
      bidTotalLabourCost: number;
      bidTotalCost: number;
      bidEstimatedDuration: number;
      bidMaterials: {
        bidMaterialId: number;
        bidMaterialName: string;
        bidMaterialDescription: string;
        bidMaterialCost: number;
        bidQuantity: number;
        bidTotalCost: number;
      }[];
      status: string;
    };
  }