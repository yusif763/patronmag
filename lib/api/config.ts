const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.patronmag.com';

export const API_ENDPOINTS = {
  NEWS: `${API_BASE_URL}/news/api/`,
  PISTOL: `${API_BASE_URL}/pistol/api/`,
  RIFLE: `${API_BASE_URL}/rifle/api/`,
  SHOTGUN: `${API_BASE_URL}/shotgun/api/`,
  REVOLVER: `${API_BASE_URL}/revolver/api/`,
  AMMUNITION: `${API_BASE_URL}/ammunition/api/`,
  RELOADING: `${API_BASE_URL}/reloading/api/`,
  OPTICS: `${API_BASE_URL}/optics/api/`,
  ACCESSORIES: `${API_BASE_URL}/accessories/api/`,
  HISTORY: `${API_BASE_URL}/history/api/`,
  SEARCH: `${API_BASE_URL}/api/search/`,
  RELOADING_DATA: `${API_BASE_URL}/catalog/reloading-data/`,
  
  getCategoryEndpoint: (category: string) => `${API_BASE_URL}/${category}/api/`,
};

export default API_BASE_URL;
