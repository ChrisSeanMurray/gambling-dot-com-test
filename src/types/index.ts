

export type LatitudeLongitude = {
  latitude: number;
  longitude: number;
};

export type AffiliateArray = Affiliate[];

export type Affiliate = LatitudeLongitude & {
  affiliate_id: number;
  name: string;
  distance?: number;
};