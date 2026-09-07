const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = './images';
const outDir = './images_compressed';

// Create output folder if it doesn't exist
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = fs.readdirSync(imgDir).filter(f =>
  /\.(jpg|jpeg|png)$/i.test(f) && f !== 'logo.jpeg'
);

let completed = 0;

files.forEach(file => {
  const inputPath = path.join(imgDir, file);
  const outputPath = path.join(outDir, file);

  sharp(inputPath)
    .resize(1200, 900, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: 75, progressive: true })
    .toFile(outputPath)
    .then(() => {
      completed++;
      console.log(`Compressed (${completed}/${files.length}): ${file}`);
      
      // Once all done, replace originals
      if (completed === files.length) {
        files.forEach(f => {
          fs.copyFileSync(
            path.join(outDir, f),
            path.join(imgDir, f)
          );
        });
        fs.rmSync(outDir, { recursive: true });
        console.log('All images compressed and replaced successfully.');
      }
    })
    .catch(err => console.error(`Error: ${file}`, err.message));
});