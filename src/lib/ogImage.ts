import fs from "fs";
import path from "path";
import { site } from "@/lib/site";

// 글의 대표이미지에 대응하는 공유용 이미지(1200x630 JPG) 경로를 돌려줍니다.
// 카카오톡 등 일부 서비스가 webp 썸네일을 읽지 못해, 공유용은 JPG로 따로 만들어 둡니다.
// public/images/og/ 에 미리 생성해 두며, 없으면 기본 OG 이미지로 넘어갑니다.
export function ogImageFor(heroSrc?: string): string {
  if (!heroSrc) return `${site.url}/opengraph-image`;

  const m = heroSrc.match(/^\/images\/insights\/(.+)\.[^.]+$/);
  if (!m) return `${site.url}/opengraph-image`;

  const flat = m[1].replace(/\//g, "-");
  const rel = `/images/og/${flat}.jpg`;

  try {
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) {
      return `${site.url}${rel}`;
    }
  } catch {
    // 파일 확인이 불가능한 환경에서는 기본 이미지로 넘어갑니다.
  }
  return `${site.url}/opengraph-image`;
}
