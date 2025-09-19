export const API_BASE = "https://ixk9cqrvwl5t.share.zrok.io";


async function postForm(path: string, form: FormData) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "skip_zrok_interstitial": "true",
    },
    body: form,
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch (e) {
    console.error("Error parsing JSON", e);
  }

  if (!res.ok) {
    const msg = json?.message || json?.error || `Error HTTP ${res.status}`;
    throw new Error(msg);
  }

  return json ?? { ok: true };
}

export type ImagePart = { uri: string; name: string; type: string };

export async function registerFace(cuil: string, image: ImagePart) {
  const form = new FormData();
  form.append("cuil", cuil);
  form.append("image", image as any);
  return postForm("/register", form);
}

export async function recognizeFace(image: ImagePart) {
  const form = new FormData();
  form.append("image", image as any);
  return postForm("/recognize", form);
}
