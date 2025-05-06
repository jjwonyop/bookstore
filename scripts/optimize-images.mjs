import sharp from 'sharp';
import path from 'path';
import { glob } from 'glob';

// 이미지 최적화 설정
const config = {
  quality: 80, // WebP 품질 (0-100)
  width: 1200, // 최대 너비 (null은 원본 크기 유지)
  formats: ['webp'], // 변환할 포맷
};

// 이미지 파일을 찾기
const findImages = async () => {
  return new Promise((resolve, reject) => {
    glob('public/images/**/*.{png,jpg,jpeg}', (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
};

// 이미지 최적화 함수
const optimizeImage = async (inputPath) => {
  try {
    const ext = path.extname(inputPath);
    const dir = path.dirname(inputPath);
    const filename = path.basename(inputPath, ext);
    
    // 이미지 메타데이터 가져오기
    const metadata = await sharp(inputPath).metadata();
    
    // 각 포맷으로 변환 및 저장
    for (const format of config.formats) {
      const outputPath = path.join(dir, `${filename}.${format}`);
      
      let sharpInstance = sharp(inputPath);
      
      // 사이즈 리사이징 (설정된 경우)
      if (config.width && metadata.width > config.width) {
        sharpInstance = sharpInstance.resize({
          width: config.width,
          withoutEnlargement: true
        });
      }
      
      // 포맷 변환 및 품질 설정
      if (format === 'webp') {
        await sharpInstance.webp({ quality: config.quality }).toFile(outputPath);
      } else if (format === 'avif') {
        await sharpInstance.avif({ quality: config.quality }).toFile(outputPath);
      }
      
      console.log(`Optimized: ${outputPath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to optimize ${inputPath}:`, error);
    return false;
  }
};

// 메인 함수
const main = async () => {
  try {
    console.log('Finding images...');
    const images = await findImages();
    console.log(`Found ${images.length} images.`);
    
    // 병렬로 이미지 최적화 실행 (최대 5개씩 처리)
    const results = [];
    const batchSize = 5;
    
    for (let i = 0; i < images.length; i += batchSize) {
      const batch = images.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(optimizeImage));
      results.push(...batchResults);
      
      // 진행률 표시
      console.log(`Progress: ${Math.min(i + batchSize, images.length)}/${images.length}`);
    }
    
    const successCount = results.filter(Boolean).length;
    console.log(`Optimization complete. ${successCount}/${images.length} images optimized.`);
    
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
};

main(); 