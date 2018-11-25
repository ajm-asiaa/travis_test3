#!/bin/bash

wget http://www.iausofa.org/2018_0130_F/sofa_f-20180130.tar.gz
tar xzf sofa_f-20180130.tar.gz
cd sofa/20180130/f77/src
make -j 2
sudo cp libsofa.a /usr/local/lib/
cd $HOME

git clone https://github.com/casacore/casacore.git

mv casacore casacore-src

cd casacore-src && mkdir build && cd build

brew install boost-python

ls /usr/local/Cellar/boost-python/

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


