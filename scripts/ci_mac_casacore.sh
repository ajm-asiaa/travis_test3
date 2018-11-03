#!/bin/bash

git clone https://github.com/casacore/casacore.git

mv casacore casacore-src

cd casacore-src && mkdir build && cd build

#Fix so that cmake can find the boost-python library file
ln -s /usr/local/Cellar/boost-python/1.67.0/lib/libboost_python27-mt.dylib \
      /usr/local/lib/libboost_python-mt.dylib

cmake .. -DCMAKE_INSTALL_PREFIX=$HOME/casacore \
         -DUSE_FFTW3=ON \
         -DUSE_HDF5=ON \
         -DUSE_THREADS=ON \
         -DUSE_OPENMP=ON \
         -DDATA_DIR="%CASAROOT%/data"
make -j 2

sudo make install


