#!/usr/bin/env bash

set -e

#---------------------------------------------------------------------------------
# 0) Configure and Build LCMS with Emscripten
#---------------------------------------------------------------------------------
echo -e "\n==> Compiling LCMS..."
cd ../libraries/lcms2
glibtoolize
autoreconf -fi
# 2) Configure and make with Emscripten
emconfigure ./configure --host=wasm32-unknown-emscripten \
  --disable-shared
emmake make -j8
cd ../..


#---------------------------------------------------------------------------------
# 1) Download & Prepare LibRaw
#---------------------------------------------------------------------------------
echo -e "\n==> Compiling LibRaw..."

pushd libraries/LibRawSource

echo -e "\n==> Generating configure script from configure.ac..."
# Generate ./configure from configure.ac
glibtoolize
autoreconf -i

#---------------------------------------------------------------------------------
# 2) Configure and Build LibRaw with Emscripten
#---------------------------------------------------------------------------------
echo -e "\n==> Configuring LibRaw with Emscripten..."
emconfigure ./configure \
  --host=wasm32-unknown-emscripten \
  --enable-openmp \
  --enable-lcms \
  --disable-shared \
  --disable-examples \
  CFLAGS="-O3 -flto -ffast-math -msimd128 -DNDEBUG -DUSE_LCMS2 -I../lcms2/include" \
  CXXFLAGS="-O3 -flto -ffast-math -msimd128 -DNDEBUG -DUSE_LCMS2 -I../lcms2/include" \
  LDFLAGS="-s USE_PTHREADS=1 -lpthread ../lcms2/src/.libs/liblcms2.a"

echo -e "\n==> Building LibRaw..."
emmake make -j8

popd  # out of LibRawSource