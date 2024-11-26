import { Affiliate, AffiliateArray } from "../types";

export function calculateDistanceBetweenCoordinates(lat1:number, long1:number, lat2:number, long2:number):number {
     const earthRadius: number = 6371;
     const distanceLat: number = degreesToRadians(
       lat2- lat1
     );
     const distanceLong: number = degreesToRadians(
       long2 - long1
     );
     const originLat: number = degreesToRadians(lat1);
     const affiliateLat: number = degreesToRadians(lat2);

     const a =
       Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
       Math.sin(distanceLong / 2) *
         Math.sin(distanceLong / 2) *
         Math.cos(originLat) *
         Math.cos(affiliateLat);
     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
     return Math.round(earthRadius * c);
}

export function  degreesToRadians(degree: number): number {
    return (degree * Math.PI) / 180.0
}

export function filterAffiliatesByMaxDistance(affiliates: AffiliateArray, maxDistance: number):AffiliateArray {
    return affiliates.filter((affiliate: Affiliate) => {
        if (affiliate.distance) return affiliate.distance <= maxDistance
        else return false
    })
}

export function sortArrayByAttrAsc(array: [], attribute: string): [] {
    return array.sort(function(a, b) { 
        return - ( b[attribute] - a[attribute] );
    });
}

export function sortArrayByAttrDesc(array: [], attribute: string): [] {
    return array.sort(function (a, b) {
      return -(a[attribute] - b[attribute]);
    });
}