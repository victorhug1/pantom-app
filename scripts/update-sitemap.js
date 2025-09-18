#!/usr/bin/env node

/**
 * Script para actualizar automáticamente el sitemap
 * Se ejecuta cuando se agregan nuevos posts al blog
 */

const fs = require('fs');
const path = require('path');

// Función para actualizar blogPosts.json
function updateBlogPosts() {
  const blogPostsPath = path.join(process.cwd(), 'blogPosts.json');
  
  // Posts actuales del blog
  const currentPosts = [
    {
      url: "https://www.pantom.net/blog/seo-2025-estrategias-clave",
      priority: 0.7,
      title: "SEO en 2025: Estrategias Clave",
      date: "2024-06-10"
    },
    {
      url: "https://www.pantom.net/blog/bases-datos-medida-2025",
      priority: 0.7,
      title: "Bases de Datos a Medida 2025",
      date: "2024-06-10"
    },
    {
      url: "https://www.pantom.net/blog/nextjs-2025-velocidad-seo-experiencia",
      priority: 0.7,
      title: "Next.js en 2025: Velocidad, SEO y Experiencia",
      date: "2024-06-10"
    }
  ];

  try {
    // Escribir el archivo actualizado
    fs.writeFileSync(blogPostsPath, JSON.stringify(currentPosts, null, 2));
    console.log('✅ blogPosts.json actualizado correctamente');
    console.log(`📝 Posts del blog: ${currentPosts.length}`);
    
    // Mostrar los posts
    currentPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });
    
  } catch (error) {
    console.error('❌ Error actualizando blogPosts.json:', error);
    process.exit(1);
  }
}

// Función para validar URLs
function validateUrls() {
  const blogPostsPath = path.join(process.cwd(), 'blogPosts.json');
  
  if (!fs.existsSync(blogPostsPath)) {
    console.error('❌ blogPosts.json no encontrado');
    return false;
  }

  try {
    const content = fs.readFileSync(blogPostsPath, 'utf8');
    const posts = JSON.parse(content);
    
    console.log('🔍 Validando URLs del sitemap...');
    
    posts.forEach((post, index) => {
      if (!post.url || !post.priority) {
        console.error(`❌ Post ${index + 1} tiene datos incompletos`);
        return false;
      }
      
      if (!post.url.startsWith('https://')) {
        console.error(`❌ Post ${index + 1} URL no es HTTPS: ${post.url}`);
        return false;
      }
    });
    
    console.log('✅ Todas las URLs son válidas');
    return true;
    
  } catch (error) {
    console.error('❌ Error validando URLs:', error);
    return false;
  }
}

// Función principal
function main() {
  console.log('🚀 Actualizando sitemap de Pantom.net...\n');
  
  // Actualizar posts del blog
  updateBlogPosts();
  
  // Validar URLs
  if (validateUrls()) {
    console.log('\n✅ Sitemap actualizado correctamente');
    console.log('🌐 URL del sitemap: https://pantom.net/api/sitemap.xml');
    console.log('🤖 URL del robots.txt: https://pantom.net/robots.txt');
  } else {
    console.log('\n❌ Error en la validación del sitemap');
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { updateBlogPosts, validateUrls };
