#!/usr/bin/env bash

set -e
cd ..
#---------------------------------------------------------------------------------
# Build the final WASM from libraw_wrapper.cpp
#---------------------------------------------------------------------------------
echo -e "\n==> Building libraw.js + libraw.wasm..."
emcc \
  --bind \
  -I./libraries/LibRawSource \
  -s USE_LIBPNG=1 \
  -s USE_LIBJPEG=1 \
  -s USE_ZLIB=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s DISABLE_EXCEPTION_CATCHING=0 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s INITIAL_MEMORY=256MB \
  -s USE_PTHREADS=1 \
  -s ENVIRONMENT="web,worker" \
  -msimd128 \
  -O3 -flto -pthread \
  src/libraw_wrapper.cpp \
  libraries/lcms2/src/.libs/liblcms2.a \
  libraries/LibRawSource/lib/.libs/libraw.a \
  -o src/libraw.js


echo -e "\n==> Building Dist files..."

node scripts/build.js


echo ""
echo "==============================================="
echo " Build complete!"
echo " You should now have libraw.js & libraw.wasm."
echo "==============================================="
