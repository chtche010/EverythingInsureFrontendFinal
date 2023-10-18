export interface GetAllAuctions {
    firstImage: string | null;
    auctionId: number;
    auctionTitle: string;
    startTime: string;
    endTime: string;
    auctionStatus: string;
    auctionDate: string;
    images: string[];
    isFav: boolean;
    ClaimId: number;
  }