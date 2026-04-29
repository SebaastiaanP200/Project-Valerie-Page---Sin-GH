export function recoverData(d_array) {
  const result = {}

  d_array.forEach(data => {
    const key = Object.keys(data)[0];
    result[key] = data[key];
  });
  return result;
}

export async function getData() {
  const res = await axios.get("/img.json");
  return recoverData(res.data);
}

export function getPortfolioPreviewSections(data) {
  const result = [];

  Object.keys(data).forEach(key => {
    const section = data[key];

    if (section && section.link && Array.isArray(section.images)) {
      result.push(section);
    }
  });
  return result;
}

export function getPortfolioImages(d_section) {
  if (!d_section) return [];

  if (Array.isArray(d_section)) return d_section;

  if (d_section.images) return d_section.images;

  return [];
}

