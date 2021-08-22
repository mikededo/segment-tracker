export interface FindAllSegmentsQuery {
  // Name
  keyword?: string;

  // Distance
  minDistance?: number;
  maxDistance?: number;

  // Elevation
  minElevation?: number;
  maxElevation?: number;

  // Steep
  minSteep?: number;
  maxSteep?: number;

  // Type
  type?: string;

  // Other queries
  limit?: number;
  skip?: number;
}
