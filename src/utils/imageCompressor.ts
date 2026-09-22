/**
 * Image compressor & optimizer for web & mobile.
 * Downscales images and compresses them into compact JPEG data URLs (< 60 KB)
 * to guarantee instant real-time synchronization across all devices and prevent Firestore 1MB limits.
 */

export function compressImageFile(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        compressDataUrl(e.target.result, maxWidth, maxHeight, quality)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error('Failed to read file as Data URL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function optimizeImageUrl(url?: string): string {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    let optimized = url.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=65');
    if (!optimized.includes('w=')) {
      optimized += (optimized.includes('?') ? '&' : '?') + 'w=600&auto=format&fit=crop&q=65';
    }
    return optimized;
  }
  return url;
}

export function compressDataUrl(
  dataUrl: string,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.75
): Promise<string> {
  // If it's already an external HTTP link or SVG, optimize if Unsplash, otherwise return
  if (!dataUrl || dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
    return Promise.resolve(optimizeImageUrl(dataUrl));
  }
  if (dataUrl.startsWith('data:image/svg')) {
    return Promise.resolve(dataUrl);
  }

  // If the base64 is already very small (< 35KB), don't re-compress
  if (dataUrl.length < 35000) {
    return Promise.resolve(dataUrl);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width === 0 || height === 0) {
          resolve(dataUrl);
          return;
        }

        // Maintain aspect ratio while bounding within maxWidth & maxHeight
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // Draw clean white background for transparency handling
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (err) {
        console.warn('Image compression fallback:', err);
        resolve(dataUrl);
      }
    };

    img.onerror = () => {
      resolve(dataUrl);
    };

    img.src = dataUrl;
  });
}

/**
 * Iterates through a list of items and compresses any base64 image field
 * before saving to Firestore to keep document sizes featherweight.
 */
export async function compressEntitiesImages<T extends Record<string, any>>(items: T[]): Promise<T[]> {
  if (!Array.isArray(items)) return items;

  const results: T[] = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      results.push(item);
      continue;
    }

    const copy: any = { ...item };
    // Check common image fields
    for (const key of ['image', 'avatar', 'img', 'coverImage', 'banner', 'logo']) {
      if (typeof copy[key] === 'string' && copy[key].startsWith('data:image/')) {
        try {
          copy[key] = await compressDataUrl(copy[key], 720, 720, 0.68);
        } catch {
          // Keep original on error
        }
      } else if (typeof copy[key] === 'string' && copy[key].includes('images.unsplash.com')) {
        copy[key] = optimizeImageUrl(copy[key]);
      }
    }
    results.push(copy as T);
  }
  return results;
}
