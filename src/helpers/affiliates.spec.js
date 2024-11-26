import { calculateDistanceBetweenCoordinates,
degreesToRadians,
filterAffiliatesByMaxDistance,
sortArrayByAttrAsc,
sortArrayByAttrDesc } from "./affiliates";

import { describe, test, expect } from "vitest";

describe("degreesToRadians", () => {
  test("converts degree to radian", () => {
    expect(degreesToRadians(50)).toBeCloseTo(0.872665);
  });
});

describe("calculateDistanceBetweenCoordinates", () => {
  test("calcuates the distance between two sets of coordinates accurately", () => {
    expect(calculateDistanceBetweenCoordinates(49, -121, 50, -100)).toBeCloseTo(1516);
  });
});

const testAffiliates = [
  {latitude: "52.986375", affiliate_id: 12, name: "Yosef Giles", longitude: "-6.043701", distance: 20},
  {latitude: "51.92893", affiliate_id: 1, name: "Lance Keith", longitude: "-10.27699", distance: 40},
  {latitude: "51.8856167", affiliate_id: 2, name: "Mohamed Bradshaw", longitude: "-10.4240951", distance: 60},
  {latitude: "52.3191841", affiliate_id: 3, name: "Rudi Palmer", longitude: "-8.5072391", distance: 80},
  {latitude: "53.807778", affiliate_id: 28, name: "Macsen Freeman", longitude: "-7.714444", distance: 100},
  {latitude: "53.4692815", affiliate_id: 7, name: "Mikaeel Fenton", longitude: "-9.436036", distance: 120},
]

describe("filterAffiliatesByMaxDistance", () => {
  test("filters array of affiliates based on distance", () => {
    expect(filterAffiliatesByMaxDistance(testAffiliates, 40).length).toBe(2);
    expect(filterAffiliatesByMaxDistance(testAffiliates, 20).length).toBe(1);
    expect(filterAffiliatesByMaxDistance(testAffiliates, 10).length).toBe(0);
  });
});


describe("sortArrayByAttrAsc", () => {
  test("sorts array by given attribute in ascending order", () => {
    let testArray = sortArrayByAttrAsc(testAffiliates, 'affiliate_id');
    expect(testArray[0].affiliate_id).toBe(1);
    expect(testArray[1].affiliate_id).toBe(2);

    testArray = sortArrayByAttrAsc(testAffiliates, 'distance')
    expect(testArray[0].distance).toBe(20);
    expect(testArray[1].distance).toBe(40);
    
  });
});

describe("sortArrayByAttrDesc", () => {
  test("sorts array by given attribute in ascending order", () => {
    let testArray = sortArrayByAttrDesc(testAffiliates, "affiliate_id");
    expect(testArray[0].affiliate_id).toBe(28);
    expect(testArray[1].affiliate_id).toBe(12);

    testArray = sortArrayByAttrDesc(testAffiliates, "distance");
    expect(testArray[0].distance).toBe(120);
    expect(testArray[1].distance).toBe(100);
  });
});