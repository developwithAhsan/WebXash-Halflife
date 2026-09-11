const isZipBuffer = (buffer: ArrayBuffer): boolean => {
  if (!buffer || buffer.byteLength < 4) return false;
  const bytes = new Uint8Array(buffer, 0, 4);
  // Zip files start with PK\x03\x04 or PK\x05\x06 or PK\x07\x08
  return bytes[0] === 0x50 && bytes[1] === 0x4b;
};

const fetchZipWithFetch = async (
  url: string,
  progressCallback?: (progress: number) => any,
): Promise<ArrayBuffer> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status} from ${url}`);
  }

  const contentLength = res.headers.get('content-length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;

  if (res.body && total > 0 && typeof ReadableStream !== 'undefined') {
    const reader = res.body.getReader();
    let received = 0;
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.length;
        if (progressCallback && total > 0) {
          progressCallback(Math.round((received / total) * 100));
        }
      }
    }

    const allBytes = new Uint8Array(received);
    let position = 0;
    for (const chunk of chunks) {
      allBytes.set(chunk, position);
      position += chunk.length;
    }

    if (isZipBuffer(allBytes.buffer)) {
      return allBytes.buffer;
    }
  }

  const buffer = await res.arrayBuffer();
  if (isZipBuffer(buffer)) {
    return buffer;
  }
  throw new Error(`Response from ${url} is not a valid zip buffer`);
};

const fetchZipWithXhr = (
  url: string,
  progressCallback?: (progress: number) => any,
): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';

    req.onprogress = (event) => {
      if (event.lengthComputable && progressCallback) {
        const progress = Math.round((event.loaded / event.total) * 100);
        progressCallback(progress);
      }
    };

    req.onload = () => {
      if (req.status >= 200 && req.status < 300) {
        const arrayBuffer = req.response as ArrayBuffer;
        if (isZipBuffer(arrayBuffer)) {
          resolve(arrayBuffer);
          return;
        }
      }
      reject(new Error(`Invalid response or non-zip from ${url} (status: ${req.status})`));
    };

    req.onerror = () => reject(new Error(`Network error fetching from ${url}`));
    req.ontimeout = () => reject(new Error(`Timeout fetching from ${url}`));
    req.open('GET', url);
    req.send();
  });
};

const getZip = async (
  zipName: string,
  zipPath: string,
  progressCallback: (progress: number) => any,
): Promise<ArrayBuffer> => {
  const cleanPath = zipPath.replace(/^\.?\//, '').replace(/\/$/, '');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const candidateUrls = [
    `/${cleanPath}/${zipName}`,
    `${origin}/${cleanPath}/${zipName}`,
    `./${cleanPath}/${zipName}`,
    `https://x8bitrain.github.io/webXash/${cleanPath}/${zipName}`,
    `https://raw.githubusercontent.com/x8BitRain/webXash/gh-pages/${cleanPath}/${zipName}`,
  ];

  let lastError: any = null;

  for (const url of candidateUrls) {
    try {
      const buffer = await fetchZipWithXhr(url, progressCallback);
      if (buffer && isZipBuffer(buffer)) {
        return buffer;
      }
    } catch (err) {
      try {
        const buffer = await fetchZipWithFetch(url, progressCallback);
        if (buffer && isZipBuffer(buffer)) {
          return buffer;
        }
      } catch (fetchErr) {
        lastError = fetchErr || err;
        console.warn(`Could not load zip from candidate URL: ${url}`, fetchErr || err);
      }
    }
  }

  throw new Error(`Failed to load valid zip (${zipName}) from all sources: ${lastError?.message || lastError}`);
};

export { getZip };
