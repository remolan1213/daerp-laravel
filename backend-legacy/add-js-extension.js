import fs from 'fs';
import path from 'path';

const directory = path.join(process.cwd(), 'dist');

function addJsExtension(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(/(import\s+[^'"]+\s+from\s+['"])(\.{1,2}\/[^'";]+)(?<!\.js)(['"])/g, '$1$2.js$3');
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      addJsExtension(fullPath);
    }
  });
}

processDirectory(directory);