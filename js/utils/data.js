export async function getData() {
  const res = await axios.get("/img.json");
  return res.data;
}

// export function getPortfolioImages(d_section) {
//   if (!d_section) return [];

//   if (Array.isArray(d_section)) return d_section;

//   if (d_section.images) return d_section.images;

//   return [];
// }

