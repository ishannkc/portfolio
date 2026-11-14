/**
 * Generates the display-sized WebP assets and the MP4 project preview that the
 * site serves directly (no runtime image optimizer).
 *
 * Run with: npm run images
 *
 * Source files live in assets/source/images and are intentionally outside
 * public/ so the originals are not deployed. The short-frame poster and the
 * looping MP4 are produced with ffmpeg; if ffmpeg is unavailable the script
 * keeps the existing generated files and prints a warning.
 */
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = (...parts) => path.join(root, "assets", "source", "images", ...parts);
const output = (...parts) => path.join(root, "public", "images", ...parts);

const WEBP = { quality: 82, alphaQuality: 90, effort: 5 };

/** @type {{ key: string; from: string; to: string; build: (image: import("sharp").Sharp) => import("sharp").Sharp }[]} */
const tasks = [
  {
    key: "profileParticle",
    from: source("profile.png"),
    to: output("profile-particle.webp"),
    // Trim the transparent margin so the static poster frames the portrait
    // exactly like DotImage's bounding-box fit.
    build: (image) => image.trim({ threshold: 20 }),
  },
  {
    key: "aboutPortrait",
    from: source("profile2.png"),
    to: output("about-portrait.webp"),
    build: (image) => image,
  },
  {
    key: "researchPaper",
    from: source("research-paper.png"),
    to: output("research-paper.webp"),
    build: (image) => image.resize({ width: 1040, withoutEnlargement: true }),
  },
  {
    key: "stamp",
    from: source("stamp-cropped.webp"),
    to: output("stamp-cropped-224.webp"),
    build: (image) => image.resize({ width: 224, withoutEnlargement: true }),
  },
  {
    key: "templeSigilIcon",
    from: path.join(root, "public", "images", "temple-sigil.png"),
    to: output("temple-sigil-icon.webp"),
    build: (image) => image.resize({ width: 88, withoutEnlargement: true }),
  },
  {
    key: "certFullstack",
    from: source("certifications", "fullstack-developer-path-text.png"),
    to: output("certifications", "fullstack-developer-path-text.webp"),
    build: (image) => image.resize({ width: 640, withoutEnlargement: true }),
  },
  {
    key: "certNextjs",
    from: source("certifications", "learn-nextjs-text.png"),
    to: output("certifications", "learn-nextjs-text.webp"),
    build: (image) => image.resize({ width: 640, withoutEnlargement: true }),
  },
  {
    key: "certAiAgents",
    from: source("certifications", "learn-ai-agents-text.png"),
    to: output("certifications", "learn-ai-agents-text.webp"),
    build: (image) => image.resize({ width: 640, withoutEnlargement: true }),
  },
  {
    key: "certSupabase",
    from: source("certifications", "intro-to-supabase-text.png"),
    to: output("certifications", "intro-to-supabase-text.webp"),
    build: (image) => image.resize({ width: 640, withoutEnlargement: true }),
  },
  {
    key: "projectIntervia",
    from: source("intervia.jpeg"),
    to: output("projects", "intervia.webp"),
    build: (image) => image.resize({ width: 1800, withoutEnlargement: true }),
  },
  {
    key: "projectSpv",
    from: source("spv.gif"),
    to: output("projects", "spv-poster.webp"),
    build: (image) => image.resize({ width: 1280, withoutEnlargement: true }),
  },
  {
    key: "projectSajilo",
    from: source("sajilosite.png"),
    to: output("projects", "sajilosite.webp"),
    build: (image) => image.resize({ width: 1800, withoutEnlargement: true }),
  },
  {
    key: "projectLearnify",
    from: source("learnify.png"),
    to: output("projects", "learnify.webp"),
    build: (image) => image.resize({ width: 1800, withoutEnlargement: true }),
  },
];

const human = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function generateWebp(task) {
  await mkdir(path.dirname(task.to), { recursive: true });
  const pipeline = task.build(sharp(task.from));
  await pipeline.webp(WEBP).toFile(task.to);
  const { size } = await stat(task.to);
  console.log(`${task.key.padEnd(18)} ${human(size)}  ${path.relative(root, task.to)}`);
}

async function generateBlur(task) {
  const buffer = await sharp(task.to)
    .resize({ width: 20 })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

function generateVideo() {
  const from = source("spv.gif");
  const to = output("projects", "spv.mp4");
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.warn("ffmpeg not found: keeping the existing spv.mp4");
    return;
  }
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-loglevel",
      "error",
      "-i",
      from,
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "scale=1280:-2:flags=lanczos",
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-an",
      to,
    ],
    { stdio: "inherit" },
  );
  console.log(`spv.mp4            ${human(statSync(to).size)}  public/images/projects/spv.mp4`);
}

await mkdir(output("projects"), { recursive: true });
await mkdir(output("certifications"), { recursive: true });

for (const task of tasks) await generateWebp(task);
generateVideo();

const blur = {};
for (const task of tasks) blur[task.key] = await generateBlur(task);

const lines = Object.entries(blur).map(
  ([key, value]) => `  ${key}: "${value}",`,
);
await writeFile(
  path.join(root, "src", "data", "blur.ts"),
  `// Generated by scripts/optimize-images.mjs - do not edit by hand.\nexport const blurData = {\n${lines.join("\n")}\n} as const;\n\nexport type BlurKey = keyof typeof blurData;\n`,
);
console.log("wrote src/data/blur.ts");
