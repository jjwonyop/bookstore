#!/bin/bash

# src 디렉토리 내의 모든 .tsx 파일 처리
find src -name "*.tsx" | while read -r file; do
  # 이미 useImagePath를 import하고 있는지 확인
  if ! grep -q "import { useImagePath } from " "$file"; then
    # 파일에 Image 컴포넌트가 있는지 확인
    if grep -q "src=\"/images" "$file"; then
      # 상대 경로 계산
      rel_path=$(echo $file | sed 's|src/||' | sed 's|[^/]*|..|g' | sed 's|\.\.\.||g')
      
      # import 문 아래에 useImagePath import 추가
      # 임시 파일에 결과 저장
      awk -v rel="$rel_path" '
        /^import .* from/ {
          print;
          if (!found_import) {
            depth = 0;
            for (i = 1; i <= length(rel); i++) {
              if (substr(rel, i, 1) == ".") depth++;
            }
            if (depth == 0) utils_path = "./utils/path";
            else if (depth == 1) utils_path = "../utils/path";
            else if (depth == 2) utils_path = "../../utils/path";
            else if (depth == 3) utils_path = "../../../utils/path";
            else utils_path = "../../../../utils/path";
            
            print "import { useImagePath } from \"" utils_path "\";";
            found_import = 1;
          }
          next;
        }
        
        # 함수 선언 후 getImagePath 추가
        /function [A-Za-z0-9_]+\(.*\) {/ {
          print;
          if (!found_hook && found_import) {
            print "  const getImagePath = useImagePath();";
            found_hook = 1;
          }
          next;
        }
        
        # 이미지 src 경로 교체
        /src="\/images/ {
          gsub(/src="\/images/, "src={getImagePath(\"/images");
          gsub(/"( |$)/, "\")}$1");
          print;
          next;
        }
        
        # 기본 출력
        { print; }
      ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
      
      echo "Updated file: $file"
    fi
  fi
done

echo "Image paths update completed!" 