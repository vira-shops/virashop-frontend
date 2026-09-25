/** One staggered logo column: a `[start, end?)` slice of the brand slots. */
export interface PartnerBrandColumn {
  range: readonly [number, number | undefined];
  justifyCenter?: boolean;
}
