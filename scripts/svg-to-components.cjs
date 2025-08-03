const fs = require('fs');
const path = require('path');
const { transform } = require('@svgr/core');

const svgDir = path.join(__dirname, '../src/assets/svg');
const outputDir = path.join(__dirname, '../src/components/icons');

// Asegurar que el directorio de salida existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Función para convertir SVG a componente React
async function convertSvgToComponent(svgPath, componentName) {
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  const componentCode = await transform(svgContent, {
    plugins: ['@svgr/plugin-jsx'],
    typescript: true,
    icon: true,
    expandProps: true,
    svgProps: {
      fill: 'currentColor',
    },
  }, { componentName });

  return componentCode;
}

// Función para generar el archivo index
function generateIndexFile(components) {
  const imports = components.map(name => 
    `export { default as ${name} } from './${name}';`
  ).join('\n');

  return `// Auto-generated SVG components
${imports}
`;
}

// Función principal
async function main() {
  const svgFiles = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));
  const components = [];

  for (const svgFile of svgFiles) {
    const svgPath = path.join(svgDir, svgFile);
    const componentName = path.basename(svgFile, '.svg')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    try {
      const componentCode = await convertSvgToComponent(svgPath, componentName);
      const outputPath = path.join(outputDir, `${componentName}.tsx`);
      
      fs.writeFileSync(outputPath, componentCode);
      components.push(componentName);
      
      console.log(`✅ Converted ${svgFile} to ${componentName}.tsx`);
    } catch (error) {
      console.error(`❌ Error converting ${svgFile}:`, error);
    }
  }

  // Generar archivo index
  const indexContent = generateIndexFile(components);
  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  
  console.log(`\n📁 Generated ${components.length} components in ${outputDir}`);
  console.log('📄 Created index.ts with all exports');
}

main().catch(console.error); 