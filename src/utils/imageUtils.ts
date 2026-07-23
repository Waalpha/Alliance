export const sanitizeImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return '/assets/images/ats_hero_main_1784811196710.jpg';
  }

  // Map any legacy or missing image filenames from old database states
  if (url.includes('kenya_education_hero')) {
    return '/assets/images/ats_hero_main_1784811196710.jpg';
  }
  if (url.includes('theological_campus')) {
    return '/assets/images/ats_campus_view_1784811210823.jpg';
  }
  if (url.includes('theological_library')) {
    return '/assets/images/ats_library_hall_1784811226108.jpg';
  }
  if (url.includes('theological_graduation')) {
    return '/assets/images/ats_graduation_1784811239280.jpg';
  }

  // Normalize /src/assets/ to /assets/ so production static deployments serve from public/
  if (url.startsWith('/src/assets/')) {
    return url.replace('/src/assets/', '/assets/');
  }

  return url;
};
